import React, { createContext, useCallback, useContext, useState } from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { api } from '~/services';

import { formatCurrency } from '~/utils';

import { IProduct } from './products';

export type IStatus = 'awaiting' | 'canceled' | 'preparing' | 'ready';

interface ICustomer {
  name: string;
  id: string;
  avatar: string;
  email: string;
  document: string;
}

export interface IOrderProduct {
  id: string;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  code: number;
  total: number;
  status: IStatus;
  customer: ICustomer;
  formattedTotal: string;
  formattedStatus: string;
  formattedCode: string;
  formattedDate: string;
  createdAt: string;
  orderProducts: IOrderProduct[];
}

interface IOrdersContextData {
  orders: IOrder[];
  loadOrders(): Promise<void>;
  loadOrderById(orderId: string): Promise<IOrder>;
  updateOrderStatus(orderId: string, status: IStatus): Promise<void>;
}

const OrdersContext = createContext<IOrdersContextData>(
  {} as IOrdersContextData
);

const OrdersProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [orderStatus] = useState<{ [key: string]: string }>({
    awaiting: 'Aguardando o confirmação',
    preparing: 'Preparando seu pedido',
    ready: 'Pedido pronto para retirada',
    canceled: 'Pedido cancelado',
  });

  const loadOrders = useCallback(async () => {
    const response = await api.get<IOrder[]>('orders');

    const formattedOrders = response.data.map((order) => {
      const str = order.code.toString();
      const pad = '#0000';

      const formattedTotal = formatCurrency(order.total);
      const formattedStatus = orderStatus[order.status];
      const formattedCode = pad.substring(0, pad.length - str.length) + str;
      const formattedDate = format(
        parseISO(order.createdAt),
        "dd 'de' MMMM 'às' HH:mm",
        { locale: ptBR }
      );

      return {
        ...order,
        formattedTotal,
        formattedCode,
        formattedStatus,
        formattedDate,
      };
    });

    setOrders(formattedOrders);
  }, [orderStatus]);

  const loadOrderById = useCallback(
    async (orderId: string) => {
      const response = await api.get(`orders/${orderId}`);

      const order = response.data;

      const str = order.code.toString();
      const pad = '#0000';

      const formattedTotal = formatCurrency(order.total);
      const formattedStatus = orderStatus[order.status];
      const formattedCode = pad.substring(0, pad.length - str.length) + str;
      const formattedDate = format(
        parseISO(order.createdAt),
        "dd 'de' MMMM 'às' HH:mm",
        { locale: ptBR }
      );

      return {
        ...order,
        formattedTotal,
        formattedCode,
        formattedStatus,
        formattedDate,
      };
    },
    [orderStatus]
  );

  const updateOrderStatus = useCallback(
    async (orderId: string, status: IStatus) => {
      let action = 'prepare';

      if (status === 'ready') {
        action = 'finish';
      }

      if (status === 'canceled') {
        action = 'cancel';
      }

      await api.patch(`/orders/${orderId}/${action}`);

      const newOrders = [...orders];

      const findOrderIndex = newOrders.findIndex(
        (order) => order.id === orderId
      );

      if (findOrderIndex >= 0) {
        newOrders[findOrderIndex].status = status;

        setOrders(newOrders);
      }
    },
    [orders]
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loadOrders,
        loadOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

function useOrders(): IOrdersContextData {
  const context = useContext(OrdersContext);

  return context;
}

export { OrdersProvider, useOrders };
