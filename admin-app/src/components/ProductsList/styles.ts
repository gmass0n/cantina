import { FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import styled from 'styled-components/native';

import { IProduct } from '~/hooks/products';

import Text from '../Text';

export const Container = styled.View`
  margin-top: ${hp('3.3%')}px;
  flex: 1;
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

export const Products = styled(FlatList as new () => FlatList<IProduct>).attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
  contentContainerStyle: {
    paddingHorizontal: hp('3.3%'),
  },
})``;

export const Product = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  align-items: center;
  flex-direction: row;

  height: ${hp('13.5%%')}px;
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${hp('3.3%')}px;
`;

export const ProductPictureContainer = styled.View`
  height: 100%;
  width: ${hp('13.5%%')}px;
  background: ${({ theme }) => theme.palette.secondary};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
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
  font-size: ${hp('1.3%')}px;
  margin-bottom: ${hp('0.5')}px;
  letter-spacing: 0.5px;
`;

export const ProductPrice = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.green};
  letter-spacing: 0.5px;
  font-size: ${hp('1.65%')}px;
  margin-bottom: ${hp('0.5')}px;
`;
