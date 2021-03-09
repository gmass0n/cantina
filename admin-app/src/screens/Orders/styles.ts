import { FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import styled from 'styled-components/native';

import { IOrder, IStatus } from '~/hooks/orders';

import { Text } from '~/components';

interface IOrderStatusBallProps {
  status: IStatus;
}

const orderStatus = {
  canceled: '#c72828',
  awaiting: '#ffb84d',
  preparing: '#69b4e5',
  ready: '#39b100',
};

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const FilterContainer = styled.View`
  margin-top: ${hp('-2.8%')}px;
  margin-bottom: ${hp('3.3%')}px;
  padding: 0 ${hp('3.3%')}px;
`;

export const LoadingContainer = styled.View`
  padding: 0 ${hp('3.3%')}px;
`;

export const LoadingSkeleton = styled(ShimmerPlaceholder)`
  height: ${hp('13.5%%')}px;
  width: 100%;
  margin-bottom: ${hp('3.3%')}px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const OrdersList = styled(FlatList as new () => FlatList<IOrder>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: hp('3.3%'),
  },
})`
  flex: 1;
`;

export const Order = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  justify-content: space-between;

  height: ${hp('13.5%%')}px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${hp('2%')}px ${hp('2.5%')}px;
  margin-bottom: ${hp('3.3%')}px;
`;

export const OrderTitle = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
  font-size: ${hp('1.6%')}px;
  margin-bottom: ${hp('0.5%')}px;
`;

export const OrderStatus = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${hp('0.5%')}px;
`;

export const OrderStatusBall = styled.View<IOrderStatusBallProps>`
  height: ${hp('1%')}px;
  width: ${hp('1%')}px;
  border-radius: 5px;
  background: ${({ status }) => orderStatus[status || 'pending']};
  margin-right: ${hp('0.8%')}px;
`;

export const OrderStatusText = styled(Text)`
  font-size: ${hp('1.35%')}px;
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
`;

export const OrderCustomer = styled(Text)`
  font-size: ${hp('1.35%')}px;
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: ${hp('0.5%')}px;
  letter-spacing: 0.5px;
`;

export const OrderPrice = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.green};
  letter-spacing: 0.5px;
  font-size: ${hp('1.6%')}px;
`;
