import { Image, ImageProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  SharedValue,
  interpolate
} from 'react-native-reanimated';

type Props = ImageProps & {
  index: number;
  width: number;
  source: any;
  scrollX: SharedValue<number>;
}

export function RenderImage({index, width, source, scrollX} : Props){

  const animatedStyle = useAnimatedStyle(() => {
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
    <Animated.View style={[{ 
      width: width, 
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      }, animatedStyle]}>
        <Image 
          source={source} 
          style={{
            width: '90%',
            height: '90%',
            resizeMode: 'contain'
          }}
    />
      </Animated.View>
  )
}

