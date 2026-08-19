// ============================================================
// CENTRAL DATA CONFIGURATION — Kinjal Gawali Portfolio
// ============================================================
// Edit this file to update all portfolio content.
// Replace all [INSERT_...] placeholders with real data.

// ── Personal Info ────────────────────────────────────────────
export const PERSONAL = {
  name:       'Kinjal Gawali',
  tagline:    'Software Engineer & Developer',
  subtitle:   'Third-Year CSE Student',
  location:   'India',
  status:     'Building. Learning. Evolving.',
  email:      'kinjalgawali743@gmail.com',
  contactFormKey: 'ecc3963f-e845-4665-89dc-3d11541eb91c',
  github:     'https://github.com/kinjal000',
  linkedin:   'https://www.linkedin.com/in/kinjal-gawali-0456a5334/',
  resumeUrl:  '/resume.html',
  bio: [
    `I'm Kinjal Gawali, a Computer Science student focused on learning through building. I enjoy turning ideas into practical applications and experimenting with technologies across software development, web systems, cloud infrastructure, and emerging technologies.`,
    `My journey has been shaped by hands-on academic projects, hackathons, workshops, and continuous exploration. I believe the best way to understand technology is to build with it, break things, solve problems, and improve along the way.`,
  ],
};

// ── Currently Exploring ──────────────────────────────────────
export const EXPLORING = [
  {
    id: 'webdev',
    label: 'Web Development',
    icon: '⬡',
    description: 'Building modern, interactive web applications using current frameworks, patterns, and tooling.',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: '◈',
    description: 'Exploring data-driven approaches, model concepts, and how AI is transforming software systems.',
  },
  {
    id: 'flutter',
    label: 'Flutter & Mobile',
    icon: '◇',
    description: 'Learning cross-platform mobile development with Dart and Flutter for real device experiences.',
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: '⊡',
    description: 'Understanding containerization, CI/CD pipelines, and how software is deployed and maintained.',
  },
  {
    id: 'cloud',
    label: 'Cloud Computing',
    icon: '◯',
    description: 'Exploring how modern applications are deployed, scaled, and managed on cloud infrastructure.',
  },
];

// ── Skills ───────────────────────────────────────────────────
export const SKILLS = [
  {
    category: '01 / LANGUAGES',
    color: '#10b981',
    items: ['C++', 'Python', 'Java', 'JavaScript', 'Dart', 'SQL', 'Shell Scripting', 'Bash'],
  },
  {
    category: '02 / WEB & BACKEND',
    color: '#34d399',
    items: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'Django', 'React', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'Socket.IO', 'Firebase', 'Supabase', 'WebSockets'],
  },
  {
    category: '03 / DATABASES & TOOLS',
    color: '#6ee7b7',
    items: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Firebase Realtime Database', 'Cloud Firestore', 'Apache', 'Canva', 'Figma', 'Git', 'GitHub', 'VS Code', 'Google Colab', 'Postman', 'Linux', 'Kubernetes', 'Docker', 'Ubuntu', 'Nginx', 'npm', 'Cisco Packet Tracer', 'Google Cloud Platform'],
  },
];

// ── Projects ─────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'space',
    number: '01',
    theme: 'space',
    title: 'Space Mission Data Operations Platform',
    shortDesc: 'A cloud-native mission operations platform designed to centralize the management of satellites, missions, telemetry data, and operational analytics.',
    overview: 'A cloud-native mission operations platform designed to centralize the management of satellites, missions, telemetry data, and operational analytics. The project focuses on building a reliable DevOps ecosystem for mission-critical systems where availability, monitoring, automation, and recovery are essential.',
    features: [
      'Centralized mission operations dashboard',
      'Satellite and mission management',
      'Telemetry and operational data tracking',
      'Secure administrator access',
      'Containerized application deployment',
      'Automated CI/CD workflow',
      'Infrastructure provisioning using Infrastructure as Code',
      'Real-time monitoring and centralized logging',
      'Disaster recovery mechanisms',
    ],
    architecture: 'The platform follows a cloud-native architecture where the application is containerized using Docker and deployed through Kubernetes. Jenkins handles automated CI/CD workflows, while Terraform provisions infrastructure resources such as networking, security groups, and compute environments. Prometheus collects performance metrics and Grafana provides operational dashboards.',
    techStack: ['Python', 'Flask', 'MySQL / SQLite', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Prometheus', 'Grafana', 'ELK Stack', 'HashiCorp Vault', 'Linux'],
    highlight: 'Built as a complete DevOps-focused system with automated deployment, monitoring, logging, container orchestration, infrastructure automation, and disaster recovery for improved reliability and scalability.',
    github: 'https://github.com/kinjal000/Space-Mission-Data-Operations-Platform',
    liveUrl: 'https://space-mission-data-operations-platf.vercel.app/login',
  },
  {
    id: 'fintech',
    number: '02',
    theme: 'fintech',
    title: 'WealthPath — Investment Advisory Cloud',
    shortDesc: 'A cloud-based investment management platform designed to centralize client and investment records in a secure and structured environment.',
    overview: 'A cloud-based investment management platform designed to centralize client and investment records in a secure and structured environment. The project replaces inefficient spreadsheet-based management with a web application deployed on cloud infrastructure.',
    features: [
      'Secure administrator login',
      'Client management system',
      'Investment record management',
      'Centralized dashboard',
      'Structured MySQL database',
      'Cloud deployment on AWS EC2',
      'Automated backup and maintenance workflows',
      'Performance monitoring and access control',
    ],
    architecture: 'Users access the Flask application through a web browser. The application runs on an Ubuntu-based AWS EC2 instance and communicates with a MySQL database. Amazon S3 is used for storage and backups, CloudWatch supports monitoring, and IAM manages access control and permissions.',
    techStack: ['Python', 'Flask', 'MySQL', 'AWS EC2', 'Amazon S3', 'CloudWatch', 'IAM', 'Ubuntu', 'Linux', 'Shell Scripting'],
    highlight: 'The project combines full-stack development with practical cloud deployment, Linux administration, automation, monitoring, and security concepts. The application includes Login, Dashboard, Client Management, and Investment Management modules.',
    github: 'https://github.com/kinjal000/WealthPath',
    liveUrl: 'https://wealth-path-git-main-vercel-live.vercel.app/login',
  },
  {
    id: 'geo',
    number: '03',
    theme: 'geo',
    title: 'GeoAlert — Location-Based Notification System',
    shortDesc: 'GeoAlert is a location-aware notification platform that uses geofencing to generate contextual alerts based on a user\'s geographical location.',
    overview: 'GeoAlert is a location-aware notification platform that demonstrates how modern applications can use geofencing to generate contextual alerts based on a user\'s geographical location.\n\nUsers can search locations such as airports, malls, railway stations, tourist places, and business centers. The system processes the location, simulates geofence detection, and generates relevant notifications.',
    features: [
      'User registration and authentication',
      'Interactive dashboard',
      'Location search functionality',
      'Interactive map visualization',
      'Simulated geofence detection',
      'Nearby offer notifications',
      'Traffic alerts',
      'Emergency notifications',
      'Parking updates',
      'Event notifications',
      'Location history',
      'Notification logs',
      'User notification preferences',
    ],
    architecture: 'GeoAlert follows a layered architecture consisting of the frontend, Flask routes, controllers, services, and database models. The project uses a hybrid database approach: MySQL manages structured user and event data, while MongoDB stores geofences, location history, and notification logs.',
    techStack: ['Python', 'Flask', 'MySQL', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Leaflet', 'REST APIs'],
    highlight: 'The project demonstrates practical system design concepts including geofencing, layered architecture, REST APIs, hybrid database management, and scalable notification processing.',
    github: 'https://github.com/kinjal000/GeoAlert-Location-Based-Notification-System',
    liveUrl: 'https://geo-alert-location-based-notificati.vercel.app/register-page',
  },
];


// ── Journey ──────────────────────────────────────────────────
export const JOURNEY = [
  {
    year: '2024',
    label: 'The Beginning',
    description: 'Started my Computer Science journey. Built a foundation in programming fundamentals, problem-solving, data structures, and algorithmic thinking.',
    tags: ['CS Fundamentals', 'Programming', 'Problem Solving'],
  },
  {
    year: '2025',
    label: 'Learning Through Building',
    description: 'Worked on academic and hands-on projects while exploring web development, databases, APIs, software systems, and emerging technologies. Participated in technical events and hackathons.',
    tags: ['Web Dev', 'Databases', 'APIs', 'Hackathons'],
  },
  {
    year: '2026',
    label: 'Expanding the Stack',
    description: 'Continued building more complex projects while exploring cloud computing, DevOps, Flutter development, machine learning, and modern development tools. Entered the Student Portfolio Hackathon.',
    tags: ['Cloud', 'DevOps', 'Flutter', 'ML'],
  },
  {
    year: 'Now',
    label: 'What\'s Next',
    description: 'Focused on strengthening engineering fundamentals, building practical applications, and preparing for opportunities where I can learn, contribute, and grow as a software engineer.',
    tags: ['Open to Opportunities', 'Building', 'Growing'],
  },
];

// ── Highlights & Experiences ─────────────────────────────────
export const HIGHLIGHTS = [
  {
    year: '2026',
    type: 'Hackathon',
    title: 'Student Portfolio Hackathon 2026',
    description: 'Designing and building a premium personal portfolio as part of a student hackathon evaluated by an industry panel.',
    tag: 'Participant',
  },
  {
    year: '2025',
    type: 'Hackathon',
    title: 'Smart India Hackathon',
    description: 'Engaged with the Smart India Hackathon — India\'s largest national hackathon — exploring real-world problem statements across domains.',
    tag: 'Experience',
  },
  {
    year: '2025',
    type: 'Workshop',
    title: 'Snapchat AR Lenses — Bharat XR',
    description: 'Participated in an AR/VR workshop organized by Bharat XR for B.Tech CSE students at ITM Skills University. Explored Snapchat Lens Studio for creating augmented reality experiences.',
    tag: 'Workshop · Feb 2025',
  },
  {
    year: '2025',
    type: 'Learning',
    title: 'GenAI 101 with Pieces',
    description: 'Completed a structured learning program exploring Generative AI concepts, tools, and practical applications with the Pieces platform.',
    tag: 'Certificate',
  },
  {
    year: '2025',
    type: 'Conference',
    title: 'VIDNET Conference',
    description: 'Attended VIDNET, gaining exposure to industry perspectives and technical discussions on emerging technology domains.',
    tag: 'Attendee',
  },
  {
    year: '2025',
    type: 'Event',
    title: 'Technical Hackathons & Events',
    description: 'Participated in multiple inter-college technical events and hackathons, building skills in rapid prototyping, teamwork, and problem-solving under time constraints.',
    tag: 'Multiple Events',
  },
];

export const CREDENTIALS = [
  {
    id: 'genai-pieces',
    title: 'GenAI 101 with Pieces',
    issuer: 'Pieces for Developers',
    date: '2025',
    description: 'Structured introduction to Generative AI concepts and practical tools.',
    credentialUrl: '[INSERT_CREDENTIAL_URL_OR_LEAVE_EMPTY]',
    image: '/certs/cert2.png',
    icon: '🤖',
  },
  {
    id: 'ar-bharat-xr',
    title: 'Snapchat AR Lenses using Lens Studio',
    issuer: 'Bharat XR · ITM Skills University',
    date: 'February 2025',
    description: 'AR/VR workshop — creating augmented reality lenses with Snapchat Lens Studio.',
    credentialUrl: '[INSERT_CREDENTIAL_URL_OR_LEAVE_EMPTY]',
    image: '/certs/cert1.png',
    icon: '🥽',
  },
  {
    id: 'prompt-off-upgrad',
    title: 'Prompt-Off: Match the Masterpiece',
    issuer: 'upGrad & Microsoft',
    date: 'March 2025',
    description: 'AI-powered creativity challenge at Mumbai Tech Week 2025.',
    credentialUrl: '[INSERT_CREDENTIAL_URL_OR_LEAVE_EMPTY]',
    image: '/certs/cert3.png',
    icon: '✨',
  },
];
