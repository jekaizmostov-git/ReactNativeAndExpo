import { ReactNode, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme, Theme } from '@/shared/config/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme(prev => (prev.name === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}