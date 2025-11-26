// import { ReactNode, useState } from 'react';
// import { ThemeContext } from './ThemeContext';
// import { lightTheme } from '@/shared/config/theme';
// import { darkTheme } from '@/shared/config/theme';
// import type { Theme } from '@/shared/config/type';
// import { theme } from '@/shared/config/theme';

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

//   const toggleTheme = () => {
//     console.log("Toggle theme");
//     setCurrentTheme((prev) => (prev.name === 'light' ? ({...prev, ...darkTheme}) : ({...prev, ...lightTheme})));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme:currentTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

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