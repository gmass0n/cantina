import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '~/services';

import { formatCurrency } from '~/utils';

import { ICategory } from './categories';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ICategory;
  picture: string;
  formattedPrice: string;
}

interface ProductsContextData {
  products: IProduct[];
  loadProducts(categoryId?: string): Promise<IProduct[]>;
  loadProductById(productId: string): Promise<IProduct>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const loadProducts = useCallback(async (categoryId?: string) => {
    const response = await api.get<IProduct[]>('products', {
      params: {
        categoryId,
      },
    });

    const formattedProducts = response.data.map((product) => {
      return {
        ...product,
        formattedPrice: formatCurrency(product.price),
      };
    });

    setProducts(formattedProducts);

    return formattedProducts;
  }, []);

  const loadProductById = useCallback(async (productId: string) => {
    const response = await api.get(`products/${productId}`);

    const product = response.data;

    return {
      ...product,
      formattedPrice: formatCurrency(product.price),
    };
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        loadProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  return context;
}

export { ProductsProvider, useProducts };
