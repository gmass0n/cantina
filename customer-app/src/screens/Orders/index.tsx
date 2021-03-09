import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';

import { Cart, ScreenHeader, OrderDetailsModal } from '~/components';
import { IOrderDetailsModalHandles } from '~/components/OrderDetailsModal';

import { IOrder, useOrders } from '~/hooks/orders';
import { theme } from '~/styles';

import {
  Container,
  OrdersList,
  OrderItem,
  OrderId,
  OrderDate,
  OrderPrice,
} from './styles';

interface IRenderOrderItemData {
  item: IOrder;
}

const Orders: React.FC = () => {
  const orderDetailsModalRef = useRef<IOrderDetailsModalHandles>(null);

  const { loadOrders, orders } = useOrders();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadOrdersData(): Promise<void> {
      try {
        await loadOrders();
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não foi possivel carregar a sua lista de pedidos.'
        );
      }
    }

    loadOrdersData();
  }, [loadOrders]);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      await loadOrders();
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possivel carregar a sua lista de pedidos.'
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadOrders]);

  const renderOrderItem = useCallback(({ item }: IRenderOrderItemData) => {
    return (
      <OrderItem
        onPress={() => orderDetailsModalRef.current?.openModal(item.id)}
      >
        <OrderId>{item.formattedCode}</OrderId>

        <OrderDate>{item.formattedDate}</OrderDate>

        <OrderDate>{item.orderProducts.length} produto/s</OrderDate>

        <OrderPrice>{item.formattedTotal}</OrderPrice>
      </OrderItem>
    );
  }, []);

  return (
    <Container>
      <ScreenHeader title="Meus pedidos" />

      <OrdersList
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={renderOrderItem}
        style={{ marginTop: -27.5 }}
        refreshControl={
          <RefreshControl
            tintColor={theme.palette.primary}
            progressBackgroundColor="#fff"
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
      />

      <Cart />

      <OrderDetailsModal ref={orderDetailsModalRef} />
    </Container>
  );
};

export default Orders;
