import { Season, SeasonalTheme } from '@/types';

// Seasonal color palettes with HSL values for CSS variables
export const seasonalPalettes: Record<Season, SeasonalTheme> = {
  fall: {
    season: 'fall',
    colors: {
      primary: '19 100% 38%', // Burnt orange #C24E00 converted to HSL
      secondary: '40 100% 50%', // Amber #FFB000 converted to HSL
      accent: '98 17% 19%', // Deep moss #2E4026 converted to HSL
      tertiary: '314 15% 28%', // Plum #5B3758 converted to HSL
    },
    gradients: [
      'linear-gradient(135deg, hsl(19 100% 38%) 0%, hsl(40 100% 50%) 100%)',
      'linear-gradient(225deg, hsl(40 100% 50%) 0%, hsl(314 15% 28%) 100%)',
      'linear-gradient(315deg, hsl(98 17% 19%) 0%, hsl(19 100% 38%) 100%)',
    ],
    animations: {
      type: 'falling-leaves',
      intensity: 'medium',
    },
  },
  winter: {
    season: 'winter',
    colors: {
      primary: '210 100% 56%', // Ice blue
      secondary: '200 18% 86%', // Light gray-blue
      accent: '240 100% 95%', // Almost white
      tertiary: '220 15% 25%', // Dark blue-gray
    },
    gradients: [
      'linear-gradient(135deg, hsl(210 100% 56%) 0%, hsl(240 100% 95%) 100%)',
      'linear-gradient(225deg, hsl(200 18% 86%) 0%, hsl(220 15% 25%) 100%)',
    ],
  },
  spring: {
    season: 'spring',
    colors: {
      primary: '140 60% 45%', // Fresh green
      secondary: '80 70% 80%', // Light lime green
      accent: '300 40% 75%', // Soft pink
      tertiary: '60 90% 85%', // Pale yellow
    },
    gradients: [
      'linear-gradient(135deg, hsl(140 60% 45%) 0%, hsl(80 70% 80%) 100%)',
      'linear-gradient(225deg, hsl(300 40% 75%) 0%, hsl(60 90% 85%) 100%)',
    ],
  },
  summer: {
    season: 'summer',
    colors: {
      primary: '200 100% 50%', // Bright sky blue
      secondary: '45 100% 60%', // Sunny yellow
      accent: '25 100% 65%', // Coral orange
      tertiary: '180 50% 40%', // Teal
    },
    gradients: [
      'linear-gradient(135deg, hsl(200 100% 50%) 0%, hsl(45 100% 60%) 100%)',
      'linear-gradient(225deg, hsl(25 100% 65%) 0%, hsl(180 50% 40%) 100%)',
    ],
  },
};

// Base dark theme colors that work with all seasons
export const baseDarkTheme = {
  background: '222.2 84% 4.9%',
  foreground: '210 40% 98%',
  card: '222.2 84% 4.9%',
  'card-foreground': '210 40% 98%',
  popover: '222.2 84% 4.9%',
  'popover-foreground': '210 40% 98%',
  'primary-foreground': '210 40% 98%',
  'secondary-foreground': '210 40% 98%',
  muted: '217.2 32.6% 17.5%',
  'muted-foreground': '215 20.2% 65.1%',
  'accent-foreground': '210 40% 98%',
  destructive: '0 62.8% 30.6%',
  'destructive-foreground': '210 40% 98%',
  border: '217.2 32.6% 17.5%',
  input: '217.2 32.6% 17.5%',
  ring: '212.7 26.8% 83.9%',
  radius: '0.5rem',
};

// Function to get current season based on date
export function getCurrentSeason(): Season {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() returns 0-11, we want 1-12

  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

// Function to apply seasonal theme to CSS variables
export function applySeasonalTheme(season: Season) {
  if (typeof document === 'undefined') return; // SSR safety

  const palette = seasonalPalettes[season];
  const root = document.documentElement;

  // Apply seasonal colors
  root.style.setProperty('--seasonal-primary', palette.colors.primary);
  root.style.setProperty('--seasonal-secondary', palette.colors.secondary);
  root.style.setProperty('--seasonal-accent', palette.colors.accent);
  root.style.setProperty('--seasonal-tertiary', palette.colors.tertiary);

  // Apply base dark theme
  Object.entries(baseDarkTheme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Set primary and secondary to seasonal colors
  root.style.setProperty('--primary', palette.colors.primary);
  root.style.setProperty('--secondary', palette.colors.secondary);
  root.style.setProperty('--accent', palette.colors.accent);
}

// Function to get CSS for animations based on season
export function getSeasonalAnimationCSS(season: Season): string {
  const palette = seasonalPalettes[season];
  
  if (season === 'fall' && palette.animations) {
    return `
      .falling-leaf {
        position: absolute;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, hsl(${palette.colors.primary}), hsl(${palette.colors.secondary}));
        border-radius: 50% 0;
        animation: fallingLeaf 15s linear infinite;
        opacity: 0.6;
      }
      
      .falling-leaf:nth-child(2n) {
        animation-delay: -2s;
        animation-duration: 18s;
      }
      
      .falling-leaf:nth-child(3n) {
        animation-delay: -4s;
        animation-duration: 12s;
      }
      
      .falling-leaf:nth-child(4n) {
        animation-delay: -6s;
        animation-duration: 20s;
      }
    `;
  }
  
  return '';
}

export type { Season } from '@/types';