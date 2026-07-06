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
    name: 'Pipeline de Datos IoT en AWS',
    description: {
      es: 'Pipeline serverless de punta a punta (IoT Core, Lambda, S3, CloudFormation) que recibe telemetría de miles de dispositivos IoT en campo, validando y almacenando mediciones e imágenes sincronizadas para construir un dataset listo para entrenar modelos de visión por computador.',
      en: 'End-to-end serverless pipeline (IoT Core, Lambda, S3, CloudFormation) receiving telemetry from thousands of IoT devices in the field, validating and storing synchronized measurements and images to build a dataset ready to train computer-vision models.'
    },
    tech: ['AWS IoT Core', 'Lambda', 'S3', 'CloudFormation', 'MQTT'],
    kind: { es: 'Profesional · Sento', en: 'Professional · Sento' },
    featured: true,
    category: 'IoT',
    related: ['Automatización con IA', 'Notificaciones IoT por WhatsApp'],
  },
  {
    name: 'Automatización con IA',
    description: {
      es: 'Sistemas con LLMs, RAG y agentes autónomos que ahorran entre 10 y 20 horas de trabajo manual a la semana en compras, reportes y soporte — reportes que tomaban horas ahora salen en minutos. Procesamiento inteligente de documentos y herramientas internas conectadas con APIs externas en pipelines unificados.',
      en: 'Systems with LLMs, RAG and autonomous agents saving 10–20 hours of manual work per week across procurement, reporting and support — reports that took hours now ship in minutes. Intelligent document processing and internal tools wired to external APIs in unified pipelines.'
    },
    tech: ['LLMs', 'RAG', 'Agentes', 'Python', 'FastAPI'],
    kind: { es: 'Profesional · Sento', en: 'Professional · Sento' },
    featured: true,
    category: 'AI',
    related: ['Pipeline de Datos IoT en AWS'],
  },
  {
    name: 'Notificaciones IoT por WhatsApp',
    description: {
      es: 'Servicio de notificaciones y consultas de dispositivos IoT vía WhatsApp, con landing personalizada de acceso por QR para visualizar en vivo la data de los equipos transmisores. Menos fricción para el usuario final en campo.',
      en: 'Notification and query service for IoT devices over WhatsApp, with a personalized QR-access landing page to view live device data. Less friction for the end user in the field.'
    },
    tech: ['Node.js', 'AWS Lambda', 'WhatsApp API', 'QR', 'Serverless'],
    kind: { es: 'Profesional · Sento', en: 'Professional · Sento' },
    featured: true,
    category: 'IoT',
    related: ['Pipeline de Datos IoT en AWS'],
  },
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
    name: 'react-pitch-lines',
    description: {
      es: 'Una cancha de fútbol que se dibuja sola, línea por línea — componente React SVG de cero dependencias (Web Animations API), proporcional a una cancha real de 105×68 m y con respeto de prefers-reduced-motion. Extraído de este portafolio y abierto a la comunidad.',
      en: 'A football pitch that draws itself, line by line — zero-dependency React SVG component (Web Animations API), proportional to a real 105×68 m pitch, honoring prefers-reduced-motion. Extracted from this portfolio and open-sourced.'
    },
    tech: ['React', 'TypeScript', 'SVG', 'Web Animations API'],
    github: 'https://github.com/AndresGuido9820/react-pitch-lines',
    kind: { es: 'Open source', en: 'Open source' },
    featured: false,
    category: 'Web',
    related: ['IaC Board'],
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
    related: ['git-health'],
  },
  {
    name: 'git-health',
    description: {
      es: 'CLI para auditar la salud open source de repositorios Git. Revisa README, licencia, CI, tests, templates, seguridad, changelog y genera reportes accionables con score.',
      en: 'CLI that audits the open-source health of Git repositories. Checks README, license, CI, tests, templates, security and changelog, producing an actionable report with a score.'
    },
    tech: ['Python', 'Typer', 'Rich', 'Git', 'CI'],
    github: 'https://github.com/AndresGuido9820/git-health',
    kind: { es: 'Hobby / Open source', en: 'Hobby / Open source' },
    featured: false,
    category: 'Research',
    related: ['awscope'],
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
    related: ['Shop-ecomerce'],
  },
  {
    name: 'Shop-ecomerce',
    description: {
      es: 'Tienda web con Next.js, catálogo, detalle de productos, filtros avanzados, precios especiales por cliente, MongoDB, React Query, validación con Zod y componentes shadcn/ui.',
      en: 'Web store built with Next.js: catalog, product detail, advanced filters, per-customer special pricing, MongoDB, React Query, Zod validation and shadcn/ui components.'
    },
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Zod', 'shadcn/ui'],
    github: 'https://github.com/AndresGuido9820/Shop-ecomerce',
    kind: { es: 'Hobby', en: 'Hobby' },
    featured: false,
    category: 'Web',
    related: ['VerdeListo'],
  },
  {
    name: 'Microservicios SIA',
    description: {
      es: 'Sistema distribuido para gestión de estudiantes, cursos e inscripciones. Usa API Gateway, tres microservicios, PostgreSQL, pgAdmin y Docker Compose para levantar el entorno completo.',
      en: 'Distributed system for managing students, courses and enrollment. API Gateway, three microservices, PostgreSQL, pgAdmin and Docker Compose for the full environment.'
    },
    tech: ['NestJS', 'Docker', 'PostgreSQL', 'Prisma', 'API Gateway'],
    github: 'https://github.com/AndresGuido9820/Microservicios-sia',
    kind: { es: 'Académico / Público', en: 'Academic / Public' },
    featured: false,
    category: 'Cloud',
    related: ['VerdeListo'],
  },
  {
    name: 'Optimización Metaheurística',
    description: {
      es: 'Comparativa experimental de GD, EA, PSO y DE sobre seis funciones clásicas, y TSP de 96 prefecturas de Francia con ACO/GA minimizando costo económico real. Reporte publicado en GitHub Pages, notebooks reproducibles en Colab y CI de validación.',
      en: 'Experimental comparison of GD, EA, PSO and DE over six classic test functions, plus a TSP across the 96 prefectures of metropolitan France solved with ACO/GA minimizing a real economic cost. Published report on GitHub Pages, reproducible Colab notebooks and validation CI.'
    },
    tech: ['Python', 'Jupyter', 'DEAP', 'ACO/GA', 'GitHub Actions'],
    github: 'https://github.com/AndresGuido9820/optimizacion-metaheuristicas',
    kind: { es: 'Académico / Público', en: 'Academic / Public' },
    featured: false,
    category: 'Research',
    related: [],
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
