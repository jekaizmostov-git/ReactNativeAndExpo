import React, { useEffect, useState } from 'react';

import Animated, { 
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/shared/lib/theme/useTheme';


const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

interface WorkingColorAnimatedTabIconProps {
  name: string;
  focused: boolean;
  size?: number;
}

export function TabBarAnimIcon({ 
  name, 
  focused, 
  size = 24, 
}: WorkingColorAnimatedTabIconProps) {
  const { theme } = useTheme();

   const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withTiming(focused ? 1.05 : 1, { duration: 200 })
    }]
  }));

  return (
    <Animated.View style={animatedStyle}>
        <AnimatedIonicons 
          name={name as any} 
          size={size} 
          color={focused ? theme.colors.primary : theme.colors.notActive}
        />
    </Animated.View>
  );
}

