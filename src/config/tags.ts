// ===========================
// Tag Configuration
// ===========================

// Color categories using design system colors
export type TagColorCategory = 
  | 'accent'        // Primary brand/theme color
  | 'primary'       // Secondary brand color
  | 'danger'        // Error/warning states
  | 'primary-contrast'      // High contrast colors
  | 'accent-contrast'      // High contrast colors
  | 'neutral';      // Neutral/muted colors

// Tag color mapping - maps each tag to a color category
export const TAG_COLOR_MAPPING: Record<string, TagColorCategory> = {
  // Core Technology Areas
  'AI & ML': 'accent',
  'Languages': 'neutral', 
  'Frontend': 'accent-contrast',
  'Backend': 'accent-contrast',
  'DevOps': 'danger',
  'Database': 'accent',
  'Testing': 'primary',
  'Security': 'danger',
  'Architecture': 'accent-contrast',
  'Design': 'primary',
  'Observability': 'accent',
  'Platform Development': 'primary-contrast',

  // Language Specific
  'Python': 'neutral',
  'JavaScript': 'neutral',
  'TypeScript': 'neutral',
  'React': 'neutral',
  'Vue': 'neutral', 
  'Angular': 'neutral',
  '.NET': 'neutral',

  // Infrastructure & Cloud
  'Cloud Platforms': 'danger',
  'Infrastructure': 'danger',
  'Containers': 'danger',
  'CI/CD': 'danger',

  // Data & Storage
  'SQL': 'accent',
  'NoSQL': 'accent',
  'Caching': 'accent',
  'Messaging': 'accent',
  'Data Engineering': 'accent',

  // Security & Auth
  'Authentication': 'danger',

  // Development & Quality
  'Developer Tools': 'primary',
  'Quality Assurance': 'primary',
  'Performance': 'primary',
  'Protocols': 'accent',
  'APIs': 'accent',

  // Design & Creative
  'Creative Tools': 'primary',

  // Architecture & Practices
  'Best Practices': 'accent-contrast',
  'Distributed Systems': 'accent-contrast',
  'System Design': 'accent-contrast',
  'Code Quality': 'accent-contrast',
  'Enterprise': 'accent-contrast',
  'Design Patterns': 'accent-contrast',

  // Observability & Monitoring
  'Monitoring': 'accent',
  'Error Tracking': 'accent',
  'Incident Response': 'accent',

  // Business & Commerce
  'E-commerce': 'primary-contrast',
};

// Color style definitions
export const TAG_COLOR_STYLES: Record<TagColorCategory, { primary: string; secondary: string }> = {
  accent: {
    primary: 'bg-accent/20 text-med border-accent-contrast/30',
    secondary: 'bg-accent/15 text-med border-accent-contrast/20'
  },
  primary: {
    primary: 'bg-primary/20 text-med border-primary-contrast/30',
    secondary: 'bg-primary/15 text-med border-primary-contrast/20'
  },
  'primary-contrast': {
    primary: 'bg-primary-contrast/20 text-med border-primary/30',
    secondary: 'bg-primary-contrast/15 text-med border-primary/20'
  },
  'accent-contrast': {
    primary: 'bg-accent-contrast/20 text-med border-accent/30',
    secondary: 'bg-accent-contrast/15 text-med border-accent/20'
  },
  danger: {
    primary: 'bg-danger/20 text-med border-danger/30',
    secondary: 'bg-danger/15 text-med border-danger/20'
  },
  neutral: {
    primary: 'bg-text-low/20 text-med border-text-low/30',
    secondary: 'bg-text-low/15 text-med border-text-low/20'
  }
};

// Primary tags (get stronger colors)
export const PRIMARY_TAGS = new Set([
  'AI & ML',
  'Languages', 
  'Frontend',
  'Backend',
  'DevOps',
  'Database',
  'Testing',
  'Security',
  'Architecture',
  'Design',
  'Observability',
  'Platform Development'
]);

// Helper function to get tag color
export const getTagColor = (tag: string): string => {
  const category = TAG_COLOR_MAPPING[tag] || 'neutral';
  const isPrimary = PRIMARY_TAGS.has(tag);
  
  return TAG_COLOR_STYLES[category][isPrimary ? 'primary' : 'secondary'];
};

// Helper function to get all tags with their color categories
export const getTagsWithCategories = () => {
  return Object.entries(TAG_COLOR_MAPPING).map(([tag, category]) => ({
    tag,
    category,
    isPrimary: PRIMARY_TAGS.has(tag),
    color: getTagColor(tag)
  }));
};