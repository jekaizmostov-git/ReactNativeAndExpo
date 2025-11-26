import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/RootNavigator';
import { View } from 'react-native';
import { Card } from '@/shared/ui/Card';
import { HightLightText } from '@/shared/ui/HightLightText';
import { AppText } from '@/shared/ui/Text';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { useTheme } from '@/shared/lib/theme/useTheme';
import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { Button } from '@/shared/ui/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen = ({ route, navigation }: Props) => {
  const styles = useStyles(s);
  const {toggleTheme} = useTheme();
  return (
    <View style={styles.container}>
           <HightLightText  
             size="title"
             weight="bold"
             title="Главная страница" 
             highlight="Главная"
           />
          <Card>
            <AppText>Поздравляю с написанием онбординга</AppText>
          </Card>
    
           <Button title="Переключить тему" onPress={toggleTheme} />
        </View>
  );
};

const s = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    backgroundColor: theme.colors.bg,
  },
}))