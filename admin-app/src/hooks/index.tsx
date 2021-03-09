import React from 'react';

import { ThemeProvider } from 'styled-components';

import { theme } from '~/styles';

import { AuthProvider } from './auth';
import { CategoriesProvider } from './categories';
import { OrdersProvider } from './orders';
import { ProductsProvider } from './products';
import { ProfileProvider } from './profile';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ProductsProvider>
          <CategoriesProvider>
            <OrdersProvider>
              <ProfileProvider>{children}</ProfileProvider>
            </OrdersProvider>
          </CategoriesProvider>
        </ProductsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
