import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreAuthPage } from '@/pages/PreAuthPage';
import { TabNavigator } from './TabNavigator';
import { NewProjectPage } from '@/pages/NewProjectPage';

export type RootStackParamList = {
  MainTabs: undefined;
  PreAuth: undefined;
  NewProject: undefined;
};
  
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='PreAuth'
      screenOptions={{ 
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
      

    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <Stack.Screen 
        name="PreAuth" 
        component={PreAuthPage} 
        options={{
          animation: 'slide_from_bottom',
          animationDuration: 400,
        }}
      />
      <Stack.Screen name="NewProject" component={NewProjectPage} />
    </Stack.Navigator>
  );
};