"use client";

import { useBiome } from "@/contexts/BiomeContext";
import { BIOMES } from "@/config/biomes";
import { useState } from "react";

interface BiomeSelectorProps {
  testIdPrefix?: string;
  onBiomeChange?: () => void;
}

export default function BiomeSelector({ testIdPrefix = "", onBiomeChange }: BiomeSelectorProps) {
  const { currentBiome, setCurrentBiome } = useBiome();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-card text-body font-body text-med hover:text-high bg-glass-elev1 backdrop-blur-sm hover:bg-glass-elev2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Select biome theme"
        data-testid={`${testIdPrefix}biome-selector-toggle`}
      >
        <span className="text-lg">
          {BIOMES.find(b => b.id === currentBiome)?.emoji}
        </span>
        <span className="hidden sm:inline text-sm">
          {BIOMES.find(b => b.id === currentBiome)?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <>
          {/* Backdrop to close on outside click */}
          <div 
            className="fixed inset-0 z-[10000]" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Options */}
          <div className="absolute right-0 mt-2 w-48 max-h-64 overflow-y-auto rounded-card bg-glass-elev2 backdrop-blur-xl border border-neutral-sub shadow-elev2 z-[10001]">
            {BIOMES.map((biome) => (
              <button
                key={biome.id}
                onClick={() => {
                  setCurrentBiome(biome.id as typeof BIOMES[number]['id']);
                  setIsOpen(false);
                  onBiomeChange?.();
                }}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 text-left rounded-card
                  transition-all duration-200
                  ${currentBiome === biome.id 
                    ? 'bg-accent/20 text-accent' 
                    : 'text-med hover:text-high hover:bg-glass-elev1'
                  }
                `}
                data-testid={`biome-option-${biome.id}`}
              >
                <span className="text-xl">{biome.emoji}</span>
                <span className="text-body font-body">{biome.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
