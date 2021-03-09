import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '~/screens';

const { Navigator, Screen } = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};

export default AuthStack;
