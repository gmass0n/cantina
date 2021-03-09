import { FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import { IOrderProduct } from '~/hooks/orders';

import Text from '../Text';

export const ProductsList = styled(
  FlatList as new () => FlatList<IOrderProduct>
).attrs({
  bounces: false,
  contentContainerStyle: {
    paddingHorizontal: hp('3.3%'),
    paddingTop: hp('0.8%'),
  },
})``;

export const OrderDate = styled(Text).attrs({
  fontStyle: 'medium',
})`
  font-size: 15px;
  text-align: center;
  margin: 0 ${hp('3.3%')}px;
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: ${hp('3.3%')}px;
`;

export const OrderStatus = styled(Text).attrs({
  fontStyle: 'bold',
})`
  font-size: 15px;
  text-align: center;
  margin: 0 ${hp('3.3%')}px;
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: ${hp('3.3%')}px;
`;

export const Customer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 0 ${hp('3.3%')}px;
  margin-bottom: ${hp('3.3%')}px;
`;

export const CustomerAvatarContainer = styled.View`
  height: ${hp('8%')}px;
  width: ${hp('8%')}px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${hp('4%')}px;
  margin-right: ${hp('1.8%')}px;
  overflow: hidden;
`;

export const CustomerAvatar = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;

export const CustomerInfo = styled.View``;

export const CustomerName = styled(Text).attrs({
  fontStyle: 'medium',
})`
  font-size: ${hp('1.8%')}px;
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: ${hp('0.5%')}px;
`;

export const CustomerEmail = styled(Text).attrs({
  fontStyle: 'medium',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: ${hp('1.8%')}px;
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: ${hp('0.5%')}px;
  max-width: ${hp('30%')}px;
`;

export const CustomerDocument = styled(Text).attrs({
  fontStyle: 'medium',
})`
  font-size: ${hp('1.8%')}px;
  color: ${({ theme }) => theme.palette.text};
`;

export const Product = styled.View`
  align-items: center;
  flex-direction: row;

  height: ${hp('13.5%%')}px;
  width: 100%;
  margin-bottom: ${hp('3.3%')}px;

  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};

  position: relative;
`;

export const ProductPictureContainer = styled.View`
  height: 100%;
  width: ${hp('13.5%%')}px;
  background: ${({ theme }) => theme.palette.secondary};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  padding: ${hp('1.8%')}px;
`;

export const ProductPicture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 100%;
  width: 100%;
`;

export const ProductInfo = styled.View`
  padding: 0 ${hp('2%')}px;
  justify-content: center;
  flex: 1;
`;

export const ProductName = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
  font-size: ${hp('1.65%')}px;
  margin-bottom: ${hp('0.5%')}px;
`;

export const ProductDescription = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.palette.text};
  line-height: ${hp('2%')}px;
  font-size: ${hp('1.4%')}px;
  margin-bottom: ${hp('0.5')}px;
  letter-spacing: 0.5px;
`;

export const ProductPrice = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.green};
  letter-spacing: 0.5px;
  font-size: ${hp('1.65%')}px;
`;

export const QuantityBadge = styled.View`
  height: 24px;
  width: 24px;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: 20px;

  align-items: center;
  justify-content: center;

  position: absolute;
  top: -${hp('0.8')}px;
  left: -${hp('0.8')}px;
`;

export const QuantityText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 12px;
  color: #fff;
`;

export const OrderTotalContainer = styled.View`
  padding-top: ${hp('3.3%')}px;
  margin: 0 ${hp('3.3%')}px;
  border-top-width: 1px;
  border-top-color: #ddd;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderTotalTitle = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: ${hp('2.4%')}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.text};
`;

export const OrderTotalValue = styled(Text)`
  color: ${({ theme }) => theme.palette.text};
  font-size: ${hp('2.4%')}px;
`;
export const ButtonsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding: ${hp('3.3%')}px;
  padding-bottom: ${hp('6%')}px;
`;
