import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import { IProduct } from '~/hooks/products';

import { Text } from '~/components';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: -27.5px;
`;

export const InputBox = styled.View`
  padding: 0 30px;
  margin-bottom: 30px;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
`;

export const BackIcon = styled(Feather).attrs({
  name: 'chevron-left',
})`
  color: #fff;
  font-size: 24px;
`;

export const ProductsList = styled(
  FlatList as new () => FlatList<IProduct>
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingBottom: 82.5,
  },
})``;

export const Product = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  align-items: center;
  flex-direction: row;

  height: 110px;
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 15px;
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
