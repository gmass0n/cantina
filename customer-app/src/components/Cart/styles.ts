import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { ICartProduct } from '~/hooks/cart';

import Text from '../Text';

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 20px 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.primary};

  position: absolute;
  bottom: 0;
`;

export const CartIcon = styled.View`
  width: 20px;
  height: 20px;

  position: absolute;
  left: 30px;
`;

export const CartBadge = styled.View`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border-color: ${({ theme }) => theme.palette.primary};
  border-width: 2px;
  background: #fff;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const CartBadgeText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 11px;
  color: ${({ theme }) => theme.palette.primary};
`;

export const CartTitle = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 13px;
  color: #fff;
`;

export const CartTotal = styled(Text).attrs({
  fontStyle: 'medium',
})`
  font-size: 15px;
  color: #fff;

  position: absolute;
  right: 30px;
`;

export const ProductsList = styled(
  FlatList as new () => FlatList<ICartProduct>
).attrs({
  bounces: false,
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingTop: 8,
  },
})``;

export const Product = styled.View`
  align-items: center;
  flex-direction: row;

  height: 110px;
  width: 100%;
  margin-bottom: 15px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};

  position: relative;
`;

export const ProductPictureContainer = styled.View`
  height: 100%;
  width: 110px;
  background: ${({ theme }) => theme.palette.secondary};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  padding: 15px;
`;

export const ProductPicture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 100%;
  width: 100%;
`;

export const ProductInfo = styled.View`
  padding: 0 15px;
  justify-content: center;
  flex: 1;
`;

export const ProductName = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ProductDescription = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.palette.text};
  line-height: 20px;
  font-size: 13px;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
`;

export const ProductPrice = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.green};
  letter-spacing: 0.5px;
  font-size: 15px;
`;

export const QuantityBadge = styled.View`
  height: 24px;
  width: 24px;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: 20px;

  align-items: center;
  justify-content: center;

  position: absolute;
  top: -8px;
  left: -8px;
`;

export const QuantityText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 12px;
  color: #fff;
`;

export const PaymentWayContainer = styled.View`
  padding: 0 30px;
`;

export const PaymentWayButton = styled.TouchableOpacity`
  padding: 15px;
  width: 100%;
  height: 55px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const PaymentWayText = styled(Text)`
  color: ${({ theme }) => theme.palette.text};
  font-size: 16px;
`;

export const ChangePaymentWayText = styled.Text`
  color: #999;
  text-transform: uppercase;
  font-size: 13px;
`;

export const OrderTotalContainer = styled.View`
  margin: 30px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: #ddd;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderTotalTitle = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 22px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.text};
`;

export const OrderTotalValue = styled(Text)`
  color: ${({ theme }) => theme.palette.text};
  font-size: 22px;
`;

export const FinishButtonContainer = styled.View`
  padding: 0 30px;
`;
