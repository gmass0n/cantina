import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '~/components';
import { IOrder } from '~/hooks/orders';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const OrdersList = styled(FlatList as new () => FlatList<IOrder>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingBottom: 82.5,
  },
})``;

export const OrderItem = styled.TouchableOpacity`
  padding: 15px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 15px;
`;

export const OrderId = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.palette.text};
`;

export const OrderDate = styled(Text)`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.palette.text};
`;

export const OrderPrice = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text};
`;
