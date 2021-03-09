import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Categories, Products } from '~/screens';

const { Navigator, Screen } = createStackNavigator();

const MenuStack: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="Categories" component={Categories} />

      <Screen name="Products" component={Products} />
    </Navigator>
  );
};

export default MenuStack;
