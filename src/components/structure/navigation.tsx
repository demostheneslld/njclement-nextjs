"use client";

import { navigationPages } from "@/config/constants";
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
      <div className="hidden md:ml-6 md:flex md:space-x-2 lg:space-x-4">
        {navigationPages.map((item) => {
          const isCurrent = pageMatcher(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.target}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isCurrent
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              }`}
              aria-current={isCurrent ? "page" : undefined}
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
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50 mt-16">
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 pb-4 space-y-1">
              {navigationPages.map((item) => {
                const isCurrent = pageMatcher(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isCurrent
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
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
            </div>
            <div className="px-5 py-3 border-t border-gray-200">
              <a
                href="/contact"
                className="block w-full px-4 py-2 text-center font-medium text-primary-600 bg-gray-50 hover:bg-gray-100 rounded-md"
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