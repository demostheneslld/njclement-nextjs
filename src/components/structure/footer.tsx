"use client";

import { socialLinks } from '@/config/constants';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
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
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; {currentYear} Nathaniel J. Clement. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">About</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/" className="text-sm leading-6 text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/resume" className="text-sm leading-6 text-gray-300 hover:text-white">Resume</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm leading-6 text-gray-300 hover:text-white">Portfolio</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">Get in Touch</Link>
              </li>
              <li>
                <a href="mailto:contact@njclement.com" className="text-sm leading-6 text-gray-300 hover:text-white">contact@njclement.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Links</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="https://github.com/demostheneslld" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">GitHub</a>
              </li>
              <li>
                <a href="https://articles.njclement.com/" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">Articles</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}