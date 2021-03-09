import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { Feather } from '@expo/vector-icons';

import { useCart, ICartProduct } from '~/hooks/cart';

import ModalHeader from '../ModalHeader';
import Button from '../Button';

import {
  Container,
  CartIcon,
  CartBadge,
  CartBadgeText,
  CartTitle,
  CartTotal,
  ProductsList,
  Product,
  ProductPictureContainer,
  ProductPicture,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  QuantityBadge,
  QuantityText,
  PaymentWayContainer,
  PaymentWayButton,
  PaymentWayText,
  ChangePaymentWayText,
  OrderTotalContainer,
  OrderTotalTitle,
  OrderTotalValue,
  FinishButtonContainer,
} from './styles';
import { useOrders } from '~/hooks/orders';
import { Alert } from 'react-native';

interface IRenderProductItemData {
  item: ICartProduct;
}

const Cart: React.FC = () => {
  const modalRef = useRef<Modalize>(null);

  const {
    cartProductsQuantity,
    cartTotal,
    cartProducts,
    setCartProducts,
  } = useCart();
  const { createOrder } = useOrders();

  const [loading, setLoading] = useState(false);

  const renderProductItem = useCallback(({ item }: IRenderProductItemData) => {
    const { name, picture, formattedPrice, description } = item.product;

    return (
      <Product>
        <ProductPictureContainer>
          <ProductPicture source={{ uri: picture }} />
        </ProductPictureContainer>

        <ProductInfo>
          <ProductName>{name}</ProductName>

          <ProductDescription>{description}</ProductDescription>

          <ProductPrice>{formattedPrice}</ProductPrice>
        </ProductInfo>

        <QuantityBadge>
          <QuantityText>{item.quantity}</QuantityText>
        </QuantityBadge>
      </Product>
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const formattedCartProducts = cartProducts.map((cartProduct) => {
        return {
          id: cartProduct.product.id,
          quantity: cartProduct.quantity,
        };
      });

      await createOrder({
        products: formattedCartProducts,
      });

      Alert.alert('É isso ai!', 'Seu pedido foi realizado com sucesso.');

      modalRef.current?.close();

      setCartProducts([]);
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Ocorreu um erro ao finalizar seu pedido. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  if (cartProductsQuantity <= 0) {
    return null;
  }

  return (
    <Container onPress={() => modalRef.current?.open()}>
      <CartIcon>
        <Feather name="shopping-bag" color="#fff" size={18} />

        <CartBadge>
          <CartBadgeText>{cartProductsQuantity}</CartBadgeText>
        </CartBadge>
      </CartIcon>

      <CartTitle>Ver sacola</CartTitle>

      <CartTotal>{cartTotal}</CartTotal>

      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalRef}
          childrenStyle={{
            paddingBottom: 50,
          }}
          HeaderComponent={
            <ModalHeader
              title="Sacola"
              onClose={() => modalRef.current?.close()}
            />
          }
        >
          <ProductsList
            data={cartProducts}
            keyExtractor={(cartProduct) => cartProduct.product.id}
            renderItem={renderProductItem}
            style={{ marginBottom: 15 }}
          />

          <PaymentWayContainer>
            <PaymentWayButton>
              <PaymentWayText>Pagar na retirada</PaymentWayText>

              <ChangePaymentWayText>TROCAR</ChangePaymentWayText>
            </PaymentWayButton>
          </PaymentWayContainer>

          <OrderTotalContainer>
            <OrderTotalTitle>Total</OrderTotalTitle>

            <OrderTotalValue>{cartTotal}</OrderTotalValue>
          </OrderTotalContainer>

          <FinishButtonContainer>
            <Button
              title="Finaliar compra"
              onPress={handleSubmit}
              loading={loading}
            />
          </FinishButtonContainer>
        </Modalize>
      </Portal>
    </Container>
  );
};

export default Cart;
