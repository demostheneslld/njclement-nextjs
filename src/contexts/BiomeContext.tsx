"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { BiomeType, DEFAULT_BIOME, BIOMES } from '@/config/biomes';

interface BiomeContextType {
  currentBiome: BiomeType;
  setCurrentBiome: (biome: BiomeType) => void;
  getBiomeBackgroundImage: () => string;
}

const BiomeContext = createContext<BiomeContextType | undefined>(undefined);

const getValidBiome = (value?: string | null): BiomeType | null => {
  if (!value) return null;
  return BIOMES.some((biome) => biome.id === value) ? (value as BiomeType) : null;
};

const getCookieBiome = (): BiomeType | null => {
  const match = document.cookie.match(/(?:^|; )biome-preference=([^;]+)/);
  return getValidBiome(match ? decodeURIComponent(match[1]) : null);
};

const setBiomeCookie = (biome: BiomeType) => {
  document.cookie = `biome-preference=${encodeURIComponent(biome)}; path=/; max-age=31536000; samesite=lax`;
};

export function BiomeProvider({ children }: { children: ReactNode }) {
  // Initialize state with localStorage value or default, but only on client
  const [currentBiome, setCurrentBiome] = useState<BiomeType>(() => {
    if (typeof window === 'undefined') return DEFAULT_BIOME;
    const cookieBiome = getCookieBiome();
    if (cookieBiome) return cookieBiome;
    return DEFAULT_BIOME;
  });

  // Initialize and apply biome immediately on mount
  useEffect(() => {
    const cookieBiome = getCookieBiome();
    const biomeToUse = cookieBiome || DEFAULT_BIOME;
    if (!cookieBiome) setBiomeCookie(biomeToUse);
    
    const root = document.documentElement;
    root.className = root.className
      .split(' ')
      .filter((cls) => cls && !cls.startsWith('biome-'))
      .join(' ');
    root.classList.add(`biome-${biomeToUse}`);

    setCurrentBiome((prev) => (prev === biomeToUse ? prev : biomeToUse));
  }, []);

  // Handle biome changes and persist to localStorage
  const handleSetCurrentBiome = (biome: BiomeType) => {
    setBiomeCookie(biome);
    
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
