import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/shared/ui/Text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/RootNavigator';
import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { Card } from '@/shared/ui/Card';
import { useTheme } from '@/shared/lib/theme/useTheme';
import { Button } from '@/shared/ui/Button'
import { Ionicons } from '@expo/vector-icons';
import { Slides } from '@/features/tinderLike/slides';
import { preloadImage } from '@/shared/lib/preloadImage/preloadImage';
import { useSlides } from '@/features/tinderLike/useSlides';
import { useFocusEffect } from '@react-navigation/native';


type Props = NativeStackScreenProps<RootStackParamList, "NewProject">;

const TINDER_IMAGES = Slides.filter(slide => slide.id < 7).map(slide => slide.img);

export function NewProjectPage ({navigation}:Props) {
  const styles = useStyles(s);
  const {theme, toggleTheme} = useTheme();
  
  //Этот кусок кода загружает первую пачку слайдов до перехода на экран с тиндером!
  //и передает их через route.params
  const { loadFirstSlides, slidesRef } = useSlides();

  const preloadTinderCards = async () => {
    await loadFirstSlides();
    preloadImage(TINDER_IMAGES);
    console.log('Слайды с карточками загружены и готовы к переходу на след экран!');
  }

  useFocusEffect(() => {
    if (slidesRef.current.length == 0){
      preloadTinderCards();
    }
  });

  function goToTinderLike(){
    try {
      if (slidesRef.current.length != 0 )
      navigation.navigate('TinderLike', {firstSlides: slidesRef.current});
    } catch (error) {
      console.error('Ошибка при переходе на страницу с тиндером!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backAndThemeBar}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
              name="chevron-back" 
              size={24} 
              color={theme.colors.notActive} 
            />
        </TouchableOpacity>
        <Button 
          title={theme.name === 'light' ? '🌙' : '☀️'} 
          onPress={ toggleTheme }
        />
      </View>
  
      <View style={styles.description}>
        <AppText size="title" weight='bold'>Новый проект</AppText>
        <AppText>Выбере способ, которым вам будет удобней загрузить помещение</AppText>
      </View>
      <View style={styles.cards}>
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={goToTinderLike}
      >
        <Card style={styles.card}>
          <View style={styles.cardImage}>

          </View>
          <View style={styles.cardText}>
            <AppText size="subtitle" weight='bold'>Сканировать</AppText>
            <AppText>Оцифровать помещение с помощью LIDAR</AppText>
          </View>

        </Card>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Card style={styles.card}>
          <View style={styles.cardImage}>

          </View>
          <View style={styles.cardText}>
            <AppText size="subtitle" weight='bold'>Загурзить план</AppText>
            <AppText>Загрузить изображение или фотографию планировки </AppText>      
          </View>
        </Card>
      </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} disabled>
          <Card style={[styles.card, styles.cardInProgress]}>
            <View style={styles.cardImage}>

            </View>
            <View style={styles.cardText}>
              <AppText size="subtitle" weight='bold'>Загурзить фото</AppText>
              <AppText>Появится совсем скоро</AppText>      
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

const s = makeStyles( (theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.bg,
    gap: 30,
  },
  backAndThemeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton:{
    alignSelf: 'center',
  },
  description: {
    gap: 10,
  },
  cards: {
    gap: 15,
  },
  card: {
    gap: 10,
    flexDirection: 'row',
  },
  cardText: {
    flex: 1,
    minWidth: 0,
    gap: 5,
  },
  cardImage: {
    alignSelf: 'center',
    backgroundColor: '#ccc',
    borderRadius: theme.radius.md,
    width: 70,
    height: 70,
  },
  cardInProgress: {
    opacity: 0.4
  }
}))