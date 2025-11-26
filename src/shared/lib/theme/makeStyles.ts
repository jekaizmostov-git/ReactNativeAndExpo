

// type MakeStyleProps<T> = (theme: Theme) => StyleSheet.NamedStyles<T>;



// export const makeStyles = <T>(styles: MakeStyleProps<T>) => (): StyleSheet.NamedStyles<T> => {
//   const {theme} = useTheme();
//   const css = styles(theme);
//   return StyleSheet.create(css);
  
// };

import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function makeStyles<T extends NamedStyles<T>>(
  styles: (theme: any) => T
) {
  return styles;
}