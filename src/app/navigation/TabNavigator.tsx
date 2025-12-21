import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabConfig } from '@/widgets/BottomTabBar/tabConfig';
import { HomeScreen } from '@/pages/Home';
import  Test  from './Test';

import { Text, View } from 'react-native';

export type TabParamList = {
  Home: undefined;
  Projects: undefined;
  Profile: undefined;
}

import { CustomTabBar } from '@/widgets/BottomTabBar/CustomTabBar';

export const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ 
        animation: 'shift',        
        headerShown: false 
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel:  tabConfig.Home.label, 
        }}
      />
      <Tab.Screen 
        name="Projects" 
        component={Projects}
        options={{
          tabBarLabel:  tabConfig.Projects.label, 
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarLabel:  tabConfig.Profile.label, 
        }}
      />
    </Tab.Navigator>
  );
}

function Projects(){
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Hello Projects</Text>
    </View>
  )
}

function Profile(){
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Hello Profile</Text>
    </View>
  )
}
