import React, {
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { IOrder, IOrderProduct, useOrders } from '~/hooks/orders';

import { theme } from '~/styles';

import { formatCurrency, maskDocument } from '~/utils';

import Button from '../Button';
import ModalHeader from '../ModalHeader';
import {
  ProductsList,
  OrderDate,
  OrderStatus,
  Customer,
  CustomerAvatarContainer,
  CustomerAvatar,
  CustomerInfo,
  CustomerName,
  CustomerEmail,
  CustomerDocument,
  Product,
  ProductDescription,
  ProductInfo,
  ProductPicture,
  ProductName,
  ProductPictureContainer,
  ProductPrice,
  QuantityText,
  QuantityBadge,
  OrderTotalContainer,
  OrderTotalTitle,
  OrderTotalValue,
  ButtonsContainer,
} from './styles';

interface IRenderProductItemData {
  item: IOrderProduct;
}

export interface IOrderDetailsModalHandles {
  openModal(orderId: string): Promise<void>;
}

const OrderDetailsModal: React.ForwardRefRenderFunction<IOrderDetailsModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);

  const { loadOrderById, updateOrderStatus } = useOrders();

  const [order, setOrder] = useState<IOrder | undefined>();
  const [orderId, setOrderId] = useState('');

  const [preaparingLoading, setPreparingLoading] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    async function loadOrder(): Promise<void> {
      if (orderId) {
        try {
          const response = await loadOrderById(orderId);

          setOrder(response);
        } catch (error) {
          Alert.alert(
            'Ops, ocorreu um erro!',
            'Não possível carregar os detalhes do pedido desejado.'
          );
        }
      }
    }

    loadOrder();
  }, [loadOrderById, orderId]);

  const openModal = useCallback(async (id: string) => {
    modalRef.current?.open();

    setOrderId(id);
  }, []);

  const renderProductItem = useCallback(({ item }: IRenderProductItemData) => {
    const { name, picture, price, description } = item.product;

    return (
      <Product>
        <ProductPictureContainer>
          {picture && <ProductPicture source={{ uri: picture }} />}
        </ProductPictureContainer>

        <ProductInfo>
          <ProductName>{name}</ProductName>

          <ProductDescription>{description}</ProductDescription>

          <ProductPrice>{formatCurrency(price)}</ProductPrice>
        </ProductInfo>

        <QuantityBadge>
          <QuantityText>{item.quantity}</QuantityText>
        </QuantityBadge>
      </Product>
    );
  }, []);

  const handlePrepareOrder = useCallback(async () => {
    try {
      setPreparingLoading(true);

      await updateOrderStatus(orderId, 'preparing');

      Alert.alert(
        'Boa!',
        'O status desse pedido foi alterado para "Preparando".'
      );
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel alterar o status do pedido para "Preparando".'
      );
    } finally {
      setPreparingLoading(false);
    }
  }, [orderId, updateOrderStatus]);

  const handleFinishOrder = useCallback(async () => {
    try {
      setFinishLoading(true);

      await updateOrderStatus(orderId, 'ready');

      Alert.alert(
        'Boa!',
        'O status desse pedido foi alterado para "Pronto para retirada".'
      );
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel alterar o status do pedido para "Pronto para retirada".'
      );
    } finally {
      setFinishLoading(false);
    }
  }, [orderId, updateOrderStatus]);

  const handleCancelOrder = useCallback(async () => {
    try {
      setCancelLoading(true);

      await updateOrderStatus(orderId, 'canceled');

      Alert.alert(
        'Boa!',
        'O status desse pedido foi alterado para "Cancelado".'
      );
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel alterar o status do pedido para "Cancelado".'
      );
    } finally {
      setCancelLoading(false);
    }
  }, [updateOrderStatus, orderId]);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        HeaderComponent={<ModalHeader title="Detalhes do pedido" />}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
      >
        {order && (
          <>
            <OrderDate>Pedido realizado em {order.formattedDate}.</OrderDate>

            <OrderStatus>{order.formattedStatus}</OrderStatus>

            <Customer>
              <CustomerAvatarContainer>
                {order.customer.avatar && (
                  <CustomerAvatar source={{ uri: order.customer.avatar }} />
                )}
              </CustomerAvatarContainer>

              <CustomerInfo>
                <CustomerName>{order.customer.name}</CustomerName>

                <CustomerEmail>{order.customer.email}</CustomerEmail>

                <CustomerDocument>
                  {maskDocument(order.customer.document)}
                </CustomerDocument>
              </CustomerInfo>
            </Customer>

            <ProductsList
              data={order.orderProducts}
              keyExtractor={(product) => product.id}
              renderItem={renderProductItem}
            />

            <OrderTotalContainer>
              <OrderTotalTitle>Total</OrderTotalTitle>

              <OrderTotalValue>{order.formattedTotal}</OrderTotalValue>
            </OrderTotalContainer>

            <ButtonsContainer>
              {order.status === 'awaiting' ? (
                <Button
                  title="Preparar"
                  style={{ marginRight: hp('3.3%') }}
                  backgroundColor="#69b4e5"
                  textColor="#fff"
                  loadingColor="#fff"
                  onPress={handlePrepareOrder}
                  loading={preaparingLoading}
                />
              ) : (
                order.status === 'preparing' && (
                  <Button
                    title="Finalizar"
                    style={{ marginRight: hp('3.3%') }}
                    backgroundColor={theme.palette.green}
                    textColor="#fff"
                    loadingColor="#fff"
                    onPress={handleFinishOrder}
                    loading={finishLoading}
                  />
                )
              )}

              {order.status !== 'canceled' ? (
                <Button
                  title="Recusar"
                  backgroundColor={theme.palette.primary}
                  textColor="#fff"
                  loadingColor="#fff"
                  loading={cancelLoading}
                  onPress={handleCancelOrder}
                />
              ) : (
                <></>
              )}
            </ButtonsContainer>
          </>
        )}
      </Modalize>
    </Portal>
  );
};

export default forwardRef(OrderDetailsModal);
