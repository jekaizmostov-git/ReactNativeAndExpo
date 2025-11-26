import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/pages/Home';
import { ProfileScreen } from '@/pages/Profile';

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId?: string };
};
  
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};