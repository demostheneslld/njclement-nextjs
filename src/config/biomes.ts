// ===========================
// Biome Configuration
// ===========================

export interface BiomeConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  image: string;
  colors: {
    accent: string;
    accentContrast: string;
    danger: string;
    primary: string;
    primaryContrast: string;
    neutral: string;
    neutralSub: string;
    glassTop: string;
    glassBottom: string;
    glassBorder: string;
  };
}

export const BIOMES: BiomeConfig[] = [
  {
    id: 'namibia',
    name: 'Namibia',
    emoji: '🏜️',
    description: 'African desert with red dunes',
    image: '/biomes/namibia.png',
    colors: {
      accent: '#e8a447',           // dune gold - can blend with sand colors
      accentContrast: '#4a2c17',   // deep desert brown - HIGH CONTRAST for text over bright sand
      danger: '#d64545',           // red sand - errors, warnings
      primary: '#e8a447',          // decorative elements that harmonize with dunes
      primaryContrast: '#4a2c17',  // readable text over bright desert backgrounds
      neutral: '#1c1815',          // dark backgrounds
      neutralSub: '#292420',       // medium backgrounds
      glassTop: 'rgba(232, 164, 71, 0.12)',    // dune gold glass overlay
      glassBottom: 'rgba(74, 44, 23, 0.18)',   // deep brown glass overlay
      glassBorder: 'rgba(232, 164, 71, 0.25)', // dune gold glass border
    }
  },
  {
    id: 'giza',
    name: 'Giza',
    emoji: '🐪',
    description: 'Ancient Egyptian pyramids with Nile influences',
    image: '/biomes/giza.png',
    colors: {
      accent: '#d4a574',           // warm sandstone - can blend with pyramid colors
      accentContrast: '#2d5366',   // deep nile blue - HIGH CONTRAST for text over bright pyramids
      danger: '#c65d3a',           // sunset orange - errors, warnings
      primary: '#d4a574',          // decorative elements that harmonize with pyramids
      primaryContrast: '#2d5366',  // readable text over bright pyramid backgrounds
      neutral: '#1f1d1a',          // dark backgrounds
      neutralSub: '#2d2a26',       // medium backgrounds
      glassTop: 'rgba(212, 165, 116, 0.12)',   // warm sandstone glass overlay
      glassBottom: 'rgba(45, 83, 102, 0.18)',  // deep blue glass overlay
      glassBorder: 'rgba(212, 165, 116, 0.25)', // sandstone glass border
    }
  },
  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    emoji: '🏔️',
    description: 'Majestic mountain with glacial and savanna elements',
    image: '/biomes/kilimanjaro.png',
    colors: {
      accent: '#8fb4d4',           // glacier blue - can blend with mountain sky
      accentContrast: '#2f4d4f',   // deep forest green - HIGH CONTRAST for text over snowy peaks
      danger: '#d67352',           // african sunset - errors, warnings
      primary: '#8fb4d4',          // decorative elements that harmonize with mountain colors
      primaryContrast: '#2f484f',  // readable text over bright mountain backgrounds
      neutral: '#1a1d20',          // dark backgrounds
      neutralSub: '#252a2e',       // medium backgrounds
      glassTop: 'rgba(143, 180, 212, 0.12)',   // glacier blue glass overlay
      glassBottom: 'rgba(47, 79, 47, 0.18)',   // deep forest glass overlay
      glassBorder: 'rgba(143, 180, 212, 0.25)', // glacier blue glass border
    }
  },
  {
    id: 'malibu',
    name: 'Malibu',
    emoji: '🏖️',
    description: 'Coastal California beach vibes',
    image: '/biomes/malibu.png',
    colors: {
      accent: '#5fbcd3',           // ocean blue - can blend with water and sky
      accentContrast: '#af0202',   // rich brown - HIGH CONTRAST for text over bright beach/ocean
      danger: '#ff6b6b',           // sunset coral - errors, warnings
      primary: '#5fbcd3',          // decorative elements that harmonize with ocean colors
      primaryContrast: '#e22320',  // readable text over bright beach backgrounds
      neutral: '#1b2028',          // dark backgrounds
      neutralSub: '#262c36',       // medium backgrounds
      glassTop: 'rgba(95, 188, 211, 0.12)',    // ocean blue glass overlay
      glassBottom: 'rgba(139, 69, 19, 0.18)',  // rich brown glass overlay
      glassBorder: 'rgba(95, 188, 211, 0.25)', // ocean blue glass border
    }
  },
  {
    id: 'oahu',
    name: 'Oahu',
    emoji: '🌺',
    description: 'Tropical Hawaiian paradise',
    image: '/biomes/oahu.png',
    colors: {
      accent: '#4ecdc4',           // tropical turquoise - can blend with lagoon colors
      accentContrast: '#e85190',   // deep tropical green - HIGH CONTRAST for text over bright beaches
      danger: '#ff6b9d',           // hibiscus pink - errors, warnings
      primary: '#4ecdc4',          // decorative elements that harmonize with tropical colors
      primaryContrast: '#26cbf8',  // readable text over bright tropical backgrounds
      neutral: '#1a2124',          // dark backgrounds
      neutralSub: '#252d31',       // medium backgrounds
      glassTop: 'rgba(78, 205, 196, 0.12)',    // turquoise glass overlay
      glassBottom: 'rgba(26, 71, 42, 0.18)',   // deep green glass overlay
      glassBorder: 'rgba(78, 205, 196, 0.25)',  // turquoise glass border
    }
  },
  {
    id: 'verona',
    name: 'Verona',
    emoji: '🏞️',
    description: 'Italian Renaissance architecture',
    image: '/biomes/verona.png',
    colors: {
      accent: '#d4a373',           // italian terracotta - can blend with warm stone architecture
      accentContrast: '#2d1810',   // deep walnut brown - HIGH CONTRAST for text over warm stone
      danger: '#c65353',           // venetian red - errors, warnings
      primary: '#d4a373',          // decorative elements that harmonize with architecture
      primaryContrast: '#2d1810',  // readable text over warm architectural backgrounds
      neutral: '#1d1a18',          // dark backgrounds
      neutralSub: '#2a2622',       // medium backgrounds
      glassTop: 'rgba(212, 163, 115, 0.12)',   // terracotta glass overlay
      glassBottom: 'rgba(45, 24, 16, 0.18)',   // deep walnut glass overlay
      glassBorder: 'rgba(212, 163, 115, 0.25)', // terracotta glass border
    }
  },
  {
    id: 'washington-dc',
    name: 'Washington DC',
    emoji: '🏛️',
    description: 'Monument and federal architecture',
    image: '/biomes/washington-dc.png',
    colors: {
      accent: '#b8cddb',           // monument marble - can blend with white marble monuments
      accentContrast: '#1e3a5f',   // deep federal blue - HIGH CONTRAST for text over bright monuments
      danger: '#d65f5f',           // capitol red - errors, warnings
      primary: '#b8cddb',          // decorative elements that harmonize with monuments
      primaryContrast: '#1e3a5f',  // readable text over bright monument backgrounds
      neutral: '#1a1c1e',          // dark backgrounds
      neutralSub: '#252729',       // medium backgrounds
      glassTop: 'rgba(184, 205, 219, 0.12)',   // marble glass overlay
      glassBottom: 'rgba(30, 58, 95, 0.18)',   // deep federal blue glass overlay
      glassBorder: 'rgba(184, 205, 219, 0.25)', // marble glass border
    }
  },
  {
    id: 'yosemite',
    name: 'Yosemite',
    emoji: '🏞️',
    description: 'National park with granite and forests',
    image: '/biomes/yosemite.png',
    colors: {
      accent: '#7fb069',           // forest green - can blend with natural forest colors
      accentContrast: '#2c3e2d',   // deep forest shadow - HIGH CONTRAST for text over bright granite/sky
      danger: '#d67c5c',           // granite orange - errors, warnings
      primary: '#7fb069',          // decorative elements that harmonize with nature
      primaryContrast: '#2c3e2d',  // readable text over bright natural backgrounds
      neutral: '#1a1d1b',          // dark backgrounds
      neutralSub: '#252927',       // medium backgrounds
      glassTop: 'rgba(127, 176, 105, 0.12)',   // forest green glass overlay
      glassBottom: 'rgba(44, 62, 45, 0.18)',   // deep forest glass overlay
      glassBorder: 'rgba(127, 176, 105, 0.25)', // forest green glass border
    }
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    emoji: '🌴',
    description: 'Exotic island with spice markets',
    image: '/biomes/zanzibar.png',
    colors: {
      accent: '#4fc3c7',           // indian ocean - can blend with tropical ocean colors
      accentContrast: '#8b4513',   // rich spice brown - HIGH CONTRAST for text over bright tropical scenes
      danger: '#ef5350',           // coral red - errors, warnings
      primary: '#4fc3c7',          // decorative elements that harmonize with ocean
      primaryContrast: '#8b4513',  // readable text over bright tropical backgrounds
      neutral: '#1a2125',          // dark backgrounds
      neutralSub: '#252c31',       // medium backgrounds
      glassTop: 'rgba(79, 195, 199, 0.12)',    // ocean glass overlay
      glassBottom: 'rgba(139, 69, 19, 0.18)',  // rich spice glass overlay
      glassBorder: 'rgba(79, 195, 199, 0.25)',  // ocean glass border
    }
  },
];

// Export type for biome IDs
export type BiomeType = typeof BIOMES[number]['id'];

// Export default biome
export const DEFAULT_BIOME: BiomeType = 'kilimanjaro';

// Helper to get biome by ID
export const getBiomeById = (id: string): BiomeConfig | undefined => {
  return BIOMES.find(biome => biome.id === id);
};
