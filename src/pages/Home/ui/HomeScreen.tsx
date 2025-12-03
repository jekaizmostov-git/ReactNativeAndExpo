import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '@/app/navigation/TabNavigator';

import { View, Image } from 'react-native';
import { Button } from '@/shared/ui/Button';
import { HightLightText } from '@/shared/ui/HightLightText';
import { AppText } from '@/shared/ui/Text';

import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { useTheme } from '@/shared/lib/theme/useTheme';

type Props = NativeStackScreenProps<TabParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {

  const { toggleTheme, theme } = useTheme();
  const styles = useStyles(s);
  return (
    <View style={styles.container}>
      <View style={styles.themeButtonContainer}>
        <Button 
          title={theme.name === 'light' ? '🌙' : '☀️'} 
          onPress={ toggleTheme }
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/shared/assets/home/home.png')} 
          style={styles.image}
          resizeMode="contain"
        /> 
      </View>
      
      <View style={styles.card}>
        <HightLightText
          size='subtitle' 
          weight='bold'
          title="Создадим интерьр в стиле джапанди?"
          highlight='джапанди?'
        />
        <AppText>Готовый дизай за пару минут</AppText>
        <Button title='Начать' onPress={()=>{console.log('Start button clicked')}}/>
      </View>
    </View>
  );
};

const s = makeStyles((theme) => ({
  container: {
    flex: 1,    
    justifyContent: 'space-between',
    backgroundColor: theme.colors.bg,
  },
  themeButtonContainer: {
    position: 'absolute',
    top: 50, // или useSafeAreaInsets().top + 10
    right: 20,
    zIndex: 10,
  },
  card: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.bg,
    borderTopRightRadius: theme.radius.lg,
    borderTopLeftRadius: theme.radius.lg,
    gap: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
  },
}));


