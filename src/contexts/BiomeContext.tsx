"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { BiomeType, DEFAULT_BIOME } from '@/config/biomes';

interface BiomeContextType {
  currentBiome: BiomeType;
  setCurrentBiome: (biome: BiomeType) => void;
  getBiomeBackgroundImage: () => string;
}

const BiomeContext = createContext<BiomeContextType | undefined>(undefined);

export function BiomeProvider({ children }: { children: ReactNode }) {
  // Initialize state with localStorage value or default, but only on client
  const [currentBiome, setCurrentBiome] = useState<BiomeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biome-preference');
      return (saved as BiomeType) || DEFAULT_BIOME;
    }
    return DEFAULT_BIOME;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize and apply biome immediately on mount
  useEffect(() => {
    // Get saved preference
    const savedBiome = localStorage.getItem('biome-preference') as BiomeType;
    const biomeToUse = savedBiome || DEFAULT_BIOME;
    
    // Ensure localStorage has the default value if empty
    if (!savedBiome) {
      localStorage.setItem('biome-preference', DEFAULT_BIOME);
    }
    
    // Remove all existing biome classes
    Array.from(document.documentElement.classList)
      .filter((cls) => cls.startsWith('biome-'))
      .forEach((cls) => document.documentElement.classList.remove(cls));
    
    // Add current biome class immediately
    document.documentElement.classList.add(`biome-${biomeToUse}`);
    
    // Update state if different from saved preference
    if (biomeToUse !== currentBiome) {
      setCurrentBiome(biomeToUse);
    }
    
    setIsInitialized(true);
  }, [isInitialized, currentBiome]);

  // Handle biome changes and persist to localStorage
  const handleSetCurrentBiome = (biome: BiomeType) => {
    // Save to localStorage
    localStorage.setItem('biome-preference', biome);
    
    // Update DOM immediately
    Array.from(document.documentElement.classList)
      .filter((cls) => cls.startsWith('biome-'))
      .forEach((cls) => document.documentElement.classList.remove(cls));
    document.documentElement.classList.add(`biome-${biome}`);
    
    // Update state
    setCurrentBiome(biome);
  };

  const getBiomeBackgroundImage = () => {
    return `/biomes/${currentBiome}.png`;
  };

  return (
    <BiomeContext.Provider value={{ 
      currentBiome, 
      setCurrentBiome: handleSetCurrentBiome, 
      getBiomeBackgroundImage 
    }}>
      {children}
    </BiomeContext.Provider>
  );
}

export function useBiome() {
  const context = useContext(BiomeContext);
  if (context === undefined) {
    throw new Error('useBiome must be used within a BiomeProvider');
  }
  return context;
} 