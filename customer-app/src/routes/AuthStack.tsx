import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/screens';

const { Navigator, Screen } = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="SignIn" component={SignIn} />

      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};

export default AuthStack;
