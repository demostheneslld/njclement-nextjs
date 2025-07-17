"use client";

import { useBiome } from "@/contexts/BiomeContext";
import { useEffect, useState } from "react";

const BIOMES = [
  { value: "namibia", label: "Namibia", icon: "🦌" },
  { value: "giza", label: "Giza", icon: "🏜️" },
  { value: "kilimanjaro", label: "Kilimanjaro", icon: "⛰️" },
  { value: "malibu", label: "Malibu", icon: "🏄" },
  { value: "oahu", label: "Oahu", icon: "🌺" },
  { value: "verona", label: "Verona", icon: "🏞️" },
  { value: "washington-dc", label: "Washington DC", icon: "🏛️" },
  { value: "yosemite", label: "Yosemite", icon: "🏔️" },
  { value: "zanzibar", label: "Zanzibar", icon: "🏝️" }
] as const;

interface BiomeSelectorProps {
  testIdPrefix?: string;
}

export default function BiomeSelector({ testIdPrefix = "" }: BiomeSelectorProps) {
  const { currentBiome, setCurrentBiome } = useBiome();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-card bg-glass-elev1 backdrop-blur-sm">
        <span className="w-5 h-5 rounded animate-pulse bg-text-low/20" />
        <span className="w-16 h-4 rounded animate-pulse bg-text-low/20 hidden sm:block" />
      </div>
    );
  }

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
          {BIOMES.find(b => b.value === currentBiome)?.icon}
        </span>
        <span className="hidden sm:inline text-sm">
          {BIOMES.find(b => b.value === currentBiome)?.label}
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
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Options */}
          <div className="absolute right-0 mt-2 w-48 rounded-card bg-glass-elev2 backdrop-blur-xl border border-neutral-sub shadow-elev2 z-20">
            {BIOMES.map((biome) => (
              <button
                key={biome.value}
                onClick={() => {
                  setCurrentBiome(biome.value as typeof BIOMES[number]['value']);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 text-left rounded-card
                  transition-all duration-200
                  ${currentBiome === biome.value 
                    ? 'bg-accent/20 text-accent' 
                    : 'text-med hover:text-high hover:bg-glass-elev1'
                  }
                `}
                data-testid={`biome-option-${biome.value}`}
              >
                <span className="text-xl">{biome.icon}</span>
                <span className="text-body font-body">{biome.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}