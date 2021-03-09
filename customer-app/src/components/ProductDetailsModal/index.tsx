import React, {
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { useCart } from '~/hooks/cart';
import { IProduct, useProducts } from '~/hooks/products';

import { theme } from '~/styles';

import Button from '../Button';
import ModalHeader from '../ModalHeader';

import {
  Content,
  ProductContainer,
  ProductPictureContainer,
  ProductPicture,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  QuantityContainer,
  QuantityButton,
  QuantityIcon,
  QuantityText,
  ButtonsContainer,
} from './styles';

export interface IProductDetailsModalHandles {
  openModal(productId: string): Promise<void>;
}

const ProductDetailsModal: React.ForwardRefRenderFunction<IProductDetailsModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);

  const { loadProductById } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | undefined>();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      if (productId) {
        try {
          const response = await loadProductById(productId);

          setProduct(response);

          if (response.quantity === 0) {
            setQuantity(0);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    }

    loadProduct();
  }, [loadProductById, productId]);

  const openModal = useCallback(async (id: string) => {
    modalRef.current?.open();

    setProductId(id);
  }, []);

  const handleIncrementQuantity = useCallback(() => {
    setQuantity((prevState) => prevState + 1);
  }, []);

  const handleDecrementQuantity = useCallback(() => {
    setQuantity((prevState) => prevState - 1);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart({
        product,
        quantity,
      });

      modalRef.current?.close();
    }
  }, [product, quantity, addToCart]);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  if (!product) {
    return null;
  }

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        HeaderComponent={
          <ModalHeader
            title="Detalhes do produto"
            onClose={() => modalRef.current?.close()}
          />
        }
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
      >
        <Content>
          <ProductContainer>
            <ProductPictureContainer>
              <ProductPicture source={{ uri: product.picture }} />
            </ProductPictureContainer>

            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>

              <ProductDescription>{product.description}</ProductDescription>

              <ProductPrice>{product.formattedPrice}</ProductPrice>
            </ProductInfo>
          </ProductContainer>

          <ButtonsContainer>
            <QuantityContainer>
              <QuantityButton
                disabled={quantity === 0}
                onPress={handleDecrementQuantity}
              >
                <QuantityIcon name="minus" />
              </QuantityButton>

              <QuantityText>{quantity}</QuantityText>

              <QuantityButton
                onPress={handleIncrementQuantity}
                disabled={quantity === product.quantity}
              >
                <QuantityIcon name="plus" />
              </QuantityButton>
            </QuantityContainer>

            <Button
              title="Adicionar a sacola"
              backgroundColor={theme.palette.green}
              textColor="#fff"
              disabled={quantity === 0}
              onPress={handleAddToCart}
            />
          </ButtonsContainer>
        </Content>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(ProductDetailsModal);
