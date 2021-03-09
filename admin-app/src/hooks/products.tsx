import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '~/services';

import { formatCurrency } from '~/utils';

import { ICategory } from './categories';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ICategory;
  formattedPrice: string;
  picture: string | null;
  quantity: number;
}

interface ILoadProductByIdResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  picture: string | null;
  quantity: number;
}

export interface ICreateProductData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  picture: string | null;
  quantity: number;
}

export interface IUpdateProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  picture: string | null;
  quantity: number;
}

interface ProductsContextData {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  loadProducts(): Promise<IProduct[]>;
  loadProductById(productId: string): Promise<ILoadProductByIdResponse>;
  createProduct(data: ICreateProductData): Promise<void>;
  updateProduct(data: IUpdateProductData): Promise<void>;
  deleteProduct(productId: string): Promise<void>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const loadProducts = useCallback(async () => {
    const response = await api.get<IProduct[]>('products');

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

    return response.data;
  }, []);

  const createProduct = useCallback(async (data: ICreateProductData) => {
    const response = await api.post('products', data);

    const product = {
      ...response.data,
      formattedPrice: formatCurrency(response.data.price),
    };

    setProducts((prevState) => [...prevState, product]);
  }, []);

  const updateProduct = useCallback(
    async (data: IUpdateProductData) => {
      const { id, ...rest } = data;

      const response = await api.put(`products/${id}`, rest);

      const product = {
        ...response.data,
        formattedPrice: formatCurrency(response.data.price),
      };

      const newProducts = [...products];

      const findCategoryIndex = newProducts.findIndex(
        (newCategory) => newCategory.id === id
      );

      if (findCategoryIndex >= 0) {
        newProducts[findCategoryIndex] = product;

        setProducts(newProducts);
      }
    },
    [products]
  );

  const deleteProduct = useCallback(async (productId: string) => {
    await api.delete(`products/${productId}`);

    setProducts((prevState) =>
      prevState.filter((product) => product.id !== productId)
    );
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        loadProducts,
        createProduct,
        loadProductById,
        updateProduct,
        deleteProduct,
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
