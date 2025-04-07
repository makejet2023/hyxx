'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Theme, ThemeType, getStoredTheme, setTheme } from '@/utils/theme';

export default function Navbar() {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(Theme.LIGHT);

  useEffect(() => {
    const theme = getStoredTheme();
    setCurrentTheme(theme);
    setTheme(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Essential Chinese
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === '/'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === '/favorites'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Favorites
            </Link>
            <Link
              href="/practice"
              className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === '/practice'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Practice
            </Link>
            <Link
              href="/progress"
              className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === '/progress'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Progress
            </Link>
            <Link
              href="/achievements"
              className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === '/achievements'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Achievements
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {currentTheme === Theme.LIGHT ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 