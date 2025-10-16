// Core user and session types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'auto' | 'dark' | 'light';
    season?: 'spring' | 'summer' | 'fall' | 'winter';
    notifications: boolean;
    soundEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  type: 'meditation' | 'breathing' | 'motivation' | 'focus';
  duration: number; // in minutes
  completed: boolean;
  startTime: Date;
  endTime?: Date;
  notes?: string;
  rating?: number; // 1-5
}

// Gamification types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  requirements: {
    type: 'streak' | 'session_count' | 'total_time' | 'specific_action';
    target: number;
    timeframe?: 'day' | 'week' | 'month' | 'all_time';
  };
}

export interface Streak {
  id: string;
  userId: string;
  type: 'daily_session' | 'weekly_goal' | 'meditation' | 'breathing';
  currentCount: number;
  longestCount: number;
  lastActivity: Date;
  isActive: boolean;
}

// Weather and environmental types
export interface WeatherState {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';
  humidity: number;
  windSpeed: number;
  location: string;
  lastUpdated: Date;
}

// Breathing exercise types
export interface BreathPattern {
  id: string;
  name: string;
  description: string;
  phases: {
    name: 'inhale' | 'hold' | 'exhale' | 'pause';
    duration: number; // in seconds
    instruction: string;
  }[];
  totalDuration: number; // total cycle duration in seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
}

// Seasonal theming types
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonalTheme {
  season: Season;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    tertiary: string;
  };
  gradients: string[];
  animations?: {
    type: 'falling-leaves' | 'snow' | 'rain' | 'petals';
    intensity: 'light' | 'medium' | 'heavy';
  };
}

// Settings and preferences
export interface AppSettings {
  seasonOverride?: Season;
  autoDetectSeason: boolean;
  animationsEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Analytics and progress types
export interface ProgressStats {
  totalSessions: number;
  totalMinutes: number;
  longestStreak: number;
  currentStreak: number;
  averageSessionLength: number;
  weeklyGoalProgress: number;
  monthlyGoalProgress: number;
  favoriteSessionType: string;
  mostActiveTimeOfDay: string;
}