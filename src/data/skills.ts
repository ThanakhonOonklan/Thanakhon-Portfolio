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
  { name: 'Three.js',     category: 'Frontend',   iconUrl: `${SKILL_ICONS}threejs` },
  { name: 'Tailwind CSS',  category: 'Frontend',    iconUrl: `${SKILL_ICONS}tailwind` },
  { name: 'shadcn/ui',    category: 'Frontend',   iconUrl: '/images/logos/shadcn.svg' },

  // Backend & Database
  { name: 'Node.js',       category: 'Backend',     iconUrl: `${SKILL_ICONS}nodejs` },
  { name: 'FastAPI',       category: 'Backend',     iconUrl: `${SKILL_ICONS}fastapi` },
  { name: 'REST API',      category: 'Backend',     iconUrl: `${SKILL_ICONS}postman` },
  { name: 'PHP',           category: 'Backend',     iconUrl: `${SKILL_ICONS}php` },
  { name: 'MySQL',         category: 'Backend',     iconUrl: `${SKILL_ICONS}mysql` },
  { name: 'Supabase',      category: 'Backend',     iconUrl: `${SKILL_ICONS}supabase` },

  // DevOps & Cloud
  { name: 'Docker',        category: 'DevOps',      iconUrl: `${SKILL_ICONS}docker` },
  { name: 'Vercel',        category: 'DevOps',      iconUrl: `${SKILL_ICONS}vercel` },
  { name: 'Render',        category: 'DevOps',      iconUrl: '/images/logos/Render.png' },

  // Tools & Design
  { name: 'Git',           category: 'Tools',       iconUrl: `${SKILL_ICONS}git` },
  { name: 'GitHub',        category: 'Tools',       iconUrl: `${SKILL_ICONS}github` },
  { name: 'VS Code',       category: 'Tools',       iconUrl: `${SKILL_ICONS}vscode` },
  { name: 'Figma',         category: 'Tools',       iconUrl: `${SKILL_ICONS}figma` },
  { name: 'Canva',         category: 'Tools',       iconUrl: '/images/logos/canva.png' },
  { name: 'Notion',        category: 'Tools',       iconUrl: '/images/logos/notion.png' },
  { name: 'Trello',        category: 'Tools',       iconUrl: '/images/logos/trello.png' },
  { name: 'CapCut',        category: 'Tools',       iconUrl: '/images/logos/capcut.png' },

  // Other Technologies
  { name: 'Python',        category: 'Other',       iconUrl: `${SKILL_ICONS}py` },
  { name: 'Arduino',       category: 'Other',       iconUrl: `${SKILL_ICONS}arduino` },
];
