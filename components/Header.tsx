
import React from 'react';
import type { Language, Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, setTheme, translations }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-primary dark:text-primary-light">
          {translations.app_title}
        </h1>
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center w-20 h-9 rounded-full bg-gray-200 dark:bg-slate-700 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Language"
          >
            <span className={`absolute left-1.5 transition-transform duration-300 ${language === 'en' ? 'translate-x-0' : 'translate-x-10'} text-sm font-semibold text-white bg-primary rounded-full w-8 h-7 flex items-center justify-center`}>
              {language === 'en' ? 'EN' : 'AR'}
            </span>
            <div className="flex w-full justify-around">
                <span className={`text-sm font-bold ${language === 'en' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>EN</span>
                <span className={`text-sm font-bold ${language === 'ar' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>AR</span>
            </div>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
