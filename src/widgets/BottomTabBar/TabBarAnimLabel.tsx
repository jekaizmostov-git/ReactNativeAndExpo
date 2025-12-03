import { useTheme } from '@/shared/lib/theme/useTheme';
import { Text } from 'react-native';
import Animated, { 
  interpolateColor,
  useAnimatedStyle,
  withTiming, 
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface AnimatedTabLabelProps {
  focused: boolean;
  children: React.ReactNode;
  style?: any;
}

export function TabBarAnimLabel({ focused, children, style }: AnimatedTabLabelProps) {
  const { theme } = useTheme();
  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      focused ? 1 : 0,
      [0, 1],
      [theme.colors.notActive,theme.colors.primary]
    );

    return {
      color,
      transform: [{
        scale: withTiming(focused ? 1.05 : 1, { duration: 200 })
      }],
    };
  });

  return (
    <AnimatedText style={[style, animatedStyle]}>
      {children}
    </AnimatedText>
  );
}