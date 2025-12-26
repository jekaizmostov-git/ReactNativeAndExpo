import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";
import { Card } from "@/shared/ui/Card";
import { View, ImageBackground, ImageSourcePropType} from 'react-native';

import { AppText } from "@/shared/ui/Text";
import { FeedbackBtn } from "./FeedbackBtn";
import { Extrapolation, interpolate, runOnJS, runOnUI, SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFeedbackButtonStyle } from "./useFeedbackButtonStyle";
import { ButtonAnimConfig } from "./FeedbackBtn";

const AnimatedAppText = Animated.createAnimatedComponent(AppText);

interface TinderCardProps {
    title: string;
    description: string;
    img: ImageSourcePropType;
    handleSwipeAction: (action: 'like' | 'dislike') => void;
    style?: any; 
    activeSlide?: boolean; 
    enemyScale?: SharedValue<number>;
}

const SWIPE_THRESHOLD = 140;

export function TinderCard(
  {
  img,
  title,
  description, 
  style, 
  handleSwipeAction,
  enemyScale,
  activeSlide=true
}:TinderCardProps)
{

  const styles = useStyles(s);

  //сделать useMemo
  const likeAnimConfig : ButtonAnimConfig= {
    colorProgress: useSharedValue(0),
    scale: useSharedValue(1),
    glow: useSharedValue(0),
    opacity: useSharedValue(1),
  }
  
  //сделать useMemo
  const dislikeAnimConfig : ButtonAnimConfig= {
    colorProgress: useSharedValue(0),
    scale: useSharedValue(1),
    glow: useSharedValue(0),
    opacity: useSharedValue(1),
  }
  
  const likeAnimation = useFeedbackButtonStyle(likeAnimConfig, dislikeAnimConfig);
  const dislikeAnimation = useFeedbackButtonStyle(dislikeAnimConfig, likeAnimConfig);
  
  const offsetX = useSharedValue(0);

  const aStyle = useAnimatedStyle(() => {
      return {
        transform: [
          //та самая проверка scale
          { scale: (!activeSlide && enemyScale) ? enemyScale.value : 1 },
          { translateX: offsetX.value },
          { translateY: (offsetX.value > 0 ) ? offsetX.value / 10 : offsetX.value / -10},
          { rotate: `${(offsetX.value / 20)}deg`}
        ],
      }
    });

  

    const gesture = Gesture.Pan()
        .onBegin(() => {

        })
        .onUpdate((e) => {
          'worklet';
          //можно тянуть только слайд с максимальным zIndex
          if (!activeSlide) return;          
          offsetX.value = e.translationX;
            //все остальные карточки скеляться (наверно это костыль)
            if (enemyScale){
              enemyScale.value = interpolate(
                Math.abs(e.translationX),
                [0, SWIPE_THRESHOLD],
                [0.95, 1],
                Extrapolation.CLAMP,
              );
            }
          if (e.translationX > 0){
            likeAnimation.makeMeActiveWorklet();
            dislikeAnimation.returnToInitialStyleWorklet();
          } else if (e.translationX < 0) {
            dislikeAnimation.makeMeActiveWorklet();
            likeAnimation.returnToInitialStyleWorklet();
          }
        })
          .onEnd((e) => {
            'worklet';
            offsetX.value = withSpring(0);
            if (e.translationX > SWIPE_THRESHOLD) {
            // ЛАЙК: Анимация улетания вправо за пределы экрана (например, до 1000px)\
              offsetX.value = withTiming(700, { duration: 700 }, () => {
                // Вызываем JS-функцию после завершения анимации улетания
                runOnJS(handleSwipeAction)('like');
            });

            } else if (e.translationX < -SWIPE_THRESHOLD) {
              
            // ДИЗЛАЙК: Анимация улетания влево
              offsetX.value = withTiming(-700, { duration: 700 }, () => {
                // Вызываем JS-функцию после завершения анимации улетания
              runOnJS(handleSwipeAction)('dislike');
            });

            } else {
            // ВОЗВРАТ: Если порог не достигнут, возвращаем карточку на место
              offsetX.value = withSpring(0);
              if (enemyScale) {
                enemyScale.value = withTiming(0.95, { duration: 300 });
              }
            }
          })
        .onFinalize(() => {
          likeAnimation.returnToInitialStyleWorklet();
          dislikeAnimation.returnToInitialStyleWorklet();
    });
    

  const likeHandler = () => {
    runOnUI(() => {
      'worklet';

      offsetX.value = withTiming(700, { duration: 700 });
      
      if (enemyScale){
      enemyScale.value = withTiming(1, { duration: 700 }, () => {
        runOnJS(handleSwipeAction)('like');
      });
    }
    })();
  };
  
  const disLikeHandler = () => {
    runOnUI(() => {
      'worklet';
      offsetX.value = withTiming(-700, { duration: 700 },);
      
      if (enemyScale){
      enemyScale.value = withTiming(1, { duration: 700 }, () => {
        runOnJS(handleSwipeAction)('like');
      });
    }
    })();
  };



  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, aStyle,style]}
      >
        <ImageBackground
          source={img}
          style={styles.imageBg}
          resizeMode="cover"
        >
                <Card style={styles.text}>
                  <AnimatedAppText
                    size="subtitle" 
                    weight="bold">
                      {title}
                  </AnimatedAppText>
                  <AnimatedAppText>
                    {description}
                  </AnimatedAppText>
                </Card>
                <View style={styles.feedbackBtns}>
                  <FeedbackBtn 
                    name='close'
                    onPress={disLikeHandler} 
                    myAnimConfig={dislikeAnimConfig}
                    enemyAnimConfig={likeAnimConfig}
                    disabled={!activeSlide}
                  />
                  <FeedbackBtn 
                    name='heart' 
                    onPress = {likeHandler}
                    myAnimConfig={likeAnimConfig}
                    enemyAnimConfig={dislikeAnimConfig}
                    disabled={!activeSlide}
                  />
                </View>        
        </ImageBackground>
      </Animated.View>
    </GestureDetector>

  )
}

const s = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  imageBg: {
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    flex: 1,
  },
  text: {
    gap: theme.spacing.sm,
  },
  feedbackBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))