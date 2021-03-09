import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, RefreshControl } from 'react-native';

import { Route, useNavigation, useRoute } from '@react-navigation/native';

import { Cart, Input, ProductDetailsModal, ScreenHeader } from '~/components';
import { IProductDetailsModalHandles } from '~/components/ProductDetailsModal';

import { IProduct, useProducts } from '~/hooks/products';

import {
  Container,
  Content,
  InputBox,
  BackButton,
  BackIcon,
  ProductsList,
  Product,
  ProductPicture,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductPictureContainer,
} from './styles';
import { theme } from '~/styles';

interface IRouteParams {
  categoryId: string;
}

interface IRenderProductItemData {
  item: IProduct;
}

const Products: React.FC = () => {
  const productDetailsModalRef = useRef<IProductDetailsModalHandles>(null);

  const { goBack } = useNavigation();
  const { params } = useRoute<Route<string, IRouteParams>>();
  const { loadProducts, products } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState<
    IProduct[] | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProductsByCategory(): Promise<void> {
      try {
        await loadProducts(params.categoryId);
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não foi possivel carregar a lista de categorias.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadProductsByCategory();
  }, [params, loadProducts]);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      await loadProducts(params.categoryId);
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel carregar a lista de categorias.'
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadProducts]);

  const handleSearch = useCallback(
    (text: string) => {
      const newProducts = products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredProducts(newProducts);
    },
    [products]
  );

  const renderProductItem = useCallback(({ item }: IRenderProductItemData) => {
    const { id, name, picture, formattedPrice, description } = item;

    return (
      <Product onPress={() => productDetailsModalRef.current?.openModal(id)}>
        <ProductPictureContainer>
          <ProductPicture source={{ uri: picture }} />
        </ProductPictureContainer>

        <ProductInfo>
          <ProductName>{name}</ProductName>

          <ProductDescription>{description}</ProductDescription>

          <ProductPrice>{formattedPrice}</ProductPrice>
        </ProductInfo>
      </Product>
    );
  }, []);

  const productsData = useMemo(() => {
    return filteredProducts ? filteredProducts : products;
  }, [filteredProducts, products]);

  return (
    <Container>
      <ScreenHeader
        title="Selecione um produto"
        headerLeft={
          <BackButton onPress={goBack}>
            <BackIcon />
          </BackButton>
        }
      />

      <Content>
        <InputBox>
          <Input
            name="search"
            startIcon="search"
            placeholder="Qual produto você procura?"
            onChangeText={handleSearch}
          />
        </InputBox>

        {!loading && (
          <ProductsList
            data={productsData}
            keyExtractor={(product) => product.id}
            renderItem={renderProductItem}
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

      <ProductDetailsModal ref={productDetailsModalRef} />
    </Container>
  );
};

export default Products;
