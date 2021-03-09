import React from 'react';

import { AppLoading } from 'expo';

import { useAuth } from '~/hooks/auth';

import AppTabs from './AppTabs';
import AuthStack from './AuthStack';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return user ? <AppTabs /> : <AuthStack />;
};

export default Routes;
