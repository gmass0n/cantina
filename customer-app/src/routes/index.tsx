import React from 'react';

import { AppLoading } from 'expo';

import { useAuth } from '~/hooks/auth';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

const Routes: React.FC = () => {
  const { customer, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return customer ? <AppTabs /> : <AuthStack />;
};

export default Routes;
