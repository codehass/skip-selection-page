import { useTheme } from './ThemeContext';

export const ThemeColors = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
      min-h-screen transition-colors duration-200
    `}>
      {children}
    </div>
  );
};