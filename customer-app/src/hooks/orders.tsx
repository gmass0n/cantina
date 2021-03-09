import React, { createContext, useCallback, useContext, useState } from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { api } from '~/services';

import { formatCurrency } from '~/utils';

import { useAuth } from './auth';
import { IProduct } from './products';

type IStatus =
  | 'awaiting'
  | 'approved'
  | 'not-approved'
  | 'canceled'
  | 'delivered'
  | 'preparing'
  | 'ready';

export interface IOrderProduct {
  id: string;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  total: number;
  status: IStatus;
  createdAt: string;
  orderProducts: IOrderProduct[];
  formattedTotal: string;
  formattedDate: string;
  formattedCode: string;
  formattedStatus: string;
  code: number;
}

interface ICreateOrderData {
  products: Array<{
    id: string;
    quantity: number;
  }>;
}

interface OrdersContextData {
  orders: IOrder[];
  loadOrders(): Promise<IOrder[]>;
  createOrder(data: ICreateOrderData): Promise<void>;
  loadOrderById(orderId: string): Promise<IOrder>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

const OrdersProvider: React.FC = ({ children }) => {
  const { customer } = useAuth();

  const [orders, setOrders] = useState<IOrder[]>([]);

  const [orderStatus] = useState<{ [key: string]: string }>({
    awaiting: 'Aguardando o recebimento do seu pedido...',
    preparing: 'Preparando seu pedido',
    ready: 'Pedido pronto para retirada',
    canceled: 'Pedido cancelado',
  });

  const createOrder = useCallback(async (data: ICreateOrderData) => {
    await api.post('/orders', data);
  }, []);

  const loadOrders = useCallback(async () => {
    const response = await api.get<IOrder[]>('/orders', {
      params: { customerId: customer.id },
    });

    const orders = response.data.map((order) => {
      const str = '' + order.code;
      const pad = '#0000';
      const formattedCode = pad.substring(0, pad.length - str.length) + str;

      return {
        ...order,
        formattedTotal: formatCurrency(order.total),
        formattedStatus: orderStatus[order.status],
        formattedCode,
        formattedDate: format(
          parseISO(order.createdAt),
          "dd 'de' MMMM 'às' HH:mm",
          { locale: ptBR }
        ),
      };
    });

    setOrders(orders);

    return orders;
  }, [customer]);

  const loadOrderById = useCallback(async (orderId: string) => {
    const response = await api.get<IOrder>(`/orders/${orderId}`);

    const str = '' + response.data.code;
    const pad = '#0000';
    const formattedCode = pad.substring(0, pad.length - str.length) + str;

    return {
      ...response.data,
      formattedTotal: formatCurrency(response.data.total),
      formattedStatus: orderStatus[response.data.status],
      formattedCode,
      formattedDate: format(
        parseISO(response.data.createdAt),
        "dd 'de' MMMM 'às' HH:mm",
        { locale: ptBR }
      ),
    };
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loadOrders,
        loadOrderById,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

function useOrders(): OrdersContextData {
  const context = useContext(OrdersContext);

  return context;
}

export { OrdersProvider, useOrders };
