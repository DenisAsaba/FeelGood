'use client';

import React from 'react';
import { useQuoteStore } from '@/stores/quote-store';
import { QuoteCard } from '@/components/QuoteCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favoriteQuotes, removeFromFavorites } = useQuoteStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="glass-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-seasonal-primary to-seasonal-secondary bg-clip-text text-transparent">
              Favorite Quotes
            </h1>
            <p className="text-muted-foreground">
              Your collection of inspiring quotes ({favoriteQuotes.length})
            </p>
          </div>
        </div>

        {/* Empty State */}
        {favoriteQuotes.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="p-12 text-center space-y-4">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No favorites yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start collecting your favorite quotes by clicking the heart icon on any quote.
                </p>
              </div>
              <Link href="/">
                <Button className="mt-4">
                  Discover Quotes
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* Favorites Grid */
          <div className="grid gap-6 md:grid-cols-2">
            {favoriteQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                showActions={true}
                showRefresh={false}
                variant="compact"
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {favoriteQuotes.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Collection Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-seasonal-primary">
                    {favoriteQuotes.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Quotes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-seasonal-primary">
                    {new Set(favoriteQuotes.map(q => q.author)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Authors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-seasonal-primary">
                    {Math.round(favoriteQuotes.reduce((acc, q) => acc + q.characterCount, 0) / favoriteQuotes.length) || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Length</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-seasonal-primary">
                    {favoriteQuotes.reduce((acc, q) => acc + (q.timesViewed || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}