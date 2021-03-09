import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '~/services';

export interface ICategory {
  name: string;
  id: string;
  picture: string | null;
}

interface CategoriesContextData {
  categories: ICategory[];
  loadCategories(): Promise<ICategory[]>;
  loadCategoryById(categoryId: string): Promise<ICategory>;
}

const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData
);

const CategoriesProvider: React.FC = ({ children }) => {
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

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadCategories,
        loadCategoryById,
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
