import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '@/app/navigation/RootNavigator';

import { 
  TouchableOpacity, 
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

import { BottomCard } from '@/shared/ui/BottomCard'
import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";
import { Button } from '@/shared/ui/Button'
import { Ionicons } from "@expo/vector-icons";
import { TinderCard } from "@/features/tinderLike/TinderCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSlides } from "@/features/tinderLike/useSlides";
import { useTheme } from "@/shared/lib/theme/useTheme";
import { preloadImage } from "@/shared/lib/preloadImage/preloadImage";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";


type Props = NativeStackScreenProps<RootStackParamList, 'TinderLike'>


export function TinderLikePage({route, navigation}: Props) {
  const styles = useStyles(s);
  const {theme} = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);


  const likedId = useRef<number[]>([]);


  const scale = useSharedValue(0.95);

   useEffect(() => {
    // Сбрасываем значение к 0.95 при каждом ререндере
    scale.value = 0.95;
  }, [currentIndex]);

  const overlayCardAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${scale.value * 100}%`,
      height: `${scale.value * 100}%`,
    };
  })

  const {loadMore, slidesRef} = useSlides(firstLoading);

  const initLoading = async () => {
    await loadMore(); 
    if (firstLoading) {
        setFirstLoading(false);
    }
  }

  useEffect(() => {
    if (slidesRef.current.length === 0 ) {
      initLoading();
    }
  }, [])


  const currentCardData = slidesRef.current[currentIndex];
  const nextCardData = slidesRef.current[currentIndex + 1];

  const shouldLoadMore = useCallback(() => {
    return slidesRef.current.length - currentIndex === 3;
  }, [currentIndex, slidesRef.current.length]);

  const handleSwipeAction = (action: 'like'|'dislike') => {
    if (action === 'like'){
     likedId.current.push(slidesRef.current[currentIndex].id);
    } else {
      console.log('dislike');
    }
    setCurrentIndex(prevIndex => prevIndex + 1)
  };


  useEffect(() => {
    if (shouldLoadMore()) {
      console.log('Дозагрузка!');
      loadMore();
    }
  }, [currentIndex, shouldLoadMore, loadMore]);


  useEffect(() => {
    //Костыль
    preloadImage(slidesRef.current.map(s => s.img));
  }, [slidesRef.current.length])

  return (
    <View style={styles.screen}>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {navigation.goBack()}}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
         <Ionicons 
              name="close" 
              size={24} 
              color='#ccc'
          />
      </TouchableOpacity>
      <View style={styles.overlayContainer}>
        {
          (firstLoading) ? (
            <ActivityIndicator 
              size='large'
              color={theme.colors.primary}
            />
          ) : (
            <>
            {/* //Карточка которая под главной! */}
            <TinderCard 
              key={nextCardData.id}
              cardId={nextCardData.id}
              title={nextCardData.title}
              description={nextCardData.description}
              img={nextCardData.img}
              activeSlide={false}
              handleSwipeAction={handleSwipeAction}
              style={[styles.overlayCard, overlayCardAnimStyle]}
            />
              {/* Карточка, которую видно */}
              <TinderCard
                  key={currentCardData.id} 
                  cardId={currentCardData.id}
                  title={currentCardData.title}
                  description={currentCardData.description}
                  img={currentCardData.img}
                  activeSlide={true}
                  enemyScale={scale}
                  handleSwipeAction={handleSwipeAction}
              /> 
            </>       
          ) 
        }
      </View>
    </SafeAreaView>
    <BottomCard style={styles.bottomCard}>
      <Button 
        disabled={likedId.current.length < 5} 
        title={(likedId.current.length < 5)?`Выберете еще ${5-likedId.current.length} стилей(я)`:'Продолжить'} 
        onPress={() => {likedId.current.forEach(f => console.log(f))}}/>
    </BottomCard>
    </View>
  )
}

const s = makeStyles((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  bottomCard: {
    paddingBottom: 50,
    paddingTop: 30,
  },
  overlayContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayCard: {
    position: 'absolute',
  }
}))