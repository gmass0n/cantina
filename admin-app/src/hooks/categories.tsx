import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '~/services';

import { useProducts } from './products';

export interface ICategory {
  name: string;
  id: string;
  picture: string | null;
}

export interface ICreateCategoryData {
  name: string;
  picture: string | null;
}

interface IUpdateCategoryData {
  name: string;
  id: string;
  picture: string | null;
}

interface CategoriesContextData {
  categories: ICategory[];
  loadCategories(): Promise<ICategory[]>;
  loadCategoryById(categoryId: string): Promise<ICategory>;
  createCategory(data: ICreateCategoryData): Promise<void>;
  updateCategory(data: IUpdateCategoryData): Promise<void>;
  deleteCategory(categoryId: string): Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData
);

const CategoriesProvider: React.FC = ({ children }) => {
  const { setProducts, loadProducts } = useProducts();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const loadCategories = useCallback(async () => {
    const response = await api.get('categories');

    setCategories(response.data);

    return response.data;
  }, []);

  const loadCategoryById = useCallback(async (categoryId: string) => {
    const response = await api.get(`categories/${categoryId}`);

    return response.data;
  }, []);

  const createCategory = useCallback(async (data: ICreateCategoryData) => {
    const response = await api.post('categories', data);

    setCategories((prevState) => [...prevState, response.data]);
  }, []);

  const updateCategory = useCallback(
    async (data: IUpdateCategoryData) => {
      const { id, ...rest } = data;

      const response = await api.put(`categories/${id}`, rest);

      const newCategories = [...categories];

      const findCategoryIndex = newCategories.findIndex(
        (newCategory) => newCategory.id === id
      );

      if (findCategoryIndex >= 0) {
        newCategories[findCategoryIndex] = response.data;

        setCategories(newCategories);
      }
    },
    [categories]
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      const products = await loadProducts();

      await api.delete(`categories/${categoryId}`);

      setCategories((prevState) =>
        prevState.filter((category) => category.id !== categoryId)
      );

      setProducts(
        products.filter((product) => product.category.id !== categoryId)
      );
    },
    [loadProducts, setProducts]
  );

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadCategories,
        createCategory,
        loadCategoryById,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

function useCategories(): CategoriesContextData {
  const context = useContext(CategoriesContext);

  return context;
}

export { CategoriesProvider, useCategories };
