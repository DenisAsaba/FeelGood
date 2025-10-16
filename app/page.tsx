'use client';

import { useSeason } from '@/providers/SeasonProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
              <CardTitle>🍃 Seasonal Theming</CardTitle>
              <CardDescription>
                Colors and animations that change with the seasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 rounded-lg bg-gradient-to-r from-seasonal-primary/20 to-seasonal-secondary/20 border border-seasonal-accent/30" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>♿ Accessibility First</CardTitle>
              <CardDescription>
                Built with accessibility and reduced motion support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Skip-to-content links</li>
                <li>• Reduced motion support</li>
                <li>• High contrast mode</li>
                <li>• Keyboard navigation</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Your seasonal micro-motivator is ready to inspire you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is your starting point for building a comprehensive micro-motivator application. 
              The seasonal theming system is active and the accessibility features are in place. 
              Add your motivational content, breathing exercises, and user features as needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}