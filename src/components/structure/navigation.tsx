"use client";

import { NAV_PAGES } from "@/config/constants";
import { useBiome } from "@/contexts/BiomeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentBiome, setCurrentBiome } = useBiome();

  const pageMatcher = (page: { href: string, current: boolean | null }): boolean => {
    return pathname === page.href || (pathname === '/' && page.href === '/');
  };

  const handleBiomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'misty-lava-forest' | 'desert-oasis';
    setCurrentBiome(value);
  };

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:ml-6 md:flex md:space-x-2 lg:space-x-4 items-center">
        {NAV_PAGES.map((item) => {
          const isCurrent = pageMatcher(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.target}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-med hover:text-high hover:bg-neutral-sub ${isCurrent ? 'text-high bg-neutral-sub' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              <span className="flex items-center">
                {item.name}
                {item.target === '_blank' && (
                  <FiExternalLink className="ml-1 h-4 w-4" />
                )}
              </span>
            </Link>
          );
        })}
        {/* Biome selector */}
        <select
          value={currentBiome}
          onChange={handleBiomeChange}
          className="ml-4 px-2 py-1 rounded-md text-sm text-high bg-neutral-sub border border-text-low focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="misty-lava-forest">Misty Lava Forest</option>
          <option value="desert-oasis">Desert Oasis</option>
        </select>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-med hover:text-high hover:bg-neutral-sub focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent glass-fill backdrop-blur-sm"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {!mobileMenuOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50 mt-16">
          <div className="rounded-lg shadow-md bg-glass-top ring-1 ring-white ring-opacity-30 overflow-hidden backdrop-blur-xl">
            <div className="px-5 pt-4 pb-4 space-y-1">
              {NAV_PAGES.map((item) => {
                const isCurrent = pageMatcher(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-med hover:text-high hover:bg-neutral-sub ${isCurrent ? 'text-high bg-neutral-sub' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {item.target === '_blank' && (
                        <FiExternalLink className="ml-1 h-4 w-4" />
                      )}
                    </span>
                  </Link>
                );
              })}
              <select
                value={currentBiome}
                onChange={handleBiomeChange}
                className="block w-full px-3 py-2 rounded-md text-base font-medium text-med bg-neutral-sub border border-text-low"
              >
                <option value="misty-lava-forest">Misty Lava Forest</option>
                <option value="desert-oasis">Desert Oasis</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}