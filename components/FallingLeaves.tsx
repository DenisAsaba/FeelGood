'use client';

import React, { useEffect, useState } from 'react';
import { useSeason } from '@/providers/SeasonProvider';

interface Leaf {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  size: number;
}

export function FallingLeaves() {
  const { currentSeason } = useSeason();
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Generate leaves when in fall season
  useEffect(() => {
    if (currentSeason === 'fall' && shouldAnimate) {
      const newLeaves: Leaf[] = [];
      const leafCount = 12; // Number of leaves

      for (let i = 0; i < leafCount; i++) {
        newLeaves.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (0-100%)
          animationDelay: Math.random() * -20, // Random delay up to -20s
          animationDuration: 15 + Math.random() * 10, // Duration between 15-25s
          size: 8 + Math.random() * 6, // Size between 8-14px
        });
      }

      setLeaves(newLeaves);
    } else {
      setLeaves([]);
    }
  }, [currentSeason, shouldAnimate]);

  // Don't render if not fall season or reduced motion
  if (currentSeason !== 'fall' || !shouldAnimate || leaves.length === 0) {
    return null;
  }

  return (
    <div className="falling-leaves-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationDelay: `${leaf.animationDelay}s`,
            animationDuration: `${leaf.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
}