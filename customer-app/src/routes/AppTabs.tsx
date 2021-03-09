import React from 'react';
import { Host } from 'react-native-portalize';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Orders, Profile } from '~/screens';

import { theme } from '~/styles';

import MenuStack from './MenuStack';

const { Navigator, Screen } = createBottomTabNavigator();

const AppTabs: React.FC = () => {
  return (
    <Host>
      <Navigator
        tabBarOptions={{
          labelPosition: 'beside-icon',
          allowFontScaling: true,
          inactiveTintColor: theme.palette.gray,
          activeTintColor: theme.palette.primary,
          style: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
          },
          labelStyle: {
            fontSize: 15,
            fontFamily: 'Montserrat_500Medium',
          },
        }}
      >
        <Screen
          name="MenuStack"
          component={MenuStack}
          options={{
            tabBarLabel: 'Menu',
            tabBarIcon: ({ color }) => (
              <Feather name="book-open" size={20} color={color} />
            ),
          }}
        />

        <Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({ color }) => (
              <Feather name="shopping-bag" size={20} color={color} />
            ),
          }}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={20} color={color} />
            ),
          }}
        />
      </Navigator>
    </Host>
  );
};

export default AppTabs;
