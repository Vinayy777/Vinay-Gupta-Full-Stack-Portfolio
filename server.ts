import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.local" });

import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to messages store
const MESSAGES_FILE = path.join(__dirname, "messages.json");

// Helper to get stored messages
const getStoredMessages = () => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading messages:", err);
  }
  return [];
};

// Helper to save a single new message
const saveStoredMessage = (msg: any) => {
  try {
    const current = getStoredMessages();
    current.unshift(msg);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(current, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving message:", err);
    return false;
  }
};

// Helper to save all messages (for updates/deletions)
const saveAllStoredMessages = (messages: any[]) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing messages:", err);
    return false;
  }
};

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3001', 10);
  const ADMIN_PIN = process.env.ADMIN_PIN || "1234";

  app.use(express.json());

  // Enterprise Security Headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Sliding Window In-Memory Rate Limiting
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const createRateLimiter = (limit: number, windowMs: number) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const ip = req.ip || req.socket.remoteAddress || "unknown";
      const now = Date.now();
      const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
      } else {
        record.count += 1;
      }
      rateLimitMap.set(ip, record);
      if (record.count > limit) {
        return res.status(429).json({ 
          error: "Too many requests. Please slow down and try again later.",
          retryAfter: Math.ceil((record.resetTime - now) / 1000)
        });
      }
      next();
    };
  };

  const contactLimiter = createRateLimiter(15, 15 * 60 * 1000); // 15 submissions per 15 min
  const assistantLimiter = createRateLimiter(45, 15 * 60 * 1000); // 45 AI messages per 15 min

  // Check Gemini API key status at startup
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    console.log("✅ Gemini AI Key detected: " + apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length - 4));
  } else {
    console.warn("⚠️ GEMINI_API_KEY is not configured in .env. AI Assistant will operate in fallback mode.");
  }

  // Admin Authentication Helper
  const checkAdminAuth = (req: express.Request) => {
    const providedPin = req.headers["x-admin-pin"] || req.query.pin || (req.body && req.body.pin);
    return Boolean(providedPin && String(providedPin).trim() === ADMIN_PIN.trim());
  };

  // Initialize Gemini lazily/safely
  const getAiClient = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables or .env file.");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Uptime & Health Check Endpoint (Standard 27)
  app.get("/api/health", (req, res) => {
    const memory = process.memoryUsage();
    res.json({ 
      status: "healthy", 
      uptimeSeconds: Math.floor(process.uptime()),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      messagesCount: getStoredMessages().length,
      memory: {
        rssMb: Math.round(memory.rss / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
      },
      timestamp: new Date().toISOString() 
    });
  });

  // Verify Admin PIN endpoint
  app.post("/api/admin/verify", (req, res) => {
    const { pin } = req.body;
    if (pin && String(pin).trim() === ADMIN_PIN.trim()) {
      return res.json({ success: true, authorized: true });
    }
    return res.status(401).json({ success: false, authorized: false, error: "Invalid Admin PIN." });
  });

  // Helper to forward to Google Sheets if configured
  const forwardToGoogleSheet = async (data: any) => {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      console.log(`📊 [Google Sheets Sync] Message synced to sheet (Status: ${res.status})`);
    } catch (err: any) {
      console.error("⚠️ [Google Sheets Sync] Failed to forward to Google Sheet:", err.message || err);
    }
  };

  // Contact Form Submission Endpoint with Honeypot & Rate Limiting (Standards 6, 23, 24, 33, 34)
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const { name, email, subject, message, website_hp } = req.body;

      // Honeypot spam check: if website_hp has a value, it was filled by a bot
      if (website_hp) {
        console.warn(`🤖 [Bot Spam Blocked] Honeypot triggered from IP: ${req.ip}`);
        return res.json({ success: true, message: "Inquiry received." });
      }

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const newMessage = {
        id: "msg_" + Date.now(),
        name,
        email,
        subject: subject || "Full-Stack Role / Engineering Inquiry",
        message,
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString(),
        read: false,
        archived: false,
      };

      saveStoredMessage(newMessage);

      console.log(`\n======================================================`);
      console.log(`📬 [NEW INQUIRY RECEIVED FROM PORTFOLIO]`);
      console.log(`👤 From:    ${name} <${email}>`);
      console.log(`📌 Subject: ${newMessage.subject}`);
      console.log(`💬 Message: ${message}`);
      console.log(`⏰ Time:    ${newMessage.formattedDate}`);
      console.log(`======================================================\n`);

      // Forward to Google Sheet in background if URL is provided
      forwardToGoogleSheet(newMessage);

      res.json({ 
        success: true, 
        message: "Message received and stored successfully!", 
        id: newMessage.id 
      });
    } catch (err: any) {
      console.error("Error handling /api/contact:", err);
      res.status(500).json({ error: "Failed to save message." });
    }
  });

  // Get Contact Messages (PIN-Protected Inbox endpoint)
  app.get("/api/contact", (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ 
        error: "Unauthorized. Admin PIN is required to view received messages.", 
        requiresAuth: true 
      });
    }

    try {
      const messages = getStoredMessages();
      const unreadCount = messages.filter((m: any) => !m.read && !m.archived).length;
      res.json({ success: true, count: messages.length, unreadCount, messages });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to retrieve messages." });
    }
  });

  // Update Contact Message Status (Mark Read / Unread / Archive)
  app.patch("/api/contact/:id", (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: "Unauthorized. Admin PIN required." });
    }

    try {
      const { id } = req.params;
      const { read, archived } = req.body;
      const messages = getStoredMessages();

      const index = messages.findIndex((m: any) => m.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Message not found." });
      }

      if (read !== undefined) messages[index].read = Boolean(read);
      if (archived !== undefined) messages[index].archived = Boolean(archived);

      saveAllStoredMessages(messages);
      res.json({ success: true, message: messages[index] });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to update message status." });
    }
  });

  // Delete Contact Message
  app.delete("/api/contact/:id", (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: "Unauthorized. Admin PIN required." });
    }

    try {
      const { id } = req.params;
      let messages = getStoredMessages();
      const initialLength = messages.length;
      messages = messages.filter((m: any) => m.id !== id);

      if (messages.length === initialLength) {
        return res.status(404).json({ error: "Message not found." });
      }

      saveAllStoredMessages(messages);
      res.json({ success: true, message: "Message deleted successfully." });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to delete message." });
    }
  });

  // Robust generateContent with automatic retry on temporary 503/429 high demand spikes
  const generateWithRetry = async (ai: GoogleGenAI, params: any, maxRetries = 2) => {
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        return await ai.models.generateContent(params);
      } catch (err: any) {
        lastError = err;
        const status = err.status || err.code;
        const isTemporary = status === 503 || status === 429 || status === 500 || (err.message && err.message.includes("high demand"));
        
        if (isTemporary && attempt <= maxRetries) {
          console.warn(`[Gemini API] Temporary error (${status}). Retrying attempt ${attempt}/${maxRetries} in 1s...`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        throw err;
      }
    }
    throw lastError;
  };

  // Software Engineer AI Portfolio Assistant Endpoint (Standard 8, 24)
  app.post("/api/assistant", assistantLimiter, async (req, res) => {
    try {
      const { message, history, developerName, developerRole } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      const devName = developerName || "Vinay Gupta";
      const devRole = developerRole || "Full-Stack Developer";

      const ai = getAiClient();

      const systemInstruction = `You are "Vinay-AI", an intelligent AI career and technical assistant for ${devName}, a ${devRole}.

Background & Verified Qualifications:
- Full Name: Vinay Gupta
- Role: Full-Stack Developer
- Email: vinaygupta8166@gmail.com | Phone: +91 9506442218 | Location: Varanasi, India
- Education: Bachelor of Computer Applications (BCA, CGPA: 7.2, 2021-2024), 12th Standard from St. Joseph's School, Varanasi (CGPA: 7.2, 2019-2020), English Speaking Course Certification.
- Technical Skills:
  * Languages: Python, JavaScript, C#, PHP, TypeScript
  * Frontend: React.js, Redux Toolkit, HTML5, CSS3, jQuery, Tailwind CSS
  * Backend: C# .NET, ASP.NET Core, ADO.NET, Node.js, Express.js, PHP, Django, REST APIs
  * Databases: MS SQL Server (T-SQL, Stored Procedures, Queries), MySQL, MongoDB
  * Deployment & Tools: Microsoft IIS Server Hosting, Git & GitHub, Postman, Excel, Tableau
- Professional Experience:
  1. Software Developer at Gravity Web Technology Pvt Ltd (Jan 2025 - Present):
     - Developed and customized Hospital Information System (HIS), Laboratory Information System (LIS), and EMR modules using C# .NET and MS SQL Server.
     - Integrated third-party healthcare platforms via APIs for seamless data exchange.
     - Managed requirement analysis, implementation, zero-disruption data migration, and comprehensive UAT/QA testing cycles.
  2. Process Associate at AHS IT Services Pvt Ltd (Mar 2024 - Jan 2025):
     - Executed data mining, call verification, and medical inquiry processes across 5 distinct workflows.
     - Managed SEO tasks and contributed to technical website development.
  3. Data Analyst Intern at Accenture (Jan 2024 - Mar 2024):
     - Structured corporate training in data cleaning, visualization, statistical analysis, and SQL queries.
- Key Projects:
  1. Golden Sports Arena — Turf Booking & Management System (Live Site): Built and deployed live production turf reservation platform using React, Redux Toolkit, C#, ASP.NET Core with ADO.NET against SQL Server, hosted independently on IIS.
  2. Hospital Information System (HIS/LIS/EMR): Healthcare operational workflows, diagnostic tracking, and third-party API interoperability.
  3. Myntra Clone: Full-featured e-commerce application with React, Node.js, Redux, React Router, HTML, CSS, JavaScript.
  4. Employee Management System: Role-based platform with PHP, MySQL, HTML, CSS for task delegation, priority filtering, and deadline tracking.

Your Tone & Style:
- Professional, helpful, articulate, and confident.
- Emphasize real-world production experience in C# .NET, React, SQL Server, and enterprise healthcare modules.
- Keep responses concise (100-200 words) with crisp markdown bullet points where appropriate.`;

      let promptText = message;
      if (Array.isArray(history) && history.length > 0) {
        const historyContext = history
          .slice(-6)
          .map((h: { sender: string; text: string }) => `${h.sender === "user" ? "User" : "Vinay-AI"}: ${h.text}`)
          .join("\n");
        promptText = `Previous conversation:\n${historyContext}\n\nUser: ${message}`;
      }

      const response = await generateWithRetry(ai, {
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || "Thanks for reaching out! Feel free to review the engineering challenge deep-dives or contact me directly for full-stack opportunities." });
    } catch (err: any) {
      console.error("Error in /api/assistant:", err);
      res.status(500).json({
        error: err.message || "An error occurred while generating response.",
        reply: "I am currently running in offline mode due to a temporary model service spike. Please feel free to browse my featured projects, tech stack breakdown, or contact me via email!",
      });
    }
  });

  // Project Architecture / Code Solution Deep Dive AI Endpoint
  app.post("/api/explain-architecture", async (req, res) => {
    try {
      const { projectName, problemStatement, technicalSolution, techStack } = req.body;
      const ai = getAiClient();

      const response = await generateWithRetry(ai, {
        model: "gemini-3.6-flash",
        contents: `Provide a high-level senior engineering architectural breakdown for this full-stack project:
Project Name: "${projectName}"
Problem Statement: "${problemStatement}"
Technical Solution: "${technicalSolution}"
Tech Stack: "${Array.isArray(techStack) ? techStack.join(', ') : techStack}"

Format your response in 3 crisp sections:
1. Architectural Flow & Data Pipeline
2. Key Trade-offs & Performance Design Decisions
3. Scalability & High Availability Strategy`,
        config: {
          temperature: 0.5,
        },
      });

      res.json({ explanation: response.text });
    } catch (err: any) {
      console.error("Error explaining architecture:", err);
      res.status(500).json({ error: "Failed to generate architecture breakdown." });
    }
  });

  // Setup Vite in Dev or Static in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
