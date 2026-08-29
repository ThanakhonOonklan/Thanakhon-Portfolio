import { Skill } from '@/types';

const BASE = 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills';

export const skills: Skill[] = [
  // Frontend
  { name: 'HTML5',        category: 'Frontend',   iconUrl: `${BASE}/html5-colored.svg` },
  { name: 'CSS3',         category: 'Frontend',   iconUrl: `${BASE}/css3-colored.svg` },
  { name: 'JavaScript',   category: 'Frontend',   iconUrl: `${BASE}/javascript-colored.svg` },
  { name: 'TypeScript',   category: 'Frontend',   iconUrl: `${BASE}/typescript-colored.svg` },
  { name: 'React',        category: 'Frontend',   iconUrl: `${BASE}/react-colored.svg` },
  { name: 'Next.js',      category: 'Frontend',   iconUrl: `${BASE}/nextjs-colored-dark.svg` },
  { name: 'Tailwind CSS',  category: 'Frontend',    iconUrl: `${BASE}/tailwindcss-colored.svg` },
  { name: 'Material UI',   category: 'Frontend',    iconUrl: `${BASE}/materialui-colored.svg` },
  // Tools & Design
  { name: 'VS Code',       category: 'Tools',       iconUrl: `${BASE}/visualstudiocode-colored.svg` },
  { name: 'Figma',         category: 'Tools',       iconUrl: `${BASE}/figma-colored.svg` },

  // Backend & Database
  { name: 'Node.js',       category: 'Backend',     iconUrl: `${BASE}/nodejs-colored.svg` },
  { name: 'REST API',      category: 'Backend',     iconUrl: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/openapi.svg' },
  { name: 'PHP',           category: 'Backend',     iconUrl: `${BASE}/php-colored.svg` },
  { name: 'MySQL',         category: 'Backend',     iconUrl: `${BASE}/mysql-colored.svg` },

  // Other Technologies
  { name: 'Python',        category: 'Other',       iconUrl: `${BASE}/python-colored.svg` },
  { name: 'Java',          category: 'Other',       iconUrl: `${BASE}/java-colored.svg` },
  { name: 'Flutter',       category: 'Other',       iconUrl: `${BASE}/flutter-colored.svg` },
  { name: 'TensorFlow',    category: 'Other',       iconUrl: `${BASE}/tensorflow-colored.svg` },
  { name: 'Arduino',       category: 'Other',       iconUrl: `${BASE}/arduino-colored.svg` },
];
