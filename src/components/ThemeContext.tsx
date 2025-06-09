import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('darkMode');
      if (savedPreference !== null) {
        return JSON.parse(savedPreference);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    const html = document.documentElement;
    // Add transition class before making changes
    html.classList.add('theme-transition');
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const html = document.documentElement;
    
    // Apply theme changes
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      html.classList.remove('theme-transition');
    }, 300);

    return () => {
      clearTimeout(timer);
      html.classList.remove('theme-transition');
    };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};