import {Pressable} from 'react-native';
import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { AppText } from '../Text';

import Animated, { 
  useSharedValue, 
  withSpring, 
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  title: string;
  onPress: () => void;
};

export function Button({title, onPress}:Props){
  const styles = useStyles(s);
 const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 100, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 100, stiffness: 300 });
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable 
      style={[styles.button, animatedStyle]} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <AppText style={styles.title}>{title}</AppText>
    </AnimatedPressable>
  );
}

const s = makeStyles((theme) => ({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.body,
    color: theme.colors.buttonText,
    fontWeight: 'normal',
  },
}))


