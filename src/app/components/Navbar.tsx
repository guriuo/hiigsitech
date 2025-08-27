'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Sun, Moon } from 'lucide-react';

const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean; }) => {
  return (
    <Link href={href} className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-gray-900 dark:text-white' : 'text-black dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400'}`}>
      {children}
      {isActive && (
        <motion.div
          layoutId="active-nav-capsule"
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800/80 rounded-md z-[-1]"
          initial={{ borderRadius: 8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
    </Link>
  );
};

const ThemeToggle = ({ theme, setTheme }: { theme: string; setTheme: any }) => (
  <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300" aria-label="Toggle theme">
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </AnimatePresence>
  </button>
);

const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {
    const topVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: 45, translateY: 5.5 }
    };
    const middleVariants = {
        closed: { opacity: 1 },
        open: { opacity: 0 }
    };
    const bottomVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: -45, translateY: -5.5 }
    };

    return (
        <button 
            className="md:hidden w-10 h-10 relative focus:outline-none z-50 text-black dark:text-white" 
            onClick={onClick} 
            aria-label="Open navigation menu"
        >
            <motion.div
                className="w-6 h-6 absolute top-1/2 left-1/2"
                style={{ x: "-50%", y: "-50%" }}
                animate={isOpen ? "open" : "closed"}
            >
                <motion.span
                    className="block absolute h-0.5 w-full bg-current"
                    style={{ top: "25%" }}
                    variants={topVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                    className="block absolute h-0.5 w-full bg-current"
                    style={{ top: "50%" }}
                    variants={middleVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                    className="block absolute h-0.5 w-full bg-current"
                    style={{ top: "75%" }}
                    variants={bottomVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </motion.div>
        </button>
    );
};


export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blog', href: '/blog' }
  ];

  const mobileMenuVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24, staggerChildren: 0.07, delayChildren: 0.2 }},
    closed: { opacity: 0, y: "-20%", transition: { duration: 0.3, staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }}
  };
  const mobileLinkVariants: Variants = {
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 }},
    closed: { opacity: 0, x: "-20px" }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-3 sm:px-8 py-3 flex justify-between items-center z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Hiigsi Tech</Link>
        
        <nav className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-2 relative">
            {navItems.map(item => (
                <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
                  {item.name}
                </NavLink>
            ))}
            </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <Link href="/contact" className="connect-button text-sm font-semibold flex items-center">
                Contact Us <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
        </div>

        <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <HamburgerButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
            <>
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div 
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="md:hidden fixed top-20 left-4 right-4 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 origin-top"
              >
                  <nav className="flex flex-col p-2">
                      {navItems.map(item => (
                          <motion.div key={item.href} variants={mobileLinkVariants} className="my-1">
                              <Link 
                                  href={item.href} 
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`text-lg w-full text-left p-4 rounded-lg font-medium transition-colors flex justify-between items-center ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-800/50 text-blue-600' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/30'}`}
                              >
                                  <span>{item.name}</span>
                                  {pathname === item.href && (
                                      <motion.div layoutId="active-mobile-dot" className="w-2 h-2 rounded-full bg-blue-600"></motion.div>
                                  )}
                              </Link>
                          </motion.div>
                      ))}
                      <motion.div variants={mobileLinkVariants} className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="connect-button w-full text-lg font-semibold flex items-center justify-center">
                              Contact Us <ArrowRight className="ml-1 w-4 h-4" />
                          </Link>
                      </motion.div>
                  </nav>
              </motion.div>
            </>
        )}
      </AnimatePresence>
    </>
  );
}