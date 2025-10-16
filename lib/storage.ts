/**
 * Safe localStorage utilities that handle SSR and potential errors
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Safely get an item from localStorage
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The parsed value or default value
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  if (!isBrowser) {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns boolean indicating success
 */
export function setLocalStorageItem<T>(key: string, value: T): boolean {
  if (!isBrowser) {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The localStorage key to remove
 * @returns boolean indicating success
 */
export function removeLocalStorageItem(key: string): boolean {
  if (!isBrowser) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns boolean indicating if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (!isBrowser) {
    return false;
  }

  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, 'test');
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all keys from localStorage with a specific prefix
 * @param prefix - The prefix to filter by
 * @returns Array of matching keys
 */
export function getLocalStorageKeys(prefix?: string): string[] {
  if (!isBrowser) {
    return [];
  }

  try {
    const keys = Object.keys(window.localStorage);
    return prefix ? keys.filter(key => key.startsWith(prefix)) : keys;
  } catch (error) {
    console.warn('Error getting localStorage keys:', error);
    return [];
  }
}

/**
 * Clear all localStorage items with a specific prefix
 * @param prefix - The prefix to filter by
 * @returns boolean indicating success
 */
export function clearLocalStorageByPrefix(prefix: string): boolean {
  if (!isBrowser) {
    return false;
  }

  try {
    const keys = getLocalStorageKeys(prefix);
    keys.forEach(key => window.localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.warn(`Error clearing localStorage with prefix "${prefix}":`, error);
    return false;
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  USER_PROFILE: 'micro-motivator-user-profile',
  SESSIONS: 'micro-motivator-sessions',
  STREAKS: 'micro-motivator-streaks',
  BADGES: 'micro-motivator-badges',
  SETTINGS: 'micro-motivator-settings',
  SEASON_OVERRIDE: 'micro-motivator-season-override',
  FIRST_VISIT: 'micro-motivator-first-visit',
  ANALYTICS: 'micro-motivator-analytics',
  QUOTES: 'micro-motivator-quotes',
  FAVORITE_QUOTES: 'micro-motivator-favorite-quotes',
  QUOTE_PREFERENCES: 'micro-motivator-quote-preferences',
  DAILY_QUOTE: 'micro-motivator-daily-quote',
} as const;