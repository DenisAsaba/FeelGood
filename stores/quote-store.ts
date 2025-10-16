import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Quote, QuotePreferences } from '@/types';
import { 
  fetchRandomQuote, 
  fetchDailyQuote, 
  fetchMultipleQuotes,
  getFallbackQuotes,
  QuoteApiError 
} from '@/lib/api/zenquotes';

interface QuoteStore {
  // State
  currentQuote: Quote | null;
  dailyQuote: Quote | null;
  quotes: Quote[];
  favoriteQuotes: Quote[];
  isLoading: boolean;
  error: string | null;
  preferences: QuotePreferences;
  lastFetchTime: Date | null;

  // Actions
  fetchRandomQuote: () => Promise<void>;
  fetchDailyQuote: () => Promise<void>;
  fetchMultipleQuotes: (count?: number) => Promise<void>;
  addToFavorites: (quote: Quote) => void;
  removeFromFavorites: (quoteId: string) => void;
  toggleFavorite: (quote: Quote) => void;
  updatePreferences: (preferences: Partial<QuotePreferences>) => void;
  clearError: () => void;
  refreshQuotes: () => Promise<void>;
  markQuoteAsViewed: (quoteId: string) => void;
}

const defaultPreferences: QuotePreferences = {
  favoriteAuthors: [],
  dislikedAuthors: [],
  preferredCategories: ['random', 'daily'],
  maxCharacterCount: 200,
  showAuthorImages: true,
  autoRefreshInterval: 60, // 1 hour
  enableDailyQuote: true,
  quoteFontSize: 'medium',
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentQuote: null,
      dailyQuote: null,
      quotes: [],
      favoriteQuotes: [],
      isLoading: false,
      error: null,
      preferences: defaultPreferences,
      lastFetchTime: null,

      // Fetch a random quote
      fetchRandomQuote: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const quote = await fetchRandomQuote();
          set({ 
            currentQuote: quote, 
            isLoading: false,
            lastFetchTime: new Date()
          });
        } catch (error) {
          console.error('Failed to fetch random quote:', error);
          
          // Use fallback quotes if API fails
          const fallbackQuotes = getFallbackQuotes();
          const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
          
          set({ 
            currentQuote: randomFallback,
            isLoading: false,
            error: error instanceof QuoteApiError ? error.message : 'Failed to fetch quote. Using offline quote.'
          });
        }
      },

      // Fetch the daily quote
      fetchDailyQuote: async () => {
        const { preferences } = get();
        if (!preferences.enableDailyQuote) return;

        set({ isLoading: true, error: null });
        
        try {
          const quote = await fetchDailyQuote();
          set({ 
            dailyQuote: quote, 
            isLoading: false,
            lastFetchTime: new Date()
          });
        } catch (error) {
          console.error('Failed to fetch daily quote:', error);
          
          // Use fallback quote if API fails
          const fallbackQuotes = getFallbackQuotes();
          const dailyFallback = { ...fallbackQuotes[0], category: 'daily' as const };
          
          set({ 
            dailyQuote: dailyFallback,
            isLoading: false,
            error: error instanceof QuoteApiError ? error.message : 'Failed to fetch daily quote. Using offline quote.'
          });
        }
      },

      // Fetch multiple quotes
      fetchMultipleQuotes: async (count = 5) => {
        set({ isLoading: true, error: null });
        
        try {
          const newQuotes = await fetchMultipleQuotes(count);
          const { quotes } = get();
          
          // Merge new quotes with existing ones, avoiding duplicates
          const existingIds = new Set(quotes.map(q => q.id));
          const uniqueNewQuotes = newQuotes.filter(q => !existingIds.has(q.id));
          
          set({ 
            quotes: [...quotes, ...uniqueNewQuotes],
            isLoading: false,
            lastFetchTime: new Date()
          });
        } catch (error) {
          console.error('Failed to fetch multiple quotes:', error);
          
          // Use fallback quotes if API fails and no existing quotes
          const { quotes } = get();
          if (quotes.length === 0) {
            const fallbackQuotes = getFallbackQuotes();
            set({ 
              quotes: fallbackQuotes,
              isLoading: false,
              error: error instanceof QuoteApiError ? error.message : 'Failed to fetch quotes. Using offline quotes.'
            });
          } else {
            set({ 
              isLoading: false,
              error: error instanceof QuoteApiError ? error.message : 'Failed to fetch new quotes.'
            });
          }
        }
      },

      // Add quote to favorites
      addToFavorites: (quote) => {
        const { favoriteQuotes } = get();
        
        // Check if already in favorites
        if (!favoriteQuotes.find(fq => fq.id === quote.id)) {
          const favoriteQuote = { ...quote, isFavorite: true };
          set({ 
            favoriteQuotes: [...favoriteQuotes, favoriteQuote]
          });
        }
      },

      // Remove quote from favorites
      removeFromFavorites: (quoteId) => {
        const { favoriteQuotes } = get();
        set({ 
          favoriteQuotes: favoriteQuotes.filter(q => q.id !== quoteId)
        });
      },

      // Toggle favorite status
      toggleFavorite: (quote) => {
        const { favoriteQuotes } = get();
        const isFavorite = favoriteQuotes.find(fq => fq.id === quote.id);
        
        if (isFavorite) {
          get().removeFromFavorites(quote.id);
        } else {
          get().addToFavorites(quote);
        }
      },

      // Update user preferences
      updatePreferences: (newPreferences) => {
        const { preferences } = get();
        set({ 
          preferences: { ...preferences, ...newPreferences }
        });
      },

      // Clear error state
      clearError: () => {
        set({ error: null });
      },

      // Refresh all quotes
      refreshQuotes: async () => {
        const { preferences } = get();
        
        // Fetch both random and daily quotes
        await Promise.all([
          get().fetchRandomQuote(),
          preferences.enableDailyQuote ? get().fetchDailyQuote() : Promise.resolve(),
        ]);
      },

      // Mark quote as viewed (increment view count)
      markQuoteAsViewed: (quoteId) => {
        const { quotes } = get();
        const updatedQuotes = quotes.map(quote => {
          if (quote.id === quoteId) {
            return {
              ...quote,
              timesViewed: (quote.timesViewed || 0) + 1
            };
          }
          return quote;
        });
        
        set({ quotes: updatedQuotes });
      },
    }),
    {
      name: 'quote-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist certain fields
      partialize: (state) => ({
        favoriteQuotes: state.favoriteQuotes,
        preferences: state.preferences,
        dailyQuote: state.dailyQuote,
        quotes: state.quotes.slice(-10), // Only keep last 10 quotes
      }),
    }
  )
);