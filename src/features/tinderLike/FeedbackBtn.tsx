import { Pressable } from "react-native";

import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";

import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  interpolateColor,
}  from "react-native-reanimated";

import { useFeedbackButtonStyle } from './useFeedbackButtonStyle';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export type ButtonAnimConfig = {
  colorProgress: SharedValue<number>;
  scale: SharedValue<number>;
  glow: SharedValue<number>;
  opacity: SharedValue<number>;
}


type Props = {
  name: 'heart' | 'close';
  size?: number;
  onPress: () => void,
  myAnimConfig: ButtonAnimConfig;
  enemyAnimConfig: ButtonAnimConfig;
  disabled: boolean;
}

export function FeedbackBtn ({name, size=32, onPress, myAnimConfig, enemyAnimConfig, disabled}: Props){

  const colors = {
    icon: name === 'heart' ? 'green' : 'red',
    iconActive: 'white',
    background: 'white',
    backgroundActive: name === 'heart' ? 'green' : 'red',
  }

  const {colorProgress, scale, glow, opacity} = myAnimConfig;
  const {makeMeActiveJS, returnToInitialStyleJS} = useFeedbackButtonStyle(myAnimConfig, enemyAnimConfig);

  function pressInHandler (){
    makeMeActiveJS();
  }

  function pressOutHandler (){
    returnToInitialStyleJS();
    onPress();
  }

  const aProps = useAnimatedProps(() => {
    const color = interpolateColor(
      colorProgress.value,
      [0,1],
      [colors.icon, colors.iconActive],
    );
    return {
      color: color as string,
    }
  })

  const aStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      backgroundColor: colorProgress.value === 1 ? colors.backgroundActive: colors.background,
      opacity: opacity.value,
      shadowColor: colors.icon,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glow.value * 0.8,
      shadowRadius: 6, // увеличиваем размытие
      elevation: 5 + glow.value * 10, // для Android
    }
  });

  const styles = useStyles(s);

  return (
    <AnimatedPressable 
    onPressIn={pressInHandler}
    onPressOut={pressOutHandler}
    style={[
      styles.feedbackBtn, 
      aStyle,
    ]}
    disabled={disabled}
    >
      <AnimatedIcon 
        name={name} 
        animatedProps={aProps}
        size={size}
      />
    </AnimatedPressable>
  )
}

const s = makeStyles((theme) => ({
  feedbackBtn: {
    padding: theme.spacing.md,
    borderRadius: 50,
  }
}));
