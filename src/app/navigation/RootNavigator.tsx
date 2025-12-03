import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreAuthPage } from '@/pages/PreAuthPage';
import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  MainTabs: undefined;
  PreAuth: undefined;
};
  
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='PreAuth'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="PreAuth" component={PreAuthPage} />
    </Stack.Navigator>
  );
};