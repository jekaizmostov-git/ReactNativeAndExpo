
export type ThemeColors = {
  primary: string;
  highlight: string;
  bg: string;
  text: string;
  buttonText: string;
  card: string;
  border: string;
  notActive: string;
};

export type Theme = {
  name: string;
  colors: ThemeColors;
};

export const baseTheme = {
  radius: {
    sm: 6,
    md: 12,
    lg: 24,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 28,
  },

  typography: {
    title: 52,
    subtitle: 34,
    body: 24,
  },
} as const;

export const lightTheme: Theme = {
  name: "light",
  colors: {
    notActive: '#ccc',
    primary: '#8D6949',
    highlight: '#F4D400',
    bg: '#fff',
    text: '#1a1a1a',
    buttonText: '#fff',
    card: '#ffffff',
    border: '#d9d9d9',
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    notActive: '#D1DCFF',
    primary: '#7f9cff',
    highlight: '#F56A00',
    bg: '#121212',
    text: '#ffffff',
    buttonText: '#000',
    card: '#1e1e1e',
    border: '#333',
  },
};