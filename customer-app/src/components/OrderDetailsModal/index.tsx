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
import { IOrder, IOrderProduct, useOrders } from '~/hooks/orders';
import { formatCurrency } from '~/utils';

import ModalHeader from '../ModalHeader';

import {
  ProductsList,
  OrderDate,
  OrderStatus,
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

  const { loadOrderById } = useOrders();
  const { addToCart } = useCart();

  const [order, setOrder] = useState<IOrder | undefined>();
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrder(): Promise<void> {
      if (orderId) {
        try {
          const response = await loadOrderById(orderId);

          setOrder(response);
        } catch (error) {
        } finally {
          setLoading(false);
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
          <ProductPicture source={{ uri: picture }} />
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

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  if (!order) {
    return null;
  }

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        HeaderComponent={
          <ModalHeader
            title="Detalhes do pedido"
            onClose={() => modalRef.current?.close()}
          />
        }
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
      >
        <OrderDate>Pedido realizado em {order.formattedDate}.</OrderDate>

        <OrderStatus>{order.formattedStatus}</OrderStatus>

        <ProductsList
          data={order.orderProducts}
          keyExtractor={(product) => product.id}
          renderItem={renderProductItem}
        />

        <OrderTotalContainer>
          <OrderTotalTitle>Total</OrderTotalTitle>

          <OrderTotalValue>{order.formattedTotal}</OrderTotalValue>
        </OrderTotalContainer>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(OrderDetailsModal);
