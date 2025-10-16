/**
 * ZenQuotes.io API Service
 * Free motivational quotes API integration
 */

// Base API configuration
const ZENQUOTES_BASE_URL = 'https://zenquotes.io/api';

// API endpoints
export const ZENQUOTES_ENDPOINTS = {
  // Get a random quote
  random: `${ZENQUOTES_BASE_URL}/random`,
  // Get quotes by author (limit 50 per day)
  author: (author: string) => `${ZENQUOTES_BASE_URL}/author/${encodeURIComponent(author)}`,
  // Get quote of the day
  today: `${ZENQUOTES_BASE_URL}/today`,
  // Get multiple random quotes (max 50)
  quotes: (count: number = 5) => `${ZENQUOTES_BASE_URL}/quotes/${Math.min(count, 50)}`,
} as const;

// Quote interface matching ZenQuotes API response
export interface ZenQuote {
  q: string; // Quote text
  a: string; // Author name
  i: string; // Author image (may be empty)
  c: string; // Character count
  h: string; // HTML quote (with <blockquote> tags)
}

// Processed quote interface for our app
export interface Quote {
  id: string;
  text: string;
  author: string;
  authorImage?: string;
  characterCount: number;
  htmlContent: string;
  fetchedAt: Date;
  category?: 'random' | 'daily' | 'seasonal';
}

// API Error class
export class QuoteApiError extends Error {
  public readonly endpoint: string;
  public readonly status?: number;

  constructor({ message, endpoint, status }: { message: string; endpoint: string; status?: number }) {
    super(message);
    this.name = 'QuoteApiError';
    this.endpoint = endpoint;
    this.status = status;
  }
}

/**
 * Fetch a random motivational quote
 */
export async function fetchRandomQuote(): Promise<Quote> {
  try {
    const response = await fetch(ZENQUOTES_ENDPOINTS.random, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add cache control for better performance
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZenQuote[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No quote data received from API');
    }

    const zenQuote = data[0];
    return transformZenQuote(zenQuote, 'random');
  } catch (error) {
    console.error('Error fetching random quote:', error);
    throw new QuoteApiError({
      message: error instanceof Error ? error.message : 'Failed to fetch random quote',
      endpoint: ZENQUOTES_ENDPOINTS.random,
    });
  }
}

/**
 * Fetch the quote of the day
 */
export async function fetchDailyQuote(): Promise<Quote> {
  try {
    const response = await fetch(ZENQUOTES_ENDPOINTS.today, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Cache daily quote for better performance
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZenQuote[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No daily quote data received from API');
    }

    const zenQuote = data[0];
    return transformZenQuote(zenQuote, 'daily');
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    throw new QuoteApiError({
      message: error instanceof Error ? error.message : 'Failed to fetch daily quote',
      endpoint: ZENQUOTES_ENDPOINTS.today,
    });
  }
}

/**
 * Fetch multiple random quotes
 */
export async function fetchMultipleQuotes(count: number = 5): Promise<Quote[]> {
  try {
    const safeCount = Math.min(Math.max(count, 1), 50); // Ensure count is between 1 and 50
    const response = await fetch(ZENQUOTES_ENDPOINTS.quotes(safeCount), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZenQuote[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No quotes data received from API');
    }

    return data.map(zenQuote => transformZenQuote(zenQuote, 'random'));
  } catch (error) {
    console.error('Error fetching multiple quotes:', error);
    throw new QuoteApiError({
      message: error instanceof Error ? error.message : 'Failed to fetch quotes',
      endpoint: ZENQUOTES_ENDPOINTS.quotes(count),
    });
  }
}

/**
 * Fetch quotes by a specific author
 */
export async function fetchQuotesByAuthor(author: string): Promise<Quote[]> {
  try {
    if (!author.trim()) {
      throw new Error('Author name is required');
    }

    const response = await fetch(ZENQUOTES_ENDPOINTS.author(author), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZenQuote[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error(`No quotes found for author: ${author}`);
    }

    return data.map(zenQuote => transformZenQuote(zenQuote, 'random'));
  } catch (error) {
    console.error(`Error fetching quotes by author ${author}:`, error);
    throw new QuoteApiError({
      message: error instanceof Error ? error.message : `Failed to fetch quotes by ${author}`,
      endpoint: ZENQUOTES_ENDPOINTS.author(author),
    });
  }
}

/**
 * Transform ZenQuote API response to our Quote interface
 */
function transformZenQuote(zenQuote: ZenQuote, category: Quote['category'] = 'random'): Quote {
  return {
    id: generateQuoteId(zenQuote),
    text: zenQuote.q || 'No quote text available',
    author: zenQuote.a || 'Unknown Author',
    authorImage: zenQuote.i || undefined,
    characterCount: parseInt(zenQuote.c) || zenQuote.q?.length || 0,
    htmlContent: zenQuote.h || `<blockquote>${zenQuote.q}</blockquote>`,
    fetchedAt: new Date(),
    category,
  };
}

/**
 * Generate a unique ID for a quote based on content and author
 */
function generateQuoteId(zenQuote: ZenQuote): string {
  const content = `${zenQuote.q}-${zenQuote.a}`;
  // Simple hash function for generating consistent IDs
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `quote-${Math.abs(hash)}`;
}

/**
 * Check if we're hitting rate limits and provide fallback quotes
 */
export function getFallbackQuotes(): Quote[] {
  const fallbackQuotes: Omit<Quote, 'fetchedAt'>[] = [
    {
      id: 'fallback-1',
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      characterCount: 49,
      htmlContent: '<blockquote>The only way to do great work is to love what you do.</blockquote>',
      category: 'random',
    },
    {
      id: 'fallback-2',
      text: 'Life is what happens to you while you\'re busy making other plans.',
      author: 'John Lennon',
      characterCount: 64,
      htmlContent: '<blockquote>Life is what happens to you while you\'re busy making other plans.</blockquote>',
      category: 'random',
    },
    {
      id: 'fallback-3',
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
      characterCount: 71,
      htmlContent: '<blockquote>The future belongs to those who believe in the beauty of their dreams.</blockquote>',
      category: 'random',
    },
  ];

  return fallbackQuotes.map(quote => ({
    ...quote,
    fetchedAt: new Date(),
  }));
}