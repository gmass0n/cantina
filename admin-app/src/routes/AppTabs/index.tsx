import React from 'react';
import { Host } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Profile, Orders } from '~/screens';

import { theme } from '~/styles';

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
            height: hp('5.6%'),
          },
          labelStyle: {
            fontSize: hp('1.58%'),
            fontFamily: 'Montserrat_500Medium',
          },
        }}
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={hp('2%')} color={color} />
            ),
          }}
        />

        <Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({ color }) => (
              <Feather name="shopping-bag" size={hp('2%')} color={color} />
            ),
          }}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={hp('2%')} color={color} />
            ),
          }}
        />
      </Navigator>
    </Host>
  );
};

export default AppTabs;
