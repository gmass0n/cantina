import React from 'react';

import { ThemeProvider } from 'styled-components';

import { theme } from '~/styles';

import { AuthProvider } from './auth';
import { ProfileProvider } from './profile';
import { CategoriesProvider } from './categories';
import { ProductsProvider } from './products';
import { CartProvider } from './cart';
import { OrdersProvider } from './orders';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <CategoriesProvider>
              <ProductsProvider>
                <ProfileProvider>{children}</ProfileProvider>
              </ProductsProvider>
            </CategoriesProvider>
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
