import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '~/hooks/auth';
import { useCategories } from '~/hooks/categories';
import { useProducts } from '~/hooks/products';

import {
  Input,
  AddCategoryModal,
  ScreenHeader,
  ProductsList,
  CategoriesList,
} from '~/components';
import { IAddCategoryModalHandles } from '~/components/AddCategoryModal';
import AddProductModal, {
  IAddProductModalHandles,
} from '~/components/AddProductModal';

import { logo } from '~/assets';

import {
  Container,
  HeaderLeft,
  LogoImg,
  HeaderLeftSeparator,
  HeaderLeftText,
  SignOutButton,
  SignOutIcon,
  Content,
  InputBox,
  ListHeader,
  ListHeaderTitle,
  AddNewButton,
  AddNewIcon,
  RefreshButton,
  RefreshIcon,
} from './styles';

const Home: React.FC = () => {
  const addCategoryModalRef = useRef<IAddCategoryModalHandles>(null);
  const addProductModalRef = useRef<IAddProductModalHandles>(null);

  const { signOut } = useAuth();
  const { loadCategories, categories } = useCategories();
  const { loadProducts, products } = useProducts();

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    async function loadCategoriesList(): Promise<void> {
      try {
        await loadCategories();
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não conseguimos carregar a lista de categories, verifique sua conexão e tente novamente.'
        );
      } finally {
        setCategoriesLoading(false);
      }
    }

    loadCategoriesList();
  }, [loadCategories]);

  useEffect(() => {
    async function loadProductsList(): Promise<void> {
      try {
        await loadProducts();
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não conseguimos carregar a lista de produtos, verifique sua conexão e tente novamente.'
        );
      } finally {
        setProductsLoading(false);
      }
    }

    loadProductsList();
  }, [loadProducts]);

  const handleRefreshCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);

      await loadCategories();
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos carregar a lista de categories, verifique sua conexão e tente novamente.'
      );
    } finally {
      setCategoriesLoading(false);
    }
  }, [loadCategories]);

  const handleRefreshProducts = useCallback(async () => {
    try {
      setProductsLoading(true);

      await loadProducts();
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos carregar a lista de produtos, verifique sua conexão e tente novamente.'
      );
    } finally {
      setProductsLoading(false);
    }
  }, [loadProducts]);

  return (
    <Container>
      <ScreenHeader
        headerLeft={
          <HeaderLeft>
            <LogoImg source={logo} resizeMode="contain" />

            <HeaderLeftSeparator />

            <HeaderLeftText>Olá,{'\n'}seja bem vindo!</HeaderLeftText>
          </HeaderLeft>
        }
        headerRight={
          <SignOutButton onPress={signOut}>
            <SignOutIcon />
          </SignOutButton>
        }
      />

      <Content>
        <InputBox>
          <Input
            name="search"
            startIcon="search"
            placeholder="Qual produto você procura?"
          />
        </InputBox>

        <CategoriesList
          loading={categoriesLoading}
          categories={categories}
          ListHeader={
            <ListHeader>
              <ListHeaderTitle>Categorias</ListHeaderTitle>

              <RefreshButton onPress={handleRefreshCategories}>
                <RefreshIcon />
              </RefreshButton>

              <AddNewButton
                onPress={() => addCategoryModalRef.current?.openModal()}
              >
                <AddNewIcon />
              </AddNewButton>
            </ListHeader>
          }
        />

        <ProductsList
          loading={productsLoading}
          products={products}
          ListHeader={
            <ListHeader>
              <ListHeaderTitle>Produtos</ListHeaderTitle>

              <RefreshButton onPress={handleRefreshProducts}>
                <RefreshIcon />
              </RefreshButton>

              <AddNewButton
                onPress={() => addProductModalRef.current?.openModal()}
              >
                <AddNewIcon />
              </AddNewButton>
            </ListHeader>
          }
        />
      </Content>

      <AddCategoryModal ref={addCategoryModalRef} />
      <AddProductModal ref={addProductModalRef} />
    </Container>
  );
};

export default Home;
