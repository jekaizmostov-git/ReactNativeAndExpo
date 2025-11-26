// import { createContext } from 'react';
// import type { Theme } from '@/shared/config/type';

// export type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
// };

// export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

import { createContext } from 'react';
import { lightTheme, darkTheme, Theme } from '@/shared/config/theme';

export const ThemeContext = createContext({
  theme: lightTheme as Theme,
  toggleTheme: () => {},
});