import { withSpring, withTiming } from "react-native-reanimated";
import { ButtonAnimConfig } from "./FeedbackBtn";


export function useFeedbackButtonStyle(
  active:ButtonAnimConfig, 
  dependent:ButtonAnimConfig
){

  
  const {colorProgress, scale, glow} = active;
  const {opacity: enemyOpacity} = dependent;

  const makeMeActiveWorklet = () => {
    'worklet';
    scale.value = withSpring(0.9);
    glow.value = withTiming(1, {duration: 150});
    enemyOpacity.value = 0.5;
    colorProgress.value = 1;
  };

  const returnToInitialStyleWorklet = () => {
    'worklet';
    scale.value = withSpring(1);
    glow.value = withTiming(0, {duration: 150});
    enemyOpacity.value = 1;
    colorProgress.value = 0;
  }

  const makeMeActiveJS = () => {
    scale.value = withSpring(0.9);
    glow.value = withTiming(1, {duration: 150});
    enemyOpacity.value = 0.5;
    colorProgress.value = 1;
  }

  const returnToInitialStyleJS = () => {
    scale.value = withSpring(1);
    glow.value = withTiming(0, {duration: 150});
    enemyOpacity.value = 1;
    colorProgress.value = 0;
  }

  return {
    makeMeActiveWorklet, 
    returnToInitialStyleWorklet,
    makeMeActiveJS,
    returnToInitialStyleJS,
  }
}