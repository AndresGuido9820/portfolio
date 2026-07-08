export const PERSONAL = {
  name: 'Andrés Felipe Guido Montoya',
  shortName: 'Andrés Guido',
  initials: 'AG',
  title: 'AI Implementations Lead · Software Engineer',
  location: 'Medellín, Colombia',
  email: 'aguido@unal.edu.co',
  phone: '+57 315 292 6155',
  github: 'https://github.com/AndresGuido9820',
  linkedin: 'https://linkedin.com/in/andres-felipe-guido-montoya-998261289',
  summary:
    'Systems and Computer Engineering student at Universidad Nacional de Colombia. AI Implementations Lead at Sento IOT — leading company-wide LLM integration, RAG systems, autonomous agents, and IoT data pipelines from design to production. Passionate builder at the intersection of AI, cloud infrastructure, and embedded systems.',
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  type: 'full-time' | 'part-time' | 'research'
  highlights: string[]
  tech: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Sento IOT',
    location: 'Medellín, Colombia',
    period: 'May 2025 — Present',
    type: 'full-time',
    highlights: [
      'Designed serverless microservices architecture integrating IoT data from Ubidots.',
      'Built an AWS pipeline (IoT Core, Lambda, S3, CloudFormation) receiving telemetry from thousands of IoT devices for computer-vision datasets.',
      'Implemented WhatsApp notification and device query services.',
      'Applied Infrastructure as Code with AWS CloudFormation and CI/CD workflows.',
    ],
    tech: ['AWS IoT Core', 'Lambda', 'CloudFormation', 'MQTT', 'Node.js', 'React', 'DynamoDB'],
  },
  {
    role: 'AI Implementations Lead',
    company: 'Sento IOT',
    location: 'Medellín, Colombia',
    period: 'Dec 2025 — Present',
    type: 'full-time',
    highlights: [
      'Led company-wide AI integration strategy with LLMs, RAG, and autonomous agents across all business units.',
      'Deployed end-to-end AI automation pipelines saving 10–20 hours of manual work per week — reports that took hours now ship in minutes.',
      'Built intelligent document processing systems for automated extraction and structured data generation.',
      'Defined AI roadmap with leadership, establishing governance standards for ethical production AI.',
    ],
    tech: ['Claude API', 'LangChain', 'RAG', 'Python', 'AWS Lambda', 'FastAPI'],
  },
  {
    role: 'Full Stack Developer',
    company: 'PiTransform',
    location: 'Medellín, Colombia',
    period: 'Oct 2023 — Feb 2025',
    type: 'full-time',
    highlights: [
      'Built an AI chat system using o3-mini with high-reasoning capabilities.',
      'Deployed advanced document processing model for multi-format file ingestion and analysis.',
      'Designed autonomous agent for automated report generation from structured data.',
    ],
    tech: ['OpenAI o3-mini', 'Azure App Function', 'Azure Web App', 'Python', 'FastAPI'],
  },
  {
    role: 'Teaching Assistant — Software Project Management',
    company: 'Universidad Nacional de Colombia',
    location: 'Medellín, Colombia',
    period: 'Aug 2024 — Feb 2025',
    type: 'part-time',
    highlights: [
      'Guided students in implementing Scrum and agile methodologies.',
      'Created educational materials and supervised project execution.',
      'Supported students in professional development with external companies.',
    ],
    tech: ['Scrum', 'Agile', 'PMBOK'],
  },
  {
    role: 'Research Assistant — Firmware & Data',
    company: 'Seismic Vibration Table Prototype',
    location: 'Medellín, Colombia',
    period: 'May 2023 — Apr 2024',
    type: 'research',
    highlights: [
      'Contributed to the prototype firmware for motion control and sensor handling.',
      'Built real-time data collection and analytics for experimental runs.',
      'Co-authored a scientific article detailing key findings and methodology.',
    ],
    tech: ['Python', 'Arduino', 'Firmware', 'Data Analytics', 'Serial Communication'],
  },
]

export interface Project {
  name: string
  description: { es: string; en: string }
  tech: string[]
  github?: string
  demo?: string
  kind: {
    es: string
    en: string
  }
  featured: boolean
  category: 'IoT' | 'AI' | 'Web' | 'Cloud' | 'Research'
  related?: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'IaC Board',
    description: {
      es: 'Diagramas de arquitectura AWS interactivos generados directamente desde archivos Terraform — sin ejecutar nada ni tocar la nube. Parser semántico de .tf, layout automático estilo Sugiyama, canvas SVG con pan/zoom/minimapa, export SVG/PNG e interfaz bilingüe.',
      en: 'Interactive AWS architecture diagrams generated straight from Terraform files — no execution, no cloud access. Semantic .tf parser, automatic Sugiyama-style layout, SVG canvas with pan/zoom/minimap, SVG/PNG export and a bilingual UI.'
    },
    tech: ['TypeScript', 'React', 'Terraform', 'SVG', 'Graph Layout'],
    github: 'https://github.com/AndresGuido9820/iac-board',
    kind: { es: 'Open source', en: 'Open source' },
    featured: true,
    category: 'Cloud',
    related: ['awscope'],
  },
  {
    name: 'awscope',
    description: {
      es: 'CLI interactiva para inspeccionar servicios de AWS desde terminal. Incluye arquitectura por adaptadores, TUI/CLI, modo read-only, documentación, CI y tests para EC2, S3, Lambda y CloudWatch Logs.',
      en: 'Interactive CLI to inspect AWS services from the terminal. Adapter-based architecture, TUI/CLI modes, read-only by default, docs, CI and tests for EC2, S3, Lambda and CloudWatch Logs.'
    },
    tech: ['Python', 'AWS', 'CLI', 'Boto3', 'Tests'],
    github: 'https://github.com/AndresGuido9820/awscope',
    kind: { es: 'Hobby / Open source', en: 'Hobby / Open source' },
    featured: false,
    category: 'Cloud',
    related: ['IaC Board'],
  },
  {
    name: 'VerdeListo',
    description: {
      es: 'Sistema full stack de gestión de productos con backend NestJS y frontend React. Incluye autenticación JWT, proveedores, favoritos, ratings, Swagger, logging, validación y UI responsive.',
      en: 'Full-stack product management system with a NestJS backend and React frontend. JWT auth, suppliers, favorites, ratings, Swagger, logging, validation and responsive UI.'
    },
    tech: ['NestJS', 'React', 'MongoDB', 'JWT', 'Swagger'],
    github: 'https://github.com/AndresGuido9820/VerdeListo',
    kind: { es: 'Hobby', en: 'Hobby' },
    featured: true,
    category: 'Web',
    related: ['awscope'],
  },
  {
    name: 'Sistema de Transporte Inteligente',
    description: {
      es: 'Sistema inteligente integrado de transporte: predicción de demanda, clasificación de conducción distractiva con visión por computador y recomendación de destinos. Modelos TensorFlow servidos en el navegador con TF.js y demo en vivo en GitHub Pages. Proyecto UNAL 2026.',
      en: 'Integrated intelligent transport system: demand forecasting, distracted-driving classification with computer vision, and destination recommendation. TensorFlow models served in-browser via TF.js, with a live demo on GitHub Pages. UNAL 2026 project.'
    },
    tech: ['Python', 'TensorFlow', 'TF.js', 'Computer Vision', 'Recommenders'],
    github: 'https://github.com/AndresGuido9820/sistema-transporte-inteligente',
    demo: 'https://andresguido9820.github.io/sistema-transporte-inteligente/',
    kind: { es: 'Académico', en: 'Academic' },
    featured: true,
    category: 'AI',
    related: ['Optimización Metaheurística'],
  },
  {
    name: 'Optimización Metaheurística',
    description: {
      es: 'Comparativa experimental de GD, EA, PSO y DE sobre seis funciones clásicas, y TSP de 96 prefecturas de Francia con ACO/GA minimizando costo económico real. Reporte publicado en GitHub Pages, notebooks reproducibles en Colab y CI de validación.',
      en: 'Experimental comparison of GD, EA, PSO and DE over six classic test functions, plus a TSP across the 96 prefectures of metropolitan France solved with ACO/GA minimizing a real economic cost. Published report on GitHub Pages, reproducible Colab notebooks and validation CI.'
    },
    tech: ['Python', 'Jupyter', 'DEAP', 'ACO/GA', 'GitHub Actions'],
    github: 'https://github.com/AndresGuido9820/optimizacion-metaheuristicas',
    demo: 'https://andresguido9820.github.io/optimizacion-metaheuristicas/',
    kind: { es: 'Académico / Público', en: 'Academic / Public' },
    featured: false,
    category: 'Research',
    related: ['Sistema de Transporte Inteligente'],
  },
]

export const SKILLS = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Scala', 'SQL'],
  frontend: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite'],
  backend: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'REST API', 'Microservices'],
  cloud: ['AWS Lambda', 'AWS IoT Core', 'CloudFormation', 'ECS Fargate', 'S3', 'DynamoDB', 'Azure'],
  ai_ml: ['LLMs', 'RAG Systems', 'LangChain', 'Claude API', 'OpenAI', 'TensorFlow', 'Scikit-learn', 'Computer Vision'],
  iot: ['MQTT', 'AWS IoT Core', 'Ubidots', 'Raspberry Pi', 'Arduino', 'ESP32'],
  devops: ['Docker', 'CI/CD', 'GitHub Actions', 'Git', 'Redis'],
}

export const EDUCATION = {
  degree: 'Systems and Computer Engineering',
  school: 'Universidad Nacional de Colombia',
  location: 'Medellín, Colombia',
  period: 'Oct 2021 — Jun 2026',
}
