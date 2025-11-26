import {Text as RNText, TextProps} from 'react-native';

import {baseTheme as mainTheme} from '@/shared/config/theme';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { makeStyles } from '@/shared/lib/theme/makeStyles';

import { ReactNode } from 'react';


export type AppTextProps = TextProps & {
  size?: keyof typeof mainTheme.typography;
  weight?: 'normal' | 'bold' | '600';
  color?: string; 
  children?: ReactNode;
};


export function AppText({
  size = 'body',
  weight = 'normal',
  color,
  style,
  children,
  ...rest
}:AppTextProps) {

  function getColor(){
    return color || useStyles(s).title.color;
  }

  return (
    <RNText 
      style={
        [
          {
            fontSize: mainTheme.typography[size],
            fontWeight: weight,
            color: getColor(),
          },
          style,
        ]
      }
      {...rest}
    > 
      {children} 
    </RNText>   
  )  
}

const s = makeStyles((theme) => ({
  title:{
    color: theme.colors.text,
  },
}))

