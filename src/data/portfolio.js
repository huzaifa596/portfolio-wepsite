export const portfolio = {
  name: 'Huzaifa Naseer',
  initials: 'HN',
  role: 'Full-Stack Developer & ML Researcher',
  location: 'Lahore, Pakistan',
  email: 'huzaifanaseer596@gmail.com',
  phone: '+92 318 4271177',
  whatsapp: 'https://wa.me/+923411713517?text=Hi%20Huzaifa%2C%20I%20saw%20your%20portfolio!',
  linkedin: 'https://www.linkedin.com/in/huzaifa-naseer-231728234',
  github: 'https://github.com/huzaifa596',
  resumeUrl: '/assets/Huzaifa_Naseer_Resume.pdf',
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const marqueeItems = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'JavaScript',
  'C++',
  'Python',
  'XGBoost',
  'LightGBM',
  'LSTM',
  'SQL',
  'Git & GitHub',
  'SFML',
  'REST APIs',
]

export const stats = [
  { value: '3+', label: 'Internships completed' },
  { value: '5+', label: 'Shipped projects' },
  { value: '1', label: 'ML research publication target' },
]

export const experience = [
  {
    role: 'Research Intern — Healthcare ML',
    company: 'FAST-NUCES',
    period: 'Jul 2026 – Present',
    current: true,
    summary:
      'Designing XEL-Sepsis, an explainable ensemble learning model for early sepsis prediction using the MIMIC-IV ICU dataset.',
    bullets: [
      'Engineered feature pipelines and evaluated ensemble models with XGBoost, LightGBM, and LSTM architectures for early clinical risk assessment.',
      'Collaborated closely with faculty advisors and student peers on model interpretability (SHAP values) and performance metrics.',
    ],
    tags: ['Machine Learning', 'XGBoost', 'LightGBM', 'LSTM', 'Healthcare AI', 'Python'],
  },
  {
    role: 'MERN Stack Intern',
    company: 'Tenbit Solutions',
    period: 'Jun 2026 – Aug 2026',
    current: false,
    summary:
      'Developed core features for a hospital billing management system, delivering production-grade full-stack features.',
    bullets: [
      'Implemented responsive React interfaces and built secure RESTful endpoints in Node.js & Express connected to MongoDB.',
      'Designed role-based access control, invoice generators, and transaction logging.',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'],
  },
  {
    role: 'Frontend Development Intern',
    company: 'BrainNet Telecommunications',
    period: 'Jun 2025 – Aug 2025',
    current: false,
    summary:
      'Built dynamic, cross-browser responsive landing pages and accelerated front-end delivery workflows.',
    bullets: [
      'Crafted pixel-perfect web layouts using semantic HTML5, modern CSS3, and JavaScript.',
      'Optimized asset delivery and improved page loading performance across diverse screen sizes.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Cross-Browser'],
  },
]

export const projects = [
  {
    title: 'Dengue Outbreak Predictor',
    category: 'Machine Learning',
    date: 'March 2026',
    featured: true,
    description:
      'A machine learning forecasting engine predicting weekly dengue cases across Pakistani metropolitan districts with historical epidemiology datasets.',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Forecasting', 'Data Viz'],
    githubUrl: 'https://github.com/MuhammadAhmed1089/Dengue-Outbreak-Predictor',
    liveUrl: null,
    visual: 'forecast',
    metrics: '94% accuracy on test validation',
  },
  {
    title: 'HireAtlas — Talent Portal',
    category: 'Full-Stack',
    date: 'January 2026',
    featured: true,
    description:
      'A full-stack recruitment platform connecting companies and technical applicants with real-time job tracking, applications, and status workflows.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    githubUrl: 'https://github.com/huzaifa596/HireAtlas',
    liveUrl: null,
    visual: 'hiring',
    metrics: 'Full-stack authentication & REST API',
  },
  {
    title: 'Pop Till Drop (8088)',
    category: 'Systems / Low-Level',
    date: 'November 2025',
    featured: false,
    description:
      'A real-time arcade balloon-popping game built in raw x86 Assembly language utilizing hardware interrupts, timer ticks, and video memory registers.',
    tags: ['8088 Assembly', 'Low-Level Systems', 'Hardware Interrupts'],
    githubUrl: 'https://github.com/huzaifa596/assembly_game',
    liveUrl: null,
    visual: 'game',
    metrics: 'Bare-metal interrupt gameplay',
  },
  {
    title: 'Tetris Arcade Engine',
    category: 'C++ / Game Dev',
    date: 'December 2024',
    featured: false,
    description:
      'A classic Tetris engine developed from scratch in pure C++ utilizing object-oriented principles, collision matrix calculation, and game loop architecture.',
    tags: ['C++', 'OOP', 'Game Engine', 'Data Structures'],
    githubUrl: null,
    liveUrl: null,
    visual: 'tetris',
    metrics: 'Pure C++ OOP Implementation',
  },
  {
    title: 'Interactive Web Showcase',
    category: 'Frontend',
    date: 'June 2026',
    featured: false,
    description:
      'A collection of dynamic, polished landing pages demonstrating clean responsive UI engineering, CSS grid architectures, and micro-interactions.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    githubUrl: null,
    liveUrl: 'https://landing-page-school.netlify.app',
    visual: 'web',
    metrics: 'Live on Netlify',
  },
]

export const certifications = [
  {
    title: 'Programming with JavaScript',
    issuer: 'Meta, via Coursera',
    date: 'Jul 2025',
    url: 'https://coursera.org/verify/0JFR9ABE3LMI',
  },
  {
    title: 'Developing Websites and Front-Ends with Bootstrap',
    issuer: 'IBM, via Coursera',
    date: 'Jul 2025',
    url: 'https://coursera.org/verify/2BFP7CRB5D4D',
  },
  {
    title: 'Human Research: Data & Specimens Research',
    issuer: 'CITI Program, MIT Affiliates',
    date: 'Jul 2026',
    url: null,
  },
  {
    title: 'CITI Conflicts of Interest',
    issuer: 'CITI Program, MIT Affiliates',
    date: 'Jul 2026',
    url: null,
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['C++', 'JavaScript (ES6+)', 'Python', 'x86 Assembly', 'SQL', 'HTML5 & CSS3'],
  },
  {
    title: 'Full-Stack & Frameworks',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Bootstrap'],
  },
  {
    title: 'Machine Learning & AI',
    skills: ['XGBoost', 'LightGBM', 'LSTM', 'Scikit-Learn', 'SHAP', 'Pandas & NumPy'],
  },
  {
    title: 'Core CS & Engineering',
    skills: ['Data Structures & Algorithms', 'OOP', 'Database Design', 'Git & GitHub', 'System Modeling'],
  },
]

export const education = [
  {
    school: 'FAST National University of Computer and Emerging Sciences, Lahore',
    qualification: 'Bachelor of Science in Computer Science (BSCS)',
    period: '2024 – 2028 (Expected)',
    detail: 'CGPA: 3.13 / 4.0 · 98th Percentile in NTS',
  },
  {
    school: 'Government College University (GCU), Lahore',
    qualification: 'Intermediate in Pre-Engineering',
    period: '2022 – 2024',
    detail: 'Marks: 1054 / 1200 (87.8%)',
  },
  {
    school: 'Unique High School, Wahdat Road, Lahore',
    qualification: 'Matriculation in Science',
    period: '2020 – 2022',
    detail: 'Marks: 1067 / 1100 (97.0%)',
  },
]
