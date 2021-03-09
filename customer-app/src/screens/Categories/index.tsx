import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Cart, Input, ScreenHeader } from '~/components';

import { ICategory, useCategories } from '~/hooks/categories';

import {
  Container,
  Content,
  InputBox,
  CategoriesList,
  Category,
  CategoryName,
  CategoryPicture,
} from './styles';
import { theme } from '~/styles';

export interface IFormattedCategory extends ICategory {
  empty?: boolean;
}

interface IRenderCategoryItemData {
  item: IFormattedCategory;
}

const NUM_COLUMNS = 3;

const Categories: React.FC = () => {
  const { navigate } = useNavigation();
  const { loadCategories, categories } = useCategories();

  const [filteredCategories, setFilteredCategories] = useState<
    ICategory[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadCategoriesData(): Promise<void> {
      try {
        await loadCategories();
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não foi possivel carregar a lista de categorias.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategoriesData();
  }, [loadCategories]);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      await loadCategories();
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel carregar a lista de categorias.'
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadCategories]);

  const handleSearch = useCallback(
    (text: string) => {
      const newCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredCategories(newCategories);
    },
    [categories]
  );

  const formatData = useCallback(
    (dataList: IFormattedCategory[], numColumns: number) => {
      const totalRows = Math.floor(dataList.length / numColumns);
      let totalLastRow = dataList.length - totalRows * numColumns;

      while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataList.push({
          id: String(Math.random() * 0.001),
          empty: true,
          name: 'blank',
          picture: null,
        });
        totalLastRow++;
      }

      return dataList;
    },
    []
  );

  const renderCategoryItem = useCallback(
    ({ item }: IRenderCategoryItemData) => {
      const { id, name, picture, empty } = item;

      if (empty) {
        return <Category style={{ backgroundColor: 'transparent' }} disabled />;
      }

      return (
        <Category onPress={() => navigate('Products', { categoryId: id })}>
          <CategoryPicture source={picture ? { uri: picture } : {}} />

          <CategoryName>{name}</CategoryName>
        </Category>
      );
    },
    []
  );

  const categoriesData = useMemo(() => {
    return filteredCategories ? filteredCategories : categories;
  }, [filteredCategories, categories]);

  return (
    <Container>
      <ScreenHeader title="Selecione uma categoria" />

      <Content>
        <InputBox>
          <Input
            name="search"
            startIcon="search"
            placeholder="Qual categoria você procura?"
            onChangeText={handleSearch}
          />
        </InputBox>

        {!loading && (
          <CategoriesList
            data={formatData(categoriesData, NUM_COLUMNS)}
            numColumns={NUM_COLUMNS}
            keyExtractor={(category) => category.id}
            renderItem={renderCategoryItem}
            refreshControl={
              <RefreshControl
                tintColor={theme.palette.primary}
                progressBackgroundColor="#fff"
                onRefresh={handleRefresh}
                refreshing={refreshing}
              />
            }
          />
        )}
      </Content>

      <Cart />
    </Container>
  );
};

export default Categories;
