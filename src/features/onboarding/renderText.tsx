import { HightLightText } from "@/shared/ui/HightLightText";
import { View } from "react-native";
import { AppText } from "@/shared/ui/Text";
import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";


type renderTextProps = {
  index: number;
  width: number;
  title: string;
  highlight: string;
  description: string;
  scrollX: SharedValue<number>;
}

export function RenderText({
  index, 
  width,
  title, 
  highlight, 
  description, 
  scrollX,
} : renderTextProps){
  const styles = useStyles(s);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0]
    );
    const translateY = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [100, 0, 100],
      //Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    }
   })

  return (
    <Animated.View style={[styles.container, {width: width}, animatedStyles]}>
      <HightLightText 
        title={title} 
        highlight={highlight} 
        size="title"
        weight="bold"  
        style={styles.title}
      />
      <AppText style={styles.description} >{description}</AppText>
    </Animated.View>
  )
}

const s = makeStyles((theme) => ({
  container:{
    gap: 10,
  },
  title:{
    textAlign: 'center',
    lineHeight: theme.typography.title * 1.3,
  },
  description:{
    textAlign: 'center',
    lineHeight: theme.typography.body * 1.2,
  }
}))