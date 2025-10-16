'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Season } from '@/types';
import { getCurrentSeason, applySeasonalTheme } from '@/theme/palette';
import { getLocalStorageItem, setLocalStorageItem, STORAGE_KEYS } from '@/lib/storage';

interface SeasonContextType {
  currentSeason: Season;
  isSeasonLocked: boolean;
  lockSeason: (season: Season) => void;
  unlockSeason: () => void;
  availableSeasons: Season[];
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

interface SeasonProviderProps {
  children: React.ReactNode;
}

export function SeasonProvider({ children }: SeasonProviderProps) {
  const [currentSeason, setCurrentSeason] = useState<Season>(() => {
    // Try to get locked season from storage, fallback to current season
    const lockedSeason = getLocalStorageItem<Season | null>(STORAGE_KEYS.SEASON_OVERRIDE, null);
    return lockedSeason || getCurrentSeason();
  });
  
  const [isSeasonLocked, setIsSeasonLocked] = useState<boolean>(() => {
    return getLocalStorageItem<Season | null>(STORAGE_KEYS.SEASON_OVERRIDE, null) !== null;
  });

  const availableSeasons: Season[] = ['spring', 'summer', 'fall', 'winter'];

  // Update season automatically if not locked
  useEffect(() => {
    if (!isSeasonLocked) {
      const autoSeason = getCurrentSeason();
      if (autoSeason !== currentSeason) {
        setCurrentSeason(autoSeason);
      }
    }
  }, [currentSeason, isSeasonLocked]);

  // Apply theme whenever season changes
  useEffect(() => {
    applySeasonalTheme(currentSeason);
  }, [currentSeason]);

  const lockSeason = (season: Season) => {
    setCurrentSeason(season);
    setIsSeasonLocked(true);
    setLocalStorageItem(STORAGE_KEYS.SEASON_OVERRIDE, season);
  };

  const unlockSeason = () => {
    setIsSeasonLocked(false);
    setLocalStorageItem(STORAGE_KEYS.SEASON_OVERRIDE, null);
    const autoSeason = getCurrentSeason();
    setCurrentSeason(autoSeason);
  };

  const value: SeasonContextType = {
    currentSeason,
    isSeasonLocked,
    lockSeason,
    unlockSeason,
    availableSeasons,
  };

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}