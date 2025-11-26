import { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Slide } from './types';

interface UseOnboardingProps {
  slides: Slide[];
  cardWidth: number;
  finishHandler: () => void;
}

interface UseOnboardingReturn {
  imageFlatListRef: React.RefObject<any>;
  textFlatListRef: React.RefObject<any>;
  currentIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  goToSlide: (index: number) => void;
  onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onTextScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onImageScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

export const useOnboarding = ({
  slides,
  cardWidth,
  finishHandler,
}: UseOnboardingProps): UseOnboardingReturn => {

  const imageFlatListRef = useRef<FlatList>(null);
  const textFlatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slides.length - 1;

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
    
    setTimeout(() => {
      setCurrentIndex(index);
    }, 300); 
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

const goToPrevSlide = () => {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
};

  // 🔹 Обработчик завершения скролла
const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const contentOffset = event.nativeEvent.contentOffset.x;
  const viewSize = event.nativeEvent.layoutMeasurement.width;
  const newIndex = Math.round(contentOffset / viewSize);
  
  if (newIndex !== currentIndex) {
    setCurrentIndex(newIndex);
    textFlatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
  }
};

  // 🔹 Обработчик конца dragging
  const onScrollEndDrag = useCallback((
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    
    const newIndex = Math.round(contentOffset / viewSize);
    
    // Автоматически скроллим к ближайшему слайду
    if (newIndex !== currentIndex) {
      goToSlide(newIndex);
    }
  }, [currentIndex, goToSlide]);

// Только изображения управляют синхронизацией
const onImageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const contentOffset = event.nativeEvent.contentOffset.x;
  
  // Синхронизируем текст в реальном времени
  textFlatListRef.current?.scrollToOffset({
    offset: contentOffset, // ← передаем ТОЧНОЕ смещение, а не индекс
    animated: false, // ← БЕЗ анимации для мгновенной синхронизации
  });
  
  // Обновляем индекс для индикатора
  const viewSize = event.nativeEvent.layoutMeasurement.width;
  const newIndex = Math.round(contentOffset / viewSize);
  if (newIndex !== currentIndex) {
    setCurrentIndex(newIndex);
  }
};

// Текст только следует за изображениями (read-only)
// Текст управляет синхронизацией
const onTextScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const contentOffset = event.nativeEvent.contentOffset.x;
  
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
    goToPrevSlide,
    goToSlide,
    onMomentumScrollEnd,
    onScrollEndDrag,
    isFirstSlide,
    isLastSlide,
    onImageScroll,
    onTextScroll,
  };
}