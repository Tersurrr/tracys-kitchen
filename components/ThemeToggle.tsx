'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('tracys-kitchen-theme', nextTheme);
    setTheme(nextTheme);
  };

  const label =
    theme === 'dark'
      ? 'Dark mode active. Switch to light mode'
      : 'Light mode active. Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={theme === 'dark'}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/5 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
