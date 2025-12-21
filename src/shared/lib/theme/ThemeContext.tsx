import { createContext } from 'react';
import { lightTheme, darkTheme, Theme } from '@/shared/config/theme';

export const ThemeContext = createContext({
  theme: lightTheme as Theme,
  toggleTheme: () => {console.log(('create theme'))},
});