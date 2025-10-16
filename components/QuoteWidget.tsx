'use client';

import React, { useEffect, useState } from 'react';
import { QuoteCard } from '@/components/QuoteCard';
import { useQuoteStore } from '@/stores/quote-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface QuoteWidgetProps {
  autoRefresh?: boolean;
  showDaily?: boolean;
  className?: string;
}

export function QuoteWidget({ 
  autoRefresh = true, 
  showDaily = true,
  className 
}: QuoteWidgetProps) {
  const { 
    currentQuote, 
    dailyQuote, 
    isLoading, 
    error, 
    fetchRandomQuote, 
    fetchDailyQuote,
    refreshQuotes,
    clearError,
    preferences 
  } = useQuoteStore();

  const [autoRefreshTimer, setAutoRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  // Initial fetch on mount
  useEffect(() => {
    if (!currentQuote) {
      fetchRandomQuote();
    }
    if (showDaily && preferences.enableDailyQuote && !dailyQuote) {
      fetchDailyQuote();
    }
  }, [currentQuote, dailyQuote, showDaily, preferences.enableDailyQuote, fetchRandomQuote, fetchDailyQuote]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && preferences.autoRefreshInterval > 0) {
      const interval = preferences.autoRefreshInterval * 60 * 1000; // Convert minutes to milliseconds
      
      const timer = setInterval(() => {
        fetchRandomQuote();
      }, interval);
      
      setAutoRefreshTimer(timer);
      
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [autoRefresh, preferences.autoRefreshInterval, fetchRandomQuote]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
      }
    };
  }, [autoRefreshTimer]);

  const handleRetry = () => {
    clearError();
    refreshQuotes();
  };

  // Error state
  if (error && !currentQuote && !dailyQuote) {
    return (
      <Card className={`glass-card border-destructive/50 ${className}`}>
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Unable to fetch quotes</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button 
            onClick={handleRetry}
            disabled={isLoading}
            variant="outline"
            className="glass-button"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error banner */}
      {error && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearError}
                className="text-amber-600 hover:text-amber-700"
              >
                ✕
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Quote */}
      {showDaily && preferences.enableDailyQuote && (
        <QuoteCard 
          quote={dailyQuote}
          variant="daily"
          showRefresh={false}
          showActions={true}
        />
      )}

      {/* Current/Random Quote */}
      <QuoteCard 
        quote={currentQuote}
        variant="default"
        showRefresh={true}
        showActions={true}
      />

      {/* Auto-refresh indicator */}
      {autoRefresh && preferences.autoRefreshInterval > 0 && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Auto-refreshing every {preferences.autoRefreshInterval} minutes
          </p>
        </div>
      )}
    </div>
  );
}