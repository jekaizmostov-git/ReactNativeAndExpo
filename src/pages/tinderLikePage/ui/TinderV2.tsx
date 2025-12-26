import { RootStackParamList } from '@/app/navigation/RootNavigator';
import { TinderCard } from '@/features/tinderLike/TinderCard';
import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { BottomCard } from '@/shared/ui/BottomCard';
import { Button } from '@/shared/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';

import { useSlides } from '@/features/tinderLike/useSlides';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, 'TinderLike'>

export function TinderV2({navigation, route}:Props){
  const styles = useStyles(s);
  const {loadMore, slidesRef} = useSlides();

  //Пришла пачка с предыдущего экрана!
  if (slidesRef.current.length === 0) {
    slidesRef.current = route.params.firstSlides;
  }

  // //Проверка пачка с пред экрана (все отлично работает, пока не удаляем)
  // useFocusEffect(() => {
  //   if (slidesRef.current.length != 0){
  //     console.log('Просмотр того, что пришло через route params: ');
  //     slidesRef.current.forEach(s => console.log(s.title));
  //   }}
  // )

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeAction = (action: 'like'|'dislike') => {
    if (action === 'like'){
      console.log('like_Action')
     //likedId.current.push(slidesRef.current[currentIndex].id); // для того чтобы дальше передать в контекст, что нравится пользователю
    } else {
      console.log('dislike_action');
    }
   setCurrentIndex(prev => prev + 1);
  };

  //на данном этапе не скелится только главная карточка, у которой zIndex больше. все остальные скелятся. То есть пользователь тянет верхнюю карточку, с индексом 0, а скелятся все 1-до конца массива
  const enemyScale = useSharedValue(0.95);

  //чтобы работали кнопки каждый раз обновляем
  useFocusEffect(() => {
    enemyScale.value = 0.95;
  })

  return (
    <View style={styles.screen}>
    <SafeAreaView style={styles.container}>

      {/* эту шляпу потом закину в навигатор в хедер */}
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
      <View style={styles.tinderContainder}>
        {
          slidesRef.current.length != 0 && slidesRef.current
          .slice(currentIndex % 7, slidesRef.current.length)
            .map((slide, index) => {
              const absoluteIndex = (currentIndex % 7 + index);
              const isActive = index === 0;
              const zIndex = absoluteIndex * -1;
              return (
                <TinderCard 
                  key={`card-${slide.id}-${absoluteIndex}`}
                  title={slide.title} 
                  description={slide.description} 
                  img={slide.img}
                  style={[styles.card, {zIndex: zIndex}]} 
                  activeSlide={isActive}     
                  handleSwipeAction={handleSwipeAction}
                  //Проверка, чтобы главный слайд был scale = 1, непосредственно в компоненте
                  enemyScale={enemyScale}
                /> 
              )
            })
        }
      </View>
    </SafeAreaView>
    <BottomCard style={styles.bottomCard}>
      <Button 
        disabled={true} 
        title='Продолжить'
        onPress={() => {console.log('Кнопка продолжить...')}}/>
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
    marginVertical: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  bottomCard: {
    paddingBottom: 50,
    paddingTop: 30,
  },
  tinderContainder: {
    flex: 1,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
  },
}))