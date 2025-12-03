import React from 'react';

import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabBarAnimIcon } from './TabBarAnimIcon';
import { TabBarAnimLabel } from './TabBarAnimLabel';
import { tabConfig, TabRoute } from './tabConfig';
import { useTheme } from '@/shared/lib/theme/useTheme';


export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: theme.colors.bg,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      height: 60 + insets.bottom,
      paddingBottom: insets.bottom,
      paddingTop: 8,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index

        const routeName = route.name as TabRoute;
        const tab = tabConfig[routeName];
        const label = tab.label;
        const iconName = isFocused ? tab.icon.active : tab.icon.inactive;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
            }}
          >
            <TabBarAnimIcon 
              name={iconName} 
              focused={isFocused} 
              size={24} 
            />
            <TabBarAnimLabel focused={isFocused}>
              {label}
            </TabBarAnimLabel>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

