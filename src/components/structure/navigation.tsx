"use client";

import BiomeSelector from "@/components/ui/BiomeSelector";
import Button from "@/components/ui/button";
import { NAV_PAGES } from "@/config/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageMatcher = (page: { href: string, current: boolean | null }): boolean => {
    return pathname === page.href || (pathname === '/' && page.href === '/');
  };

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:flex md:space-x-2 lg:space-x-3 items-center">
        {NAV_PAGES.map((item) => {
          const isCurrent = pageMatcher(item);
          return (
            <Button
              key={item.name}
              href={item.href}
              variant="ghost"
              size="sm"
              isExternal={item.target === '_blank'}
              icon={item.target === '_blank' ? <FiExternalLink /> : undefined}
              aria-current={isCurrent ? 'page' : undefined}
              data-testid={`desktop-nav-${item.name.toLowerCase()}`}
              className={`
                ${isCurrent 
                  ? 'bg-glass-elev1 backdrop-blur-sm text-high' 
                  : 'bg-transparent hover:bg-glass-elev2 hover:backdrop-blur-sm hover:text-high'
                }
              `}
            >
              {item.name}
            </Button>
          );
        })}
        {/* Biome selector */}
        <BiomeSelector testIdPrefix="desktop-" />
      </div>
      
      {/* Desktop contact button */}
      <div className="hidden md:flex items-center space-x-4">
        <Button href="/contact" variant="secondary" size="sm" data-testid="desktop-contact-button">Contact</Button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-med hover:text-high hover:bg-neutral-sub focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent glass-fill backdrop-blur-sm"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          data-testid="mobile-menu-button"
        >
          <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
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

      {/* Mobile navigation - render at document level to avoid z-index issues */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-[9999] md:hidden backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(27, 31, 34, 0.8)' }}
          data-testid="mobile-menu"
        >
          <div className="h-full flex flex-col">
            {/* Mobile navbar header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-sub bg-neutral">
              <h2 className="text-h2 font-head text-accent">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-med hover:text-high hover:bg-neutral-sub focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors"
                aria-label="Close menu"
                data-testid="mobile-menu-close"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            {/* Mobile navigation links */}
            <div className="flex-1 px-6 py-6 space-y-3 bg-neutral backdrop-blur-xl">
              {NAV_PAGES.map((item) => {
                const isCurrent = pageMatcher(item);
                return (
                  <Button
                    key={item.name}
                    href={item.href}
                    variant="ghost"
                    size="md"
                    fullWidth
                    isExternal={item.target === '_blank'}
                    icon={item.target === '_blank' ? <FiExternalLink /> : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isCurrent ? 'page' : undefined}
                    data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    className={`
                      justify-start
                      ${isCurrent 
                        ? 'bg-glass-elev1 backdrop-blur-sm text-high' 
                        : 'bg-transparent hover:bg-glass-elev2 hover:backdrop-blur-sm hover:text-high'
                      }
                    `}
                  >
                    {item.name}
                  </Button>
                );
              })}
              
              {/* Biome selector */}
              <div className="pt-6 mt-6 border-t border-neutral-sub">
                <div className="flex items-center justify-between">
                  <span className="text-body font-body text-med">Theme</span>
                  <BiomeSelector testIdPrefix="mobile-" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}