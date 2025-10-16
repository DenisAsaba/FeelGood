'use client';

import { useSeason } from '@/providers/SeasonProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuoteWidget } from '@/components/QuoteWidget';
import Link from 'next/link';

export default function HomePage() {
  const { currentSeason, isSeasonLocked, lockSeason, unlockSeason, availableSeasons } = useSeason();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-seasonal-primary to-seasonal-secondary bg-clip-text text-transparent">
            Micro Motivator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your daily inspiration with our seasonal-themed motivational app. 
            Experience mindfulness and motivation that changes with the seasons.
          </p>
        </div>

        {/* Quote Widget - Main Feature */}
        <QuoteWidget 
          autoRefresh={true}
          showDaily={true}
          className="max-w-2xl mx-auto"
        />

        {/* Season Control Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Current Season: <span className="capitalize text-seasonal-primary">{currentSeason}</span>
              {isSeasonLocked && (
                <span className="text-xs bg-seasonal-accent/20 text-seasonal-accent px-2 py-1 rounded-full">
                  Locked
                </span>
              )}
            </CardTitle>
            <CardDescription>
              The app automatically detects the current season, but you can override it manually.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableSeasons.map((season) => (
                <Button
                  key={season}
                  variant={currentSeason === season ? "default" : "outline"}
                  size="sm"
                  onClick={() => lockSeason(season)}
                  className="capitalize"
                >
                  {season}
                </Button>
              ))}
            </div>
            
            {isSeasonLocked && (
              <Button
                variant="ghost"
                size="sm"
                onClick={unlockSeason}
                className="w-full"
              >
                Use Automatic Season Detection
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>💫 Daily Motivation</CardTitle>
              <CardDescription>
                Fresh inspirational quotes from ZenQuotes.io API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Random motivational quotes</li>
                <li>• Quote of the day</li>
                <li>• Favorite quotes collection</li>
                <li>• Share and copy functionality</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>🍃 Seasonal Experience</CardTitle>
              <CardDescription>
                Colors, animations, and themes that adapt to the seasons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-16 rounded-lg bg-gradient-to-r from-seasonal-primary/20 to-seasonal-secondary/20 border border-seasonal-accent/30" />
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automatic season detection</li>
                <li>• Falling leaves in fall</li>
                <li>• Accessibility & reduced motion</li>
                <li>• Manual season override</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Navigation & Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>🚀 Explore More</CardTitle>
            <CardDescription>
              Discover additional features and build your quote collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="glass-button">
                <Link href="/favorites">
                  💖 View Favorites
                </Link>
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="glass-button"
              >
                🔄 Refresh Quotes
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your seasonal micro-motivator is ready! The ZenQuotes.io API integration provides 
              fresh daily inspiration. Collect your favorite quotes and enjoy the seasonal 
              theming that adapts throughout the year.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}