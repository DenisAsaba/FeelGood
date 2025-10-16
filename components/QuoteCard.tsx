'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, RefreshCw, Copy, Share2, Clock, User } from 'lucide-react';
import { useQuoteStore } from '@/stores/quote-store';
import { useSeason } from '@/providers/SeasonProvider';
import type { Quote } from '@/types';
import { cn } from '@/lib/utils';

interface QuoteCardProps {
  quote: Quote | null;
  showActions?: boolean;
  showAuthor?: boolean;
  showRefresh?: boolean;
  className?: string;
  variant?: 'default' | 'daily' | 'compact';
}

export function QuoteCard({ 
  quote, 
  showActions = true, 
  showAuthor = true, 
  showRefresh = false,
  className,
  variant = 'default'
}: QuoteCardProps) {
  const { currentSeason } = useSeason();
  const { 
    favoriteQuotes, 
    toggleFavorite, 
    fetchRandomQuote, 
    markQuoteAsViewed,
    preferences,
    isLoading 
  } = useQuoteStore();
  
  const [copied, setCopied] = useState(false);
  
  const isFavorite = quote ? favoriteQuotes.some(fq => fq.id === quote.id) : false;

  // Mark quote as viewed when it changes
  useEffect(() => {
    if (quote) {
      markQuoteAsViewed(quote.id);
    }
  }, [quote?.id, markQuoteAsViewed]);

  const handleCopy = async () => {
    if (!quote) return;
    
    const textToCopy = `"${quote.text}" - ${quote.author}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy quote:', error);
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    
    const shareData = {
      title: 'Motivational Quote',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await handleCopy();
      }
    } catch (error) {
      console.error('Failed to share quote:', error);
    }
  };

  const handleRefresh = () => {
    fetchRandomQuote();
  };

  const handleToggleFavorite = () => {
    if (quote) {
      toggleFavorite(quote);
    }
  };

  if (!quote) {
    return (
      <Card className={cn('glass-card animate-pulse', className)}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-1/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCompact = variant === 'compact';
  const isDaily = variant === 'daily';

  return (
    <Card className={cn(
      'glass-card transition-all duration-300 hover:shadow-lg hover:shadow-seasonal-primary/10',
      isCompact && 'p-4',
      className
    )}>
      {!isCompact && (
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              {isDaily && <Clock className="w-4 h-4 text-seasonal-primary" />}
              <span className="capitalize">
                {isDaily ? 'Quote of the Day' : 'Inspiration'}
              </span>
            </div>
            {showRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="glass-button"
              >
                <RefreshCw className={cn(
                  'w-4 h-4',
                  isLoading && 'animate-spin'
                )} />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={cn('space-y-4', isCompact ? 'p-0' : 'pt-0')}>
        {/* Quote Text */}
        <blockquote className={cn(
          'text-foreground leading-relaxed',
          preferences.quoteFontSize === 'small' && 'text-sm',
          preferences.quoteFontSize === 'medium' && 'text-base',
          preferences.quoteFontSize === 'large' && 'text-lg',
          isCompact && 'text-sm'
        )}>
          <span className="text-seasonal-primary text-2xl leading-none">"</span>
          {quote.text}
          <span className="text-seasonal-primary text-2xl leading-none">"</span>
        </blockquote>

        {/* Author */}
        {showAuthor && (
          <div className="flex items-center gap-3">
            {quote.authorImage && preferences.showAuthorImages ? (
              <img 
                src={quote.authorImage} 
                alt={quote.author}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-seasonal-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-seasonal-primary" />
              </div>
            )}
            <div>
              <cite className="text-sm font-medium text-seasonal-accent not-italic">
                {quote.author}
              </cite>
              {quote.category && (
                <div className="text-xs text-muted-foreground capitalize">
                  {quote.category} quote
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quote Stats */}
        {!isCompact && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{quote.characterCount} characters</span>
            {quote.timesViewed && (
              <span>{quote.timesViewed} views</span>
            )}
            <span className="capitalize">{currentSeason} season</span>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleFavorite}
                className={cn(
                  'glass-button',
                  isFavorite && 'text-red-500 hover:text-red-600'
                )}
              >
                <Heart className={cn(
                  'w-4 h-4',
                  isFavorite && 'fill-current'
                )} />
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="glass-button"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="glass-button"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
            
            {showRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="glass-button"
              >
                <RefreshCw className={cn(
                  'w-4 h-4 mr-2',
                  isLoading && 'animate-spin'
                )} />
                New Quote
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}