import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";
import { Card } from "@/shared/ui/Card";
import { View, ImageBackground, ImageSourcePropType, ViewStyle, ActivityIndicator, Dimensions } from 'react-native';

import { AppText } from "@/shared/ui/Text";
import { FeedbackBtn } from "./FeedbackBtn";
import { Extrapolation, interpolate, runOnJS, runOnUI, SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFeedbackButtonStyle } from "./useFeedbackButtonStyle";
import { ButtonAnimConfig } from "./FeedbackBtn";
import { useState } from "react";
import { useTheme } from "@/shared/lib/theme/useTheme";

const AnimatedAppText = Animated.createAnimatedComponent(AppText);

interface TinderCardProps {
    cardId: string | number;
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
  cardId, 
  img,
  title,
  description, 
  style, 
  handleSwipeAction,
  enemyScale,
  activeSlide=true
}:TinderCardProps)
{
  const { theme } = useTheme();
  const styles = useStyles(s);
  const [imageLoaded, setImageLoaded] = useState(false);

  const likeAnimConfig : ButtonAnimConfig= {
    colorProgress: useSharedValue(0),
    scale: useSharedValue(1),
    glow: useSharedValue(0),
    opacity: useSharedValue(1),
  }

  const dislikeAnimConfig : ButtonAnimConfig= {
    colorProgress: useSharedValue(0),
    scale: useSharedValue(1),
    glow: useSharedValue(0),
    opacity: useSharedValue(1),
  }

  const likeAnimation = useFeedbackButtonStyle(likeAnimConfig, dislikeAnimConfig);
  const dislikeAnimation = useFeedbackButtonStyle(dislikeAnimConfig, likeAnimConfig);

  const offsetX = useSharedValue(0);
  const glow = useSharedValue(0);
  const glowColor = useSharedValue('none');

  const aStyle = useAnimatedStyle(() => {
      return {
        shadowColor: glowColor.value,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: glow.value * 0.8,
        shadowRadius: 6, // увеличиваем размытие
        elevation: 5 + glow.value * 10, // для Android
        transform: [
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
          if (!activeSlide) return;          
          offsetX.value = e.translationX;
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
            glowColor.value = 'none';
            glow.value = 0;
            if ( e.translationX > SWIPE_THRESHOLD ) {
              //Тут уже все, лайк, если пользователь отпустит карточку. то Назад пути нет
              glowColor.value = 'green';
              glow.value = 1;
            }
          } else if (e.translationX < 0) {
            dislikeAnimation.makeMeActiveWorklet();
            likeAnimation.returnToInitialStyleWorklet();
            glowColor.value = 'none';
            glow.value = 0;
            if ( e.translationX < -SWIPE_THRESHOLD ) {
              //Тут дизлайк
              glowColor.value = 'red';
              glow.value = 1;
            }
          }
        })
          .onEnd((e) => {
            'worklet';
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
          glowColor.value = 'none';
          glow.value = 0;
    });
    

  const likeHandler = () => {
    runOnUI(() => {
      'worklet';
      offsetX.value = withTiming(700, { duration: 700 });
      
      // Используем актуальную shared value через ref
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
    
    offsetX.value = withTiming(-700, { duration: 700 });
    
    // Проверяем, что enemyScale существует и его значение не 1
    if (enemyScale) {
      enemyScale.value = withTiming(1, { duration: 700 }, () => {
        runOnJS(handleSwipeAction)('dislike');
      });
    }
  })();
};

  const handleImageLoadEnd = () => {
    setImageLoaded(true);
  };


  //ТУТ Я ПЫТАЛСЯ менять размер текста согласна scale? но получается говно
  // const aTitleStyle = useAnimatedStyle(() => {
  //   let fz = styles.titleText.fontSize;
  //   if (enemyScale) {
  //     fz *= enemyScale.value;
  //   };
  //   return {
  //     fontSize: fz,
  //   }
  // })

  // const aDescriptioinStyle = useAnimatedStyle(() => {
  //   let fz = styles.descriptionText.fontSize;
  //   if (enemyScale) {
  //     fz *= enemyScale.value;
  //   };
  //   console.log('font size body - ' + fz);
  //   return {
  //     fontSize: fz,
  //   }
  // })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, style, aStyle, ]}
      >
        <ImageBackground
          key={cardId}
          source={img}
          style={styles.imageBg}
          resizeMode="cover"
          onLoadEnd={handleImageLoadEnd}
          // Устанавливаем imageLoaded в false при начале загрузки нового источника
          onLoadStart={() => setImageLoaded(false)} 
        >
          {!imageLoaded ? (
              <>
              <ActivityIndicator 
                size='large' 
                color={ theme.colors.primary }
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              />
              </>
            ) : (
              <>
                <Card style={styles.text}>
                  <AnimatedAppText 
                    //style={aTitleStyle}
                    size="subtitle" 
                    weight="bold">
                      {title}
                  </AnimatedAppText>
                  <AnimatedAppText
                    //style={aDescriptioinStyle}
                  >
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
                    onPress={likeHandler}
                    myAnimConfig={likeAnimConfig}
                    enemyAnimConfig={dislikeAnimConfig}
                    disabled={!activeSlide}
                  />
                </View>        
              </>
            )
          }
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
    transfrom: [
      {scale: 0.1}
    ],
  },
  // titleText: {
  //   fontSize: theme.typography.subtitle,
  // },
  // descriptionText: {
  //   fontSize: theme.typography.body,
  // },
  text: {
    gap: theme.spacing.sm,
  },
  feedbackBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))