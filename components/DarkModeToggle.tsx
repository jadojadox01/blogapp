'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark/light mode"
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow flex items-center justify-center space-x-2 hover:brightness-90 transition"
      style={{ fontSize: '1.25rem' }}
    >
      <FontAwesomeIcon
        icon={faSun}
        className={`transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-50'}`}
      />
      <FontAwesomeIcon
        icon={faMoon}
        className={`transition-opacity duration-300 ${darkMode ? 'opacity-50' : 'opacity-100'}`}
      />
    </button>
  );
}
