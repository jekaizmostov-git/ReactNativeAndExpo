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
      //console.log('like_Action')
     //likedId.current.push(slidesRef.current[currentIndex].id); // для того чтобы дальше передать в контекст, что нравится пользователю
    } else {
      //console.log('dislike_action');
    }
    setCurrentIndex(prev => {
      return prev + 1;
    });
  };

  //на данном этапе не скелится только главная карточка, у которой zIndex больше. все остальные скелятся. То есть пользователь тянет верхнюю карточку, с индексом 0, а скелятся все 1-до конца массива
  const enemyScale = useSharedValue(0.95);

  //чтобы работали кнопки каждый раз обновляем
  useFocusEffect(() => {
    enemyScale.value = 0.95;
  })


  useFocusEffect(() => {
    if (slidesRef.current.length - currentIndex === 3 ){
      console.log('Дозагрузка');
      loadMore();
    }
  })

  console.log(slidesRef.current.length);
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
          //не понимаю зачем отображать до конда массива если каждый раз мап заново отрисовывается. пробую 3 элемента
          //тут мне нужно объяснение почему весь доступный массив рендерим
          .slice(currentIndex, slidesRef.current.length)
          //.slice(currentIndex, currentIndex+3)
            .map((slide, index) => {
              const absoluteIndex = currentIndex + index;
              const zIndex = absoluteIndex * -1;
              const isActive = index === 0;
              //тут крутил до размера  slidesRef.current.length = 100 ничего не вылетает, все норм
              console.log(`${slide.title} - zIndex = ${zIndex}`);
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