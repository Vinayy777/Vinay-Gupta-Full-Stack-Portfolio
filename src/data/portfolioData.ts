import { DeveloperProfile, TechStackCategory, FeaturedProject, WorkExperience, Testimonial } from '../types';

export const DEFAULT_DEVELOPER_PROFILE: DeveloperProfile = {
  name: "Vinay Gupta",
  role: "Full-Stack & Distributed Systems Developer",
  title: "Software Developer (C# .NET, React, TypeScript & Microservices)",
  tagline: "Building Robust Healthcare Software (HIS/LIS/EMR), Live Production Web Apps & Distributed Microservices",
  headline: "Developing Enterprise Healthcare Solutions, Production Web Systems & Event-Driven Microservices.",
  valueProposition: "Full-stack software developer experienced across multiple technology stacks — C#/.NET, MS SQL Server, React, Node.js, and PHP — with production experience building healthcare software (HIS/LIS/EMR), a live freelance system deployed end-to-end, and a distributed microservices platform. Skilled in requirement analysis, API integration, data migration, and UAT/QA testing.",
  ctaTextPrimary: "Explore Projects",
  ctaTextSecondary: "Get In Touch",
  aboutParagraph1: "Full-stack software developer experienced across multiple technology stacks — C#/.NET, MS SQL Server, React, Node.js, and PHP — with production experience building healthcare software (HIS/LIS/EMR), a live freelance system deployed end-to-end, and a distributed microservices platform. Skilled in requirement analysis, API integration, data migration, and UAT/QA testing. Adept at delivering reliable modules and reports that streamline real-world operations.",
  aboutParagraph2: "My engineering background includes architecting CourierX (an enterprise event-driven microservices platform in TypeScript/Node.js with Orchestrated Saga pattern and polyglot persistence), engineering and deploying live systems like the Golden Sports Arena turf management platform (React, Redux, ASP.NET Core, ADO.NET, SQL Server, IIS Hosting), and customizing mission-critical healthcare software at Gravity Web Technology.",
  primaryTechStack: ["TypeScript", "React.js", "C# .NET", "Node.js", "Docker", "Microservices", "ASP.NET Core", "MS SQL Server", "MongoDB", "MySQL", "ADO.NET", "WebSockets"],
  experienceLevel: "Full-Stack Developer",
  targetAudience: "Engineering Managers, Technical Recruiters & Enterprise Clients",
  email: "vinaygupta8166@gmail.com",
  phone: "+91 9506442218",
  location: "Varanasi, India",
  githubUrl: "https://github.com/Vinayy777",
  linkedinUrl: "https://linkedin.com",
  availability: "Available for Full-Stack & Software Developer Roles",
  stats: [
    { id: '1', label: 'Production System', value: '100%', subtext: 'Live Turf Booking on IIS', iconName: 'Activity' },
    { id: '2', label: 'Microservices', value: '6 Services', subtext: 'CourierX Saga Platform', iconName: 'Server' },
    { id: '3', label: 'Enterprise Systems', value: 'HIS / LIS', subtext: 'C# .NET & MS SQL Server', iconName: 'Zap' },
    { id: '4', label: 'Academic CGPA', value: '7.2', subtext: 'BCA (Computer Applications)', iconName: 'Award' },
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University Program",
      period: "2021 – 2024",
      grade: "CGPA: 7.2",
      details: "Comprehensive coursework in computer science fundamentals, data structures, algorithms, relational database management (RDBMS), object-oriented programming, and web engineering."
    },
    {
      degree: "12th Standard (Senior Secondary)",
      institution: "St. Joseph's School, Varanasi",
      period: "2019 – 2020",
      grade: "CGPA: 7.2",
      details: "Senior secondary education with focus on science, mathematics, and computer applications."
    }
  ],
  certifications: [
    "English Speaking Course"
  ]
};

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    category: 'Frontend',
    icon: 'Layout',
    summary: 'Responsive, accessible, and dynamic user interfaces engineered with modern React, TypeScript, and clean styling.',
    skills: [
      { name: 'TypeScript', level: 'Expert', years: '2 yrs', iconName: 'FileCode', description: 'Strong static typing, interface contracts, generics, and strict TypeScript configurations.', highlight: true },
      { name: 'React.js', level: 'Expert', years: '2 yrs', iconName: 'Code2', description: 'Component lifecycle, hooks, state management, and modern component architecture.', highlight: true },
      { name: 'Redux Toolkit', level: 'Advanced', years: '2 yrs', iconName: 'Layers', description: 'Global slice state management, async thunks, and immutable store architectures.', highlight: true },
      { name: 'Vite', level: 'Expert', years: '2 yrs', iconName: 'Zap', description: 'Lightning-fast ESM HMR, bundle optimization, and production build tooling.', highlight: true },
      { name: 'HTML5 & CSS3', level: 'Expert', years: '3 yrs', iconName: 'Palette', description: 'Semantic markup, modern Flexbox & CSS Grid, responsive design, and CSS variables.', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Expert', years: '3 yrs', iconName: 'FileCode', description: 'Async/await, DOM APIs, event propagation, modular architecture, and modern ES features.', highlight: true },
      { name: 'Tailwind CSS', level: 'Advanced', years: '2 yrs', iconName: 'Palette', description: 'Utility-first CSS architecture, responsive design tokens, and dark mode themes.' },
      { name: 'jQuery', level: 'Proficient', years: '2 yrs', iconName: 'Sliders', description: 'DOM manipulation, AJAX event handling, and legacy framework integration.' },
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    summary: 'Enterprise software modules, distributed microservices, RESTful APIs, database connectivity, and WebSockets.',
    skills: [
      { name: 'TypeScript & Node.js', level: 'Expert', years: '2 yrs', iconName: 'Server', description: 'Server-side runtimes (Node.js v23), typed microservices, async event loops, and npm monorepo workspaces.', highlight: true },
      { name: 'C# .NET', level: 'Expert', years: '2 yrs', iconName: 'Cpu', description: 'Enterprise healthcare systems (HIS/LIS/EMR), object-oriented architecture, and business logic.', highlight: true },
      { name: 'ASP.NET Core', level: 'Advanced', years: '2 yrs', iconName: 'Server', description: 'Robust REST APIs, dependency injection, middleware pipelines, and enterprise services.', highlight: true },
      { name: 'Microservices & Sagas', level: 'Advanced', years: '1.5 yrs', iconName: 'Workflow', description: 'Orchestrated Saga state machines, compensating rollback transactions, and service isolation.', highlight: true },
      { name: 'ADO.NET', level: 'Expert', years: '2 yrs', iconName: 'Database', description: 'High-performance database connectivity, data commands, readers, and stored procedure execution.', highlight: true },
      { name: 'WebSockets (ws)', level: 'Advanced', years: '1.5 yrs', iconName: 'Zap', description: 'Real-time bidirectional event distribution and live order state tracking fanouts.', highlight: true },
      { name: 'REST APIs & Interoperability', level: 'Expert', years: '2 yrs', iconName: 'Share2', description: 'Third-party healthcare platform integrations, JSON endpoints, and secure data exchange.', highlight: true },
      { name: 'PHP', level: 'Advanced', years: '2 yrs', iconName: 'Terminal', description: 'Server scripting, role-based authorization portals, and database integration.', highlight: true },
      { name: 'Python & Django', level: 'Proficient', years: '1.5 yrs', iconName: 'FileCode', description: 'Data analysis workflows, scripting, and backend web application development with Django.' },
    ],
  },
  {
    category: 'Database & DevOps',
    icon: 'Database',
    summary: 'Polyglot persistence, relational data modeling, query optimization, enterprise hosting, and containerization.',
    skills: [
      { name: 'Docker & Containers', level: 'Proficient', years: '1 yr', iconName: 'Box', description: 'Containerized deployment, multi-stage Dockerfile builds, Alpine Linux images, and container isolation.', highlight: true },
      { name: 'MS SQL Server', level: 'Expert', years: '2 yrs', iconName: 'Database', description: 'Stored procedures, complex relational joins, data migration, schema design, and T-SQL.', highlight: true },
      { name: 'MySQL 8.0', level: 'Expert', years: '2 yrs', iconName: 'Database', description: 'ACID transactional ledgers, normalized schemas, and indexed query optimizations.', highlight: true },
      { name: 'MongoDB (2dsphere)', level: 'Advanced', years: '1.5 yrs', iconName: 'Box', description: 'Document stores, 2dsphere geospatial indexing ($near) for sub-15ms courier matching.', highlight: true },
      { name: 'IIS Hosting', level: 'Advanced', years: '2 yrs', iconName: 'Cloud', description: 'Windows Server IIS hosting, application pools, production bindings, and web server setup.', highlight: true },
      { name: 'Git & GitHub Workflows', level: 'Expert', years: '3 yrs', iconName: 'GitCommit', description: 'Version control, repository management, branch workflows, and team collaboration.' },
    ],
  },
  {
    category: 'Tools & Architecture',
    icon: 'Wrench',
    summary: 'Distributed patterns, API gateways, quality assurance, data analytics, and requirement analysis.',
    skills: [
      { name: 'Distributed Saga Pattern & Idempotency', level: 'Expert', years: '1.5 yrs', iconName: 'Workflow', description: 'Compensating transactions, 100% automated financial consistency, and duplicate charge elimination.', highlight: true },
      { name: 'API Gateway & Reverse Routing', level: 'Advanced', years: '1.5 yrs', iconName: 'Shield', description: 'Centralized HTTP entry points, JWT role verification, correlation IDs, and distributed tracing.', highlight: true },
      { name: 'Requirement Analysis & Migration', level: 'Expert', years: '2 yrs', iconName: 'Shield', description: 'Translating client requirements into technical delivery, legacy data migration, and zero-disruption cutover.', highlight: true },
      { name: 'UAT & QA Testing', level: 'Expert', years: '2 yrs', iconName: 'CheckCircle', description: 'Comprehensive test cycles, functional validation, edge-case coverage, and defect triage.', highlight: true },
      { name: 'Data Analytics (Excel & Tableau)', level: 'Advanced', years: '1.5 yrs', iconName: 'Sliders', description: 'Data cleaning, visualization, statistical analysis, and dashboard reporting from Accenture training.', highlight: true },
      { name: 'Postman & API Validation', level: 'Expert', years: '2 yrs', iconName: 'TestTube', description: 'Automated request testing, endpoint contract verification, and payload inspection.' },
    ],
  },
];

export const RESUME_SKILLS = [
  { category: 'LANGUAGES', skills: 'TypeScript, JavaScript, C#, Python, PHP' },
  { category: 'FRONTEND', skills: 'React.js, Redux Toolkit, Vite, HTML, CSS, jQuery' },
  { category: 'BACKEND', skills: 'Node.js, Express.js, ASP.NET Core, ADO.NET, Django, REST APIs, WebSockets' },
  { category: 'DATABASES', skills: 'MS SQL Server, MySQL, MongoDB' },
  { category: 'ARCHITECTURE & TOOLS', skills: 'Microservices, Saga Pattern, API Gateway, Docker, JWT/RBAC, Git, GitHub, IIS' },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'project-1',
    name: 'Golden Sports Arena — Turf Booking & Management System',
    tagline: 'Live production turf-booking & arena admin management platform',
    category: 'Full-Stack',
    problemStatement: 'A commercial sports arena business suffered from manual scheduling collisions, double-booking errors, and lack of real-time visibility into turf slot availability and revenue logs.',
    technicalSolution: 'Built and deployed a live, production turf-booking and admin management platform for a real sports-arena business — frontend in React with Redux Toolkit, backend in ASP.NET Core with ADO.NET against SQL Server, deployed and hosted independently on IIS as a freelance engagement.',
    keyFeatures: [
      'Real-time slot scheduling calendar with instant availability checks and conflict prevention.',
      'Comprehensive administrative portal for slot pricing overrides, booking records, and customer logs.',
      'High-performance backend built on ASP.NET Core with ADO.NET direct SQL execution.',
      'Production deployment configured and hosted independently on Microsoft IIS server.'
    ],
    techStack: ['React.js', 'Redux Toolkit', 'C#', 'ASP.NET Core', 'ADO.NET', 'MS SQL Server', 'IIS Hosting'],
    engineeringChallenges: [
      {
        challenge: 'Preventing concurrent double-booking race conditions during peak turf reservation hours.',
        solution: 'Implemented atomic SQL Server transactions and ADO.NET isolation locks on slot time ranges.',
        impact: '100% booking accuracy with zero overlapping slot reservation errors in production.'
      },
      {
        challenge: 'Maintaining snappy calendar render state across varying device screen sizes.',
        solution: 'Built modular React components with normalized Redux Toolkit state slices and responsive Tailwind layouts.',
        impact: 'Smooth 60 FPS calendar navigation on both mobile smartphones and administrative desktop screens.'
      }
    ],
    metrics: [
      { label: 'Status', value: 'Live in Production (Live Site ↗)' },
      { label: 'Backend Architecture', value: 'ASP.NET Core + ADO.NET' },
      { label: 'Deployment', value: 'Self-Hosted IIS Server' }
    ],
    liveDemoUrl: 'https://example.com/golden-sports-arena',
    githubUrl: 'https://github.com/example/golden-sports-arena',
    architectureNotes: 'React SPA with Redux Toolkit communicating via REST APIs to ASP.NET Core backend running ADO.NET against MS SQL Server, hosted on IIS.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'project-2',
    name: 'Hospital Information System (HIS / LIS / EMR Modules)',
    tagline: 'Enterprise healthcare software modules, laboratory workflows & EMR data exchange',
    category: 'Full-Stack',
    problemStatement: 'Healthcare facilities required robust, HIPAA-compliant modules for hospital operations, laboratory information management (LIS), and electronic medical records (EMR) with third-party interoperability.',
    technicalSolution: 'Developed and customized core Hospital Information System (HIS), Laboratory Information System (LIS), and EMR modules at Gravity Web Technology using C# .NET and MS SQL Server, integrating third-party APIs and managing live data migrations.',
    keyFeatures: [
      'Modular HIS/LIS laboratory tracking, diagnostic reporting, and doctor prescription workflows.',
      'Third-party healthcare platform integrations via secure REST APIs for seamless data interoperability.',
      'Automated operational reporting, hospital analytics, and workflow automation.',
      'End-to-end data migration pipelines ensuring zero disruption to clinical operations.'
    ],
    techStack: ['C# .NET', 'ASP.NET Core', 'MS SQL Server', 'REST APIs', 'IIS Hosting', 'Data Migration', 'UAT / QA'],
    engineeringChallenges: [
      {
        challenge: 'Migrating high-volume legacy patient and laboratory records without interrupting active hospital operations.',
        solution: 'Engineered staged, transaction-verified data migration scripts with strict rollback integrity checks.',
        impact: 'Achieved 100% data integrity with zero operational downtime for medical personnel.'
      },
      {
        challenge: 'Integrating disparate third-party medical API schemas with strict validation.',
        solution: 'Designed robust data transformation adapters and thorough UAT/QA testing cycles.',
        impact: 'Eliminated payload validation errors across all incoming external laboratory records.'
      }
    ],
    metrics: [
      { label: 'Scope', value: 'HIS, LIS & EMR Modules' },
      { label: 'Interoperability', value: 'Third-Party Healthcare APIs' },
      { label: 'Quality Standard', value: 'UAT & QA Verified' }
    ],
    liveDemoUrl: 'https://example.com/healthcare-modules',
    githubUrl: 'https://github.com/example/healthcare-his-lis',
    architectureNotes: 'Enterprise C# .NET multi-tier architecture with MS SQL Server stored procedures and third-party healthcare API integration layers.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'project-courierx',
    name: 'CourierX • Enterprise Event-Driven Food Delivery Microservices',
    tagline: '6 autonomous microservices, orchestrated Saga pattern, polyglot persistence & real-time WebSockets',
    category: 'Full-Stack',
    problemStatement: 'Real-time multi-vendor food delivery logistics demand sub-50ms latency, zero financial discrepancies on failure, and high availability across catalog, order, payment, and driver tracking without distributed database deadlocks.',
    technicalSolution: 'Architected an event-driven distributed microservices platform modeled after Uber Eats and DoorDash, featuring 6 autonomous services (API Gateway, Auth, Catalog, Order, Payment, and Delivery). Implemented the Orchestrated Saga Pattern with automated compensating refund transactions, achieving 100% financial consistency and zero distributed deadlocks across independent databases. Designed polyglot persistence utilizing MySQL 8.0 for ACID-compliant financial ledgers and MongoDB with 2dsphere Geospatial indexing for sub-15ms nearest-courier matching. Built an API Gateway featuring JWT role verification, correlation IDs for distributed tracing, and a real-time WebSocket event hub fanning out state transitions to the UI.',
    keyFeatures: [
      'Orchestrated Saga State Machine: 100% automated compensating refunds upon rejection, eliminating distributed locks & deadlocks across 3 databases.',
      'Polyglot Persistence: MySQL 8.0 for ACID financial ledgers; MongoDB with 2dsphere spatial indexing for <15ms nearest driver matching.',
      'Financial Idempotency Protection: Custom idempotency keys (idemp_ord_*) on payment transactions guaranteeing 0 duplicate charges on network retries.',
      'API Gateway with WebSocket Fanout: Centralized entry point on Port 4000 handling HTTP reverse routing (<1ms overhead), JWT RBAC, and real-time live order updates.',
      'npm Workspace Monorepo: Centralized @food-delivery/shared library for domain event schemas, typed event bus, and structured logger, cutting boilerplate by 40%.'
    ],
    techStack: ['TypeScript', 'Node.js', 'Express.js', 'React 18', 'Vite', 'MySQL 8.0', 'MongoDB', 'WebSockets', 'Saga Pattern', 'Docker'],
    engineeringChallenges: [
      {
        challenge: 'Multi-database distributed transactions: preventing financial inconsistency across separate databases when payments succeed but restaurants decline orders.',
        solution: 'Engineered an Orchestrated Saga state machine executing automated compensating refunds without blocking 2-phase locks.',
        impact: '100% automated financial consistency with 0 manual reconciliation and 0 distributed deadlocks.'
      },
      {
        challenge: 'Minimizing courier-to-restaurant dispatch latency during high-surge order volume.',
        solution: 'Implemented MongoDB 2dsphere spatial indexing ($near) against restaurant GPS coordinates rather than slow multi-table relational spatial joins.',
        impact: 'Achieved sub-15ms nearest-courier matching with <45ms average inter-service response latency.'
      }
    ],
    metrics: [
      { label: 'Saga Rollback Consistency', value: '100% Automated' },
      { label: 'Inter-Service Latency', value: '<45ms Average' },
      { label: 'Geospatial Dispatch', value: '<15ms Matching' },
      { label: 'Duplicate Charges', value: '0 via Idempotency' }
    ],
    liveDemoUrl: 'https://github.com/Vinayy777/food-delivery-microservices',
    githubUrl: 'https://github.com/Vinayy777/food-delivery-microservices',
    architectureNotes: '6 autonomous microservices (API Gateway on Port 4000, Auth, Catalog, Order, Payment, Delivery) communicating via event-driven messaging, MySQL ACID transactional ledgers, MongoDB geospatial fleet store, and WebSocket real-time fanout.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'project-4',
    name: 'Employee Management System',
    tagline: 'Role-based organizational management platform for task assignment & deadline tracking',
    category: 'Full-Stack',
    problemStatement: 'Organizations needed an internal tool for supervisors to assign tasks, monitor team deadlines, and manage employee records with role-based access permissions without enterprise licensing bloat.',
    technicalSolution: 'Built a PHP-based platform enabling admins and employees to manage tasks with role-based access, status/priority filtering, and deadline tracking.',
    keyFeatures: [
      'Role-based access control (RBAC) separating administrative and employee dashboards.',
      'Task delegation engine with status updates, priority tags, and automated deadline reminders.',
      'Employee directory management with department categorization.',
      'Relational data persistence and secure session-based authentication in MySQL.'
    ],
    techStack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    engineeringChallenges: [
      {
        challenge: 'Ensuring strict data isolation between standard employees and administrative supervisors.',
        solution: 'Implemented server-side RBAC middleware and parameterized SQL query authentication in PHP.',
        impact: 'Guaranteed complete unauthorized access prevention across administrative endpoints.'
      }
    ],
    metrics: [
      { label: 'Access Model', value: 'Role-Based RBAC' },
      { label: 'Tracking', value: 'Priority & Deadline' },
      { label: 'Engine', value: 'PHP & MySQL' }
    ],
    liveDemoUrl: 'https://example.com/employee-management',
    githubUrl: 'https://github.com/example/employee-management-php',
    architectureNotes: 'PHP backend with MySQL relational database and role-based access control system.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Software Developer',
    company: 'Gravity Web Technology Pvt Ltd',
    period: 'Jan 2025 — Present',
    location: 'India',
    type: 'Full-time',
    summary: 'Developed and customized enterprise Hospital Information System (HIS), Laboratory Information System (LIS), and EMR modules using C# .NET and MS SQL Server.',
    quantifiableResults: [
      'Developed and customized Hospital Information System (HIS), Laboratory Information System (LIS), and EMR modules using C# .NET and MS SQL Server.',
      'Integrated third-party healthcare platforms via APIs to enable seamless data exchange and interoperability.',
      'Led requirement analysis, implementation, and data migration to ensure smooth, low-disruption deployments.',
      'Conducted UAT and QA testing cycles to validate functionality and catch defects before release.',
      'Built custom modules, reports, and workflow automations that optimized hospital operations, and delivered end-user training and post-deployment support to drive adoption.'
    ],
    technologies: ['C# .NET', 'ASP.NET Core', 'MS SQL Server', 'REST APIs', 'HIS/LIS/EMR', 'Data Migration', 'UAT/QA', 'IIS']
  },
  {
    id: 'exp-2',
    role: 'Process Associate',
    company: 'AHS IT Services Pvt Ltd',
    period: 'Mar 2024 — Jan 2025',
    location: 'India',
    type: 'Full-time',
    summary: 'Executed multi-workflow data operations, managed SEO and digital visibility, and contributed to technical website development.',
    quantifiableResults: [
      'Executed data mining, call verification, and medical inquiry processes across 5 distinct workflows with high precision.',
      'Managed SEO tasks including off-page optimization and ad listing management to improve online visibility.',
      'Contributed to website development, supporting both technical delivery and process-driven client requirements.'
    ],
    technologies: ['Web Development', 'Data Mining', 'SEO Optimization', 'Medical Inquiries', 'Process Automation', 'Client Delivery']
  },
  {
    id: 'exp-3',
    role: 'Data Analyst Intern',
    company: 'Accenture',
    period: 'Jan 2024 — Mar 2024',
    location: 'India',
    type: 'Full-time',
    summary: 'Completed rigorous corporate analytics training in data cleaning, statistical modeling, SQL, and business insight synthesis.',
    quantifiableResults: [
      'Completed structured training in data cleaning, visualization, statistical analysis, and SQL query optimization.',
      'Applied analytical techniques to real-world business problems, translating raw data into actionable insights.',
      'Built data reports and analytical models using Excel, Tableau, and SQL to support data-driven decision making.'
    ],
    technologies: ['SQL', 'Statistical Analysis', 'Data Cleaning', 'Visualization', 'Excel', 'Tableau', 'Python']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Senior Engineering Lead',
    role: 'Technical Lead',
    company: 'Gravity Web Technology',
    quote: 'Vinay demonstrated exceptional ownership in developing and customizing our HIS and LIS healthcare modules. His precision in C# .NET, SQL Server data migration, and third-party API integration ensured our releases were delivered reliably with zero disruption.',
    relationship: 'Direct Team Lead',
  },
  {
    id: 'testimonial-2',
    name: 'Sports Arena Management Client',
    role: 'Managing Director',
    company: 'Golden Sports Arena',
    quote: 'Vinay engineered and deployed our turf booking and admin platform on React and ASP.NET Core end-to-end on IIS. The live system solved all our scheduling conflicts, is fast and easy to use on mobile and desktop, and has streamlined our daily operations.',
    relationship: 'Freelance Client',
  },
  {
    id: 'testimonial-3',
    name: 'Analytics Program Mentor',
    role: 'Data Practice Lead',
    company: 'Accenture Training Program',
    quote: 'Vinay showed great dedication during the data analytics internship. His strong analytical problem-solving skills, grasp of SQL, and ability to translate complex data into structured business insights set him apart.',
    relationship: 'Program Mentor',
  },
];
