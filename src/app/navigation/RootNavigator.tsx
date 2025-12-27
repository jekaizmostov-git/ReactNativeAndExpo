import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreAuthPage } from '@/pages/PreAuthPage';
import { TabNavigator } from './TabNavigator';
import { NewProjectPage } from '@/pages/NewProjectPage';
import { TinderV2 } from '@/pages/tinderLikePage';
import { Slide } from '@/features/tinderLike/types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  MainTabs: undefined;
  PreAuth: undefined;
  NewProject: undefined;
  TinderLike: {firstSlides: Slide[]};
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
        headerShadowVisible: false, //убирает линию между хедер и экраном
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
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '',
          headerLeft: () => {
            return (
              <>
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
              </>
            )            
          }
        })}
         name="TinderLike" 
         component={TinderV2} 
        />
    </Stack.Navigator>
  );
};