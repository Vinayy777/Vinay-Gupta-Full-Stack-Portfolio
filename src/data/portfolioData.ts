import { DeveloperProfile, TechStackCategory, FeaturedProject, WorkExperience, Testimonial } from '../types';

export const DEFAULT_DEVELOPER_PROFILE: DeveloperProfile = {
  name: "Vinay Gupta",
  role: "Full-Stack Developer",
  title: "Full-Stack Developer (C# .NET, React & SQL Server)",
  tagline: "Building Robust Healthcare Software (HIS/LIS/EMR) & Production-Grade Web Systems",
  headline: "Developing Enterprise Healthcare Solutions & High-Performance Full-Stack Applications.",
  valueProposition: "Full-stack developer with hands-on experience building and customizing healthcare software (HIS/LIS/EMR) using C#, .NET, and MS SQL Server — plus independent and freelance project work spanning React, Node.js, and PHP, including a live production system built and deployed end-to-end. Skilled in requirement analysis, third-party API integration, data migration, and UAT/QA testing.",
  ctaTextPrimary: "Explore Projects",
  ctaTextSecondary: "Get In Touch",
  aboutParagraph1: "Full-stack developer with hands-on experience building and customizing healthcare software (HIS/LIS/EMR) using C#, .NET, and MS SQL Server — plus independent and freelance project work spanning React, Node.js, and PHP, including a live production system built and deployed end-to-end. Skilled in requirement analysis, third-party API integration, data migration, and UAT/QA testing. Adept at delivering reliable modules and reports that streamline real-world operations.",
  aboutParagraph2: "My engineering background includes engineering and deploying live systems like the Golden Sports Arena turf management platform (React, Redux Toolkit, ASP.NET Core, ADO.NET, SQL Server, IIS Hosting), executing core medical inquiry and data mining workflows across 5 distinct processes, and completing rigorous data analytics training at Accenture. I am committed to clean code, robust database transactions, and end-to-end product delivery.",
  primaryTechStack: ["React.js", "C# .NET", "ASP.NET Core", "MS SQL Server", "ADO.NET", "Node.js", "Redux Toolkit", "PHP", "IIS Hosting"],
  experienceLevel: "Full-Stack Developer",
  targetAudience: "Engineering Managers, Technical Recruiters & Enterprise Clients",
  email: "vinaygupta8166@gmail.com",
  phone: "+91 9506442218",
  location: "Varanasi, India",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  availability: "Available for Full-Stack & Software Developer Roles",
  stats: [
    { id: '1', label: 'Production System', value: '100%', subtext: 'Live Turf Booking on IIS', iconName: 'Activity' },
    { id: '2', label: 'Enterprise Systems', value: 'HIS / LIS', subtext: 'C# .NET & MS SQL Server', iconName: 'Zap' },
    { id: '3', label: 'Academic CGPA', value: '7.2', subtext: 'BCA (Computer Applications)', iconName: 'Award' },
    { id: '4', label: 'Client Workflows', value: '5+', subtext: 'Process & API Automations', iconName: 'CheckCircle2' },
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
    summary: 'Responsive, accessible, and dynamic user interfaces engineered with modern React ecosystems and clean styling.',
    skills: [
      { name: 'React.js', level: 'Advanced', years: '2 yrs', iconName: 'Code2', description: 'Component lifecycle, hooks, state management, and modern component architecture.', highlight: true },
      { name: 'Redux Toolkit', level: 'Advanced', years: '2 yrs', iconName: 'Layers', description: 'Global slice state management, async thunks, and immutable store architectures.', highlight: true },
      { name: 'HTML5 & CSS3', level: 'Expert', years: '3 yrs', iconName: 'Palette', description: 'Semantic markup, modern Flexbox & CSS Grid, responsive design, and CSS variables.', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Expert', years: '3 yrs', iconName: 'FileCode', description: 'Async/await, DOM APIs, event propagation, modular architecture, and modern ES features.', highlight: true },
      { name: 'jQuery', level: 'Proficient', years: '2 yrs', iconName: 'Sliders', description: 'DOM manipulation, AJAX event handling, and legacy framework integration.' },
      { name: 'Tailwind CSS', level: 'Advanced', years: '2 yrs', iconName: 'Palette', description: 'Utility-first CSS architecture, responsive design tokens, and dark mode themes.' },
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    summary: 'Enterprise software modules, RESTful APIs, database connectivity, and backend web architectures.',
    skills: [
      { name: 'C# .NET', level: 'Expert', years: '2 yrs', iconName: 'Cpu', description: 'Enterprise healthcare systems (HIS/LIS/EMR), object-oriented architecture, and business logic.', highlight: true },
      { name: 'ASP.NET Core', level: 'Advanced', years: '2 yrs', iconName: 'Server', description: 'Robust REST APIs, dependency injection, middleware pipelines, and enterprise services.', highlight: true },
      { name: 'ADO.NET', level: 'Expert', years: '2 yrs', iconName: 'Database', description: 'High-performance database connectivity, data commands, readers, and stored procedure execution.', highlight: true },
      { name: 'Node.js & Express', level: 'Advanced', years: '2 yrs', iconName: 'Share2', description: 'Server-side runtime, modular Express routing, request validation, and API microservices.', highlight: true },
      { name: 'PHP', level: 'Advanced', years: '2 yrs', iconName: 'Terminal', description: 'Server scripting, role-based authorization portals, and database integration.', highlight: true },
      { name: 'Python & Django', level: 'Proficient', years: '1.5 yrs', iconName: 'FileCode', description: 'Data analysis workflows, scripting, and backend web application development with Django.' },
      { name: 'REST APIs & Interoperability', level: 'Expert', years: '2 yrs', iconName: 'Workflow', description: 'Third-party healthcare platform integrations, JSON endpoints, and secure data exchange.', highlight: true },
    ],
  },
  {
    category: 'Database & DevOps',
    icon: 'Database',
    summary: 'Relational data modeling, query optimization, enterprise hosting, and deployment.',
    skills: [
      { name: 'MS SQL Server', level: 'Expert', years: '2 yrs', iconName: 'Database', description: 'Stored procedures, complex relational joins, data migration, schema design, and T-SQL.', highlight: true },
      { name: 'MySQL', level: 'Advanced', years: '2 yrs', iconName: 'Database', description: 'Normalized relational database schemas, ACID transactions, and indexed query optimizations.', highlight: true },
      { name: 'MongoDB', level: 'Proficient', years: '1.5 yrs', iconName: 'Box', description: 'Document schema design, aggregation pipelines, and NoSQL data persistence.' },
      { name: 'IIS Hosting', level: 'Advanced', years: '2 yrs', iconName: 'Cloud', description: 'Windows Server IIS hosting, application pools, production bindings, and web server setup.', highlight: true },
      { name: 'Git & GitHub Workflows', level: 'Expert', years: '3 yrs', iconName: 'GitCommit', description: 'Version control, repository management, branch workflows, and team collaboration.' },
    ],
  },
  {
    category: 'Tools & Architecture',
    icon: 'Wrench',
    summary: 'Quality assurance, data analytics, business process optimization, and requirement analysis.',
    skills: [
      { name: 'Requirement Analysis & Migration', level: 'Expert', years: '2 yrs', iconName: 'Shield', description: 'Translating client requirements into technical delivery, legacy data migration, and zero-disruption cutover.', highlight: true },
      { name: 'UAT & QA Testing', level: 'Expert', years: '2 yrs', iconName: 'CheckCircle', description: 'Comprehensive test cycles, functional validation, edge-case coverage, and defect triage.', highlight: true },
      { name: 'Data Analytics (Excel & Tableau)', level: 'Advanced', years: '1.5 yrs', iconName: 'Sliders', description: 'Data cleaning, visualization, statistical analysis, and dashboard reporting from Accenture training.', highlight: true },
      { name: 'Postman & API Validation', level: 'Expert', years: '2 yrs', iconName: 'TestTube', description: 'Automated request testing, endpoint contract verification, and payload inspection.' },
    ],
  },
];

export const RESUME_SKILLS = [
  { category: 'LANGUAGES', skills: 'Python, JavaScript, C#, PHP' },
  { category: 'FRONTEND', skills: 'React.js, Redux Toolkit, HTML, CSS, jQuery' },
  { category: 'BACKEND', skills: 'Node.js, Express.js, ASP.NET Core, ADO.NET, Django' },
  { category: 'DATABASES', skills: 'MS SQL Server, MySQL, MongoDB' },
  { category: 'TOOLS', skills: 'Git, IIS Hosting, Excel, Tableau, REST APIs' },
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
    id: 'project-3',
    name: 'Myntra Clone — E-Commerce Web Application',
    tagline: 'Full-featured e-commerce platform replicating dynamic product catalog, filtering & auth',
    category: 'Full-Stack',
    problemStatement: 'Building an intuitive, high-converting e-commerce web platform capable of handling complex catalog filtering, multi-category searches, and dynamic shopping bag state persistence.',
    technicalSolution: 'Built a full-featured e-commerce clone replicating product listings, dynamic category/price filtering, cart management, and user authentication using React, Node.js, Redux, and React Router.',
    keyFeatures: [
      'Interactive product catalog with multi-facet category, brand, and price-tier filtering.',
      'Shopping bag and wishlist state synchronization powered by Redux.',
      'Client-side routing with React Router for seamless single-page transitions.',
      'Responsive design matching modern fashion marketplace UI standards.'
    ],
    techStack: ['React.js', 'Node.js', 'Redux', 'React Router', 'HTML5', 'CSS3', 'JavaScript'],
    engineeringChallenges: [
      {
        challenge: 'Maintaining instant filter response times across multi-dimensional product collections.',
        solution: 'Implemented memoized selector pipelines to avoid unnecessary UI re-renders on filter change.',
        impact: 'Sub-16ms instant UI updates when toggling multiple category and price filters.'
      }
    ],
    metrics: [
      { label: 'State Store', value: 'Redux State Tree' },
      { label: 'Routing', value: 'React Router SPA' },
      { label: 'Compatibility', value: '100% Mobile & Desktop' }
    ],
    liveDemoUrl: 'https://example.com/myntra-clone',
    githubUrl: 'https://github.com/example/myntra-clone',
    architectureNotes: 'React frontend with Redux store connecting to Node.js backend services and dynamic product catalog APIs.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
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
