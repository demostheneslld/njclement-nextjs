"use client";

import Section from '@/components/ui/Section';
import { SOCIAL_LINKS } from '@/config/constants';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Section background="neutral">
      <div className="">
        <footer className="text-high">
          {/* Social links at the top, left-aligned */}
          <div className="pb-8 border-b border-text-low/20">
            <div className="flex space-x-6">
              {SOCIAL_LINKS.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-high hover:text-accent transition-colors duration-200"
                  aria-label={item.name}
                >
                  {item.icon ? (
                    <item.icon className="h-6 w-6" />
                  ) : (
                    <div className="h-6 w-6 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none' }} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Main grid content */}
          <div className="py-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-high mb-4">About</h3>
                <ul role="list" className="space-y-3">
                  <li>
                    <Link href="/" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">Home</Link>
                  </li>
                  <li>
                    <Link href="/resume" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">Resume</Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">Portfolio</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-high mb-4">Contact</h3>
                <ul role="list" className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">Get in Touch</Link>
                  </li>
                  <li>
                    <a href="mailto:contact@njclement.com" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">contact@njclement.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-high mb-4">Links</h3>
                <ul role="list" className="space-y-3">
                  <li>
                    <a href="https://github.com/demostheneslld" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">GitHub</a>
                  </li>
                  <li>
                    <a href="https://articles.njclement.com/" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-med hover:text-high transition-colors duration-200">Articles</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright at the bottom, left-aligned */}
          <div className="pt-8 border-t border-text-low/20">
            <p className="text-left text-xs leading-5 text-med">
              &copy; {currentYear} Nathaniel J. Clement. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Section>
  );
}