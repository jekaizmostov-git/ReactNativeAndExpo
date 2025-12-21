import { useState, useRef} from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Slide } from './types';

import { SharedValue} from 'react-native-reanimated';

interface UseOnboardingProps {
  slides: Slide[];
  finishHandler: () => void;
  scrollX: SharedValue<number>;
}

interface UseOnboardingReturn {
  imageFlatListRef: React.RefObject<any>;
  textFlatListRef: React.RefObject<any>;
  currentIndex: number;
  goToNextSlide: () => void;
  onTextScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const useOnboarding = ({
  slides,
  finishHandler,
  scrollX,
}: UseOnboardingProps): UseOnboardingReturn => {

  const imageFlatListRef = useRef<FlatList>(null);
  const textFlatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


// Обработчик завершения анимации скролла
const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const contentOffsetX = event.nativeEvent.contentOffset.x;
  const viewWidth = event.nativeEvent.layoutMeasurement.width;
  const newIndex = Math.round(contentOffsetX / viewWidth);
  setCurrentIndex(newIndex);
};

const goToSlide = (index: number) => {
  if (index >= 0 && index < slides.length) {
    // Главный FlatList (текст) - скроллим с анимацией
    textFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    
    // Ведомый FlatList (изображения) - тоже с анимацией
    imageFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }
};

const goToNextSlide = () => {
  if (currentIndex < slides.length - 1) {
    goToSlide(currentIndex + 1);
  } else {
    // Действие при завершении онбординга
    finishHandler();
  }
};

// Текст управляет синхронизацией
const onTextScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

  const contentOffset = event.nativeEvent.contentOffset.x;

  //для анимации useSharedValue
  scrollX.value = contentOffset;
  
  // Синхронизируем изображения
  imageFlatListRef.current?.scrollToOffset({
    offset: contentOffset,
    animated: false, // мгновенно
  });
  
  // Обновляем индекс
  const viewSize = event.nativeEvent.layoutMeasurement.width;
  const newIndex = Math.round(contentOffset / viewSize);
  if (newIndex !== currentIndex) {
    setCurrentIndex(newIndex);
  }
};


  return {
    imageFlatListRef,
    textFlatListRef,
    currentIndex,
    goToNextSlide,
    onTextScroll,
    handleMomentumScrollEnd,
  };
}

