"use client";

import { NAV_PAGES } from "@/config/constants";
import Link from "next/link";
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
      <div className="hidden md:ml-6 md:flex md:space-x-1">
        {NAV_PAGES.map((item) => {
          const isCurrent = pageMatcher(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.target}
              className={`px-4 py-2 text-sm font-semibold uppercase tracking-label transition-all duration-retro-hover ${
                isCurrent
                  ? "text-fg-primary bg-accent-rail bg-opacity-20 border-b-2 border-fg-primary"
                  : "text-fg-secondary hover:text-fg-primary hover:bg-accent-rail hover:bg-opacity-10"
              }`}
              aria-current={isCurrent ? "page" : undefined}
            >
              <span className="flex items-center">
                {item.name}
                {item.target === '_blank' && (
                  <FiExternalLink className="ml-1 h-3 w-3" />
                )}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-retro text-fg-secondary hover:text-fg-primary hover:bg-accent-rail hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-rail transition-all duration-retro-hover"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {!mobileMenuOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50 mt-12">
          <div className="rounded-retro shadow-retro bg-bg-console border border-border-muted overflow-hidden">
            <div className="px-5 pt-4 pb-4 space-y-1">
              {NAV_PAGES.map((item) => {
                const isCurrent = pageMatcher(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className={`block px-3 py-2 rounded-retro text-sm font-semibold uppercase tracking-label transition-all duration-retro-hover ${
                      isCurrent
                        ? "text-fg-primary bg-accent-rail bg-opacity-20"
                        : "text-fg-secondary hover:text-fg-primary hover:bg-accent-rail hover:bg-opacity-10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {item.target === '_blank' && (
                        <FiExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-border-muted">
              <a
                href="/contact"
                className="btn btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}