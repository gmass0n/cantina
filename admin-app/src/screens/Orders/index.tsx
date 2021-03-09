import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, RefreshControl } from 'react-native';

import { useOrders, IOrder } from '~/hooks/orders';

import { Input, OrderDetailsModal, ScreenHeader } from '~/components';
import { IOrderDetailsModalHandles } from '~/components/OrderDetailsModal';

import { theme } from '~/styles';

import {
  Container,
  FilterContainer,
  LoadingContainer,
  LoadingSkeleton,
  OrdersList,
  Order,
  OrderTitle,
  OrderStatus,
  OrderStatusBall,
  OrderStatusText,
  OrderCustomer,
  OrderPrice,
} from './styles';

interface IRenderOrderItemData {
  item: IOrder;
}

const Orders: React.FC = () => {
  const orderDetailsModalRef = useRef<IOrderDetailsModalHandles>(null);

  const { orders, loadOrders } = useOrders();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState<IOrder[] | undefined>();

  useEffect(() => {
    async function loadOrdersData(): Promise<void> {
      try {
        await loadOrders();
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não foi possível carregar a lista de pedidos.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrdersData();
  }, [loadOrders]);

  const handleRefresh = useCallback(async () => {
    try {
      await loadOrders();
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não foi possível carregar a lista de pedidos.'
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadOrders]);

  const renderOrderItem = useCallback(({ item }: IRenderOrderItemData) => {
    return (
      <Order onPress={() => orderDetailsModalRef.current?.openModal(item.id)}>
        <OrderTitle>Pedido {item.formattedCode}</OrderTitle>

        <OrderStatus>
          <OrderStatusBall status={item.status} />

          <OrderStatusText>{item.formattedStatus}</OrderStatusText>
        </OrderStatus>

        <OrderCustomer>{item.customer.name}</OrderCustomer>

        <OrderPrice>{item.formattedTotal}</OrderPrice>
      </Order>
    );
  }, []);

  const handleSearch = useCallback(
    (text: string) => {
      const newOrders = orders.filter((order) =>
        order.formattedCode.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredOrders(newOrders);
    },
    [orders]
  );

  const ordersData = useMemo(() => {
    return filteredOrders || orders;
  }, [filteredOrders, orders]);

  return (
    <Container>
      <ScreenHeader title="Meus pedidos" />

      <FilterContainer>
        <Input
          name="search"
          startIcon="search"
          placeholder="Qual pedido você procura?"
          onChangeText={handleSearch}
        />
      </FilterContainer>

      {loading ? (
        <LoadingContainer>
          <LoadingSkeleton />

          <LoadingSkeleton />

          <LoadingSkeleton />

          <LoadingSkeleton />

          <LoadingSkeleton />
        </LoadingContainer>
      ) : (
        <>
          <OrdersList
            data={ordersData}
            keyExtractor={(order) => order.id}
            renderItem={renderOrderItem}
            refreshControl={
              <RefreshControl
                tintColor={theme.palette.primary}
                onRefresh={handleRefresh}
                refreshing={refreshing}
              />
            }
          />

          <OrderDetailsModal ref={orderDetailsModalRef} />
        </>
      )}
    </Container>
  );
};

export default Orders;
