// All site copy lives here.
export const contact = {
  email: import.meta.env.VITE_CONTACT_EMAIL || null, // set in .env
  whatsapp: 'https://wa.me/923411713517',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/huzaifa-naseer-231728234' },
    { label: 'GitHub', href: 'https://github.com/huzaifa596' },
    { label: 'WhatsApp', href: 'https://wa.me/923411713517?text=Hi%20Huzaifa%2C%20I%20saw%20your%20portfolio!' },
  ],
}

// Google Sheet web app URL, set in .env. See google-sheet/README.md.
export const formUrl = import.meta.env.VITE_CONTACT_FORM_URL || null

// Put the PDF in public/assets, then set this to '/assets/Huzaifa_Naseer_Resume.pdf'.
// The download button shows only when this is set.
export const resumeUrl = null

export const sanjhi = {
  title: 'Sanjhi AI',
  body: 'A savings-committee (kameti) platform for web and Android, built as a team of two. It turns an informal cash pool into a ledger people can check, with AI agents that set up committees and settle disputes.',
  points: [
    'Trust scores from 0 to 1000 for members and organizers',
    'An investigator and judge agent that rules on disputes',
    'A WhatsApp bot that understands Urdu voice notes',
    'Core views that keep working offline',
  ],
  stack: ['React', 'Capacitor', 'Node.js', 'Express', 'PostgreSQL', 'Groq'],
  live: 'https://sanjhiai.netlify.app',
  code: 'https://github.com/huzaifa596/SanjhiAI',
}

export const sites = [
  { name: 'KidKinder', kind: 'School landing page', host: 'landing-page-school.netlify.app', shot: 'kidkinder' },
  { name: 'Auburn', kind: 'Restaurant landing page', host: 'huzaifa-template-02.netlify.app', shot: 'auburn' },
  { name: 'Lumière', kind: 'Architecture landing page', host: 'huzaifa-template-03.netlify.app', shot: 'lumiere' },
  { name: 'Softy Pink', kind: 'Business landing page', host: 'softy-pink.netlify.app', shot: 'softy-pink' },
]

export const feature = {
  title: 'HireAtlas',
  body: 'A job platform for applicants and hiring teams. Candidates build profiles and apply with a CV. Teams filter, review and move applications through a status workflow.',
  stack: ['React', 'Node.js', 'PostgreSQL', 'REST', 'JWT'],
  href: 'https://github.com/huzaifa596/HireAtlas',
  layers: [
    ['React and Vite client', 'listings, profiles, CV applications'],
    ['Node API', 'REST routes, JWT sign-in'],
    ['PostgreSQL schema', 'relations, constraints, indexes'],
    ['Status trigger', 'application workflow in the database'],
  ],
}

export const research = {
  intro:
    'A network sees a problem after users feel it. I study models that read traffic as it moves, flag the link that is about to fail and say why, so the route can change first.',
  questions: [
    ['Can a model see congestion before packets drop?', 'Sequence models on link load and delay.'],
    ['Can it tell an attack from a busy hour?', 'Anomaly detection on flow records.'],
    ['Can an operator trust the reason it gives?', 'Feature attribution on every decision.'],
  ],
  methods: 'XGBoost, LightGBM, LSTM, scikit-learn, SHAP, pandas and NumPy.',
  publications: 'First paper will be listed here.',
}

export const experience = [
  {
    tone: 'mint',
    strand: 'Research',
    period: 'Jul 2026 to present',
    role: 'Research Intern',
    org: 'FAST-NUCES',
    body: 'Building ensemble models with XGBoost, LightGBM and LSTM, and using SHAP to show why each prediction was made.',
  },
  {
    tone: 'orange',
    strand: 'Full stack',
    period: 'Jun to Aug 2026',
    role: 'MERN Stack Intern',
    org: 'Tenbit Solutions',
    body: 'Core features for a billing platform: React interfaces, REST endpoints, role-based access and invoices.',
  },
  {
    tone: 'orange',
    strand: 'Full stack',
    period: 'Jun to Aug 2025',
    role: 'Frontend Intern',
    org: 'BrainNet Telecommunications',
    body: 'Responsive, cross-browser pages in HTML, CSS and JavaScript, with faster asset delivery.',
  },
  {
    tone: 'spruce',
    strand: 'Education',
    period: '2024 to 2028',
    role: 'BS Computer Science',
    org: 'FAST-NUCES Lahore',
    body: 'Expected graduation 2028. 98th percentile in NTS.',
  },
]

// Put the certificate in public/assets and set certificate to its path, for example
// '/assets/hackathon-certificate.pdf'. A button appears once it is set.
export const award = { title: 'Alibaba x BanoQabil AI Hackathon finalist', detail: null, certificate: null }

export const certificates = [
  { title: 'Programming with JavaScript', issuer: 'Meta, via Coursera', date: 'Jul 2025', href: 'https://coursera.org/verify/0JFR9ABE3LMI' },
  { title: 'Developing Websites and Front-Ends with Bootstrap', issuer: 'IBM, via Coursera', date: 'Jul 2025', href: 'https://coursera.org/verify/2BFP7CRB5D4D' },
  { title: 'Human Research: Data or Specimens Only', issuer: 'CITI Program, MIT Affiliates', date: 'Jul 2026', href: 'https://www.citiprogram.org/verify/?wf95de3ed-828f-4708-9699-ca4dd9ed37bb-78272352' },
  { title: 'Conflicts of Interest', issuer: 'CITI Program, MIT Affiliates', date: 'Jul 2026', href: 'https://www.citiprogram.org/verify/?wf77d45ad-6ccd-4144-9a9f-195b5b62985f-78272353' },
]
