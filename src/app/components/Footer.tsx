'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
}

const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
  >
    <Icon size={22} />
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  // ✅ UPDATE: Replace these placeholder URLs with your actual social media links
  const socialLinks: SocialLinkProps[] = [
    { href: 'https://facebook.com/your-page', icon: Facebook },
    { href: 'https://twitter.com/your-handle', icon: Twitter },
    { href: 'https://linkedin.com/in/your-profile', icon: Linkedin },
    { href: 'https://github.com/your-username', icon: Github },
    { href: 'https://instagram.com/your-username', icon: Instagram },
    { href: 'https://youtube.com/your-channel', icon: Youtube },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-black/50 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Aleen Creatives</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs">
              We are a forward-thinking digital agency dedicated to crafting bespoke solutions
              that drive growth, engagement, and success.
            </p>
            <div className="mt-6 flex space-x-5">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} href={link.href} icon={link.icon} />
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Company</h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/jobs">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Services</h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/services#web-dev">Web Development</FooterLink>
              <FooterLink href="/services#app-dev">App Development</FooterLink>
              <FooterLink href="/services#ui-ux">UI/UX Design</FooterLink>
              <FooterLink href="/services#branding">Branding</FooterLink>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Legal</h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Aleen Creatives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}