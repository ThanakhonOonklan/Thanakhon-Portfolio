import { Skill } from '@/types';

const SKILL_ICONS = 'https://skillicons.dev/icons?i=';

export const skills: Skill[] = [
  // Frontend
  { name: 'HTML5',        category: 'Frontend',   iconUrl: `${SKILL_ICONS}html` },
  { name: 'CSS3',         category: 'Frontend',   iconUrl: `${SKILL_ICONS}css` },
  { name: 'JavaScript',   category: 'Frontend',   iconUrl: `${SKILL_ICONS}js` },
  { name: 'TypeScript',   category: 'Frontend',   iconUrl: `${SKILL_ICONS}ts` },
  { name: 'React',        category: 'Frontend',   iconUrl: `${SKILL_ICONS}react` },
  { name: 'Next.js',      category: 'Frontend',   iconUrl: `${SKILL_ICONS}nextjs` },
  { name: 'Tailwind CSS',  category: 'Frontend',    iconUrl: `${SKILL_ICONS}tailwind` },
  { name: 'Material UI',   category: 'Frontend',    iconUrl: `${SKILL_ICONS}materialui` },
  // Tools & Design
  { name: 'VS Code',       category: 'Tools',       iconUrl: `${SKILL_ICONS}vscode` },
  { name: 'Figma',         category: 'Tools',       iconUrl: `${SKILL_ICONS}figma` },

  // Backend & Database
  { name: 'Node.js',       category: 'Backend',     iconUrl: `${SKILL_ICONS}nodejs` },
  { name: 'REST API',      category: 'Backend',     iconUrl: `${SKILL_ICONS}postman` },
  { name: 'PHP',           category: 'Backend',     iconUrl: `${SKILL_ICONS}php` },
  { name: 'MySQL',         category: 'Backend',     iconUrl: `${SKILL_ICONS}mysql` },

  // Other Technologies
  { name: 'Python',        category: 'Other',       iconUrl: `${SKILL_ICONS}py` },
  { name: 'Java',          category: 'Other',       iconUrl: `${SKILL_ICONS}java` },
  { name: 'Flutter',       category: 'Other',       iconUrl: `${SKILL_ICONS}flutter` },
  { name: 'TensorFlow',    category: 'Other',       iconUrl: `${SKILL_ICONS}tensorflow` },
  { name: 'Arduino',       category: 'Other',       iconUrl: `${SKILL_ICONS}arduino` },
];

