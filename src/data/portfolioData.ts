import type { PersonalInfo, SkillCategory, Project, Certificate, TimelineItem } from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Jaime Vega",
  role: "Data Scientist & AI Engineer",
  location: "México",
  availability: "Disponible para proyectos",
  tagline: "Desarrollo modelos predictivos, pipelines de datos y arquitecturas escalables de Inteligencia Artificial aplicada.",
  bioParagraphs: [
    "Hola, soy Jaime Fabián Cortés Vega, apasionado por la ciencia de datos y el machine learning. Siempre estoy en constante aprendizaje para adquirir nuevas habilidades y resolver problemas complejos mediante mis conocimientos. Por ello, disfruto participar en hackatones y colaborar en proyectos desafiantes."],
  email: "cortesvegajaimefabian@gmail.com",
  github: "https://github.com/JaimeVGA",
  linkedin: "https://www.linkedin.com/in/jaimevga",
  cvUrl: "/cv.pdf",
  portrait: {
    base: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  metrics: [
    { label: "Años Exp.", value: "3+" },
    { label: "Proyectos", value: "15+" },
    { label: "Hackatones", value: "4" },
    { label: "Certificados", value: "12" }
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-data",
    title: "Ciencia de Datos & Machine Learning",
    description: "Análisis estadístico, modelado predictivo, visualización y pipelines de IA.",
    skills: [
      { name: "Python", level: 95 },
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 90 },
      { name: "R", level: 82 },
      { name: "Power BI", level: 85 }
    ]
  },
  {
    id: "databases-cloud",
    title: "Bases de Datos & Cloud",
    description: "Persistencia relacional, NoSQL y computación en la nube para arquitecturas de datos.",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 84 },
      { name: "AWS", level: 80 }
    ]
  },
  {
    id: "web-dev",
    title: "Desarrollo Web & Frontend",
    description: "Tecnologías y lenguajes para la construcción de interfaces interactivas.",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 88 }
    ]
  },
  {
    id: "systems-lowlevel",
    title: "Sistemas, Herramientas & Bajo Nivel",
    description: "Entornos operativos, control de versiones y arquitectura de computadoras.",
    skills: [
      { name: "Linux", level: 88 },
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Ensamblador x86", level: 78 }
    ]
  },
  {
    id: "languages",
    title: "Idiomas & Comunicación",
    description: "Habilidades lingüísticas para colaboración internacional y documentación técnica.",
    skills: [
      { name: "Inglés B1", level: 75 }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "jardine-data",
    title: "La Historia de un Entrenador a través de los Datos",
    summary: "Hackatón ITAM — Análisis táctico y comparativa de evolución entre Atlético de San Luis y América con métricas avanzadas.",
    fullDescription: "Proyecto de análisis táctico de equipos dirigidos por André Jardine. Procesa datos de partidos para comparar su evolución entre Atlético de San Luis y América, utilizando métricas como posesión territorial, presión, recuperaciones, progresión de pases, transiciones, formaciones y cambios durante el partido.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    tags: ["Hackatón ITAM", "Python", "Data Science", "Sports Analytics", "Vercel"],
    featured: true,
    liveUrl: "https://jardine-hackathon-isac-2026.vercel.app/",
    githubUrl: "https://github.com/JaimeVGA/hackaton",
    stats: "★ Hackatón ITAM · Proyecto Destacado"
  },
  {
    id: "vialia-ai",
    title: "Vialia — Asistente Jurídico de Movilidad",
    summary: "Hackatón MLH Hacktoberfest (3er Lugar) — Asistente de código abierto con GraphRAG, Whisper, modelos Groq y bot de Telegram.",
    fullDescription: "VIALIA es un asistente jurídico de código abierto y libre acceso orientado a brindar información clara a la ciudadanía sobre tránsito, vialidad, multas, grúas y movilidad en el Municipio de Oaxaca de Juárez y el Estado de Oaxaca. El sistema integra técnicas de GraphRAG (recuperación aumentada mediante grafos de conocimiento legal), búsqueda léxico-difusa optimizada para jerga popular mexicana, modelos abiertos de lenguaje (openai/gpt-oss-120b en Groq), transcripción de notas de voz con Whisper y un Bot interactivo de Telegram.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    tags: ["Hackatón MLH (3er Lugar)", "GraphRAG", "Groq / LLMs", "Whisper", "Telegram Bot", "Open Source"],
    featured: true,
    githubUrl: "https://github.com/JaimeVGA/Hacktoberfest",
    stats: "🥉 3er Lugar · Hackatón MLH Hacktoberfest"
  }
];

export const certificates: Certificate[] = [
  {
    id: "vialia-mlh",
    title: "VIALIA — Asistente Jurídico de Movilidad (3er Lugar)",
    issuer: "Hackatón MLH Hacktoberfest",
    year: "2026",
    tag: "3er Lugar 🥉",
    link: "https://oaxacoders.org/eventos/hacktoberfest-hack-day-oaxaca-2026/"
  },
  {
    id: "jardine-itam",
    title: "La Historia de un Entrenador a través de los Datos",
    issuer: "Hackatón ITAM (ISAC)",
    year: "2026",
    tag: "Hackatón ITAM",
    link: "https://jardine-hackathon-isac-2026.vercel.app/"
  }
];

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    title: "Ingeniería en Computación",
    organization: "Universidad Tecnológica de la Mixteca",
    period: "2024 — 2029",
    badge: "Grado"
  }
];
