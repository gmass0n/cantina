import React, { useRef } from 'react';

import { IProduct } from '~/hooks/products';

import ListEmpty from '../ListEmpty';
import UpdateProductModal, {
  IUpdateProductModalHandles,
} from '../UpdateProductModal';
import {
  Container,
  LoadingContainer,
  LoadingSkeleton,
  Products,
  Product,
  ProductPicture,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductPictureContainer,
} from './styles';

interface IProps {
  products: IProduct[];
  ListHeader?: JSX.Element;
  loading?: boolean;
}

const ProductsList: React.FC<IProps> = ({ products, ListHeader, loading }) => {
  const updateProductModalRef = useRef<IUpdateProductModalHandles>(null);

  return (
    <Container>
      {!!ListHeader && ListHeader}

      {loading ? (
        <LoadingContainer>
          <LoadingSkeleton />

          <LoadingSkeleton />

          <LoadingSkeleton />
        </LoadingContainer>
      ) : (
        <Products
          data={products}
          keyExtractor={(product) => product.id}
          ListEmptyComponent={
            <ListEmpty content="Você não adicionou nenhum produto." />
          }
          renderItem={({ item: product }) => (
            <Product
              onPress={() =>
                updateProductModalRef.current?.openModal(product.id)
              }
            >
              <ProductPictureContainer>
                {product.picture && (
                  <ProductPicture source={{ uri: product.picture }} />
                )}
              </ProductPictureContainer>

              <ProductInfo>
                <ProductName>{product.name}</ProductName>

                <ProductDescription>{product.description}</ProductDescription>

                <ProductPrice>{product.formattedPrice}</ProductPrice>
              </ProductInfo>
            </Product>
          )}
        />
      )}

      <UpdateProductModal ref={updateProductModalRef} />
    </Container>
  );
};

export default ProductsList;
