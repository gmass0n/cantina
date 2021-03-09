import { FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import styled from 'styled-components/native';

import { ICategory } from '~/hooks/categories';

import Text from '../Text';

export const Container = styled.View`
  margin-top: ${hp('3.3%')}px;
`;

export const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding-left: ${hp('3.3%')}px;
`;

export const LoadingSkeleton = styled(ShimmerPlaceholder)`
  height: ${hp('13.5%')}px;
  width: ${hp('13.5%')}px;
  margin-right: ${hp('3.3%')}px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Categories = styled(
  FlatList as new () => FlatList<ICategory>
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: hp('3.3%'),
  },
})``;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  align-items: center;
  justify-content: space-between;

  height: ${hp('13.5%')}px;
  width: ${hp('13.5%')}px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.palette.card};
  margin-right: ${hp('3.3%')}px;
  padding: ${hp('1.8%')}px;
`;

export const CategoryPicture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: ${hp('5.6%')}px;
  width: ${hp('5.6%')}px;
  border-radius: 30px;
  background: ${({ theme }) => theme.palette.secondary};
  margin-bottom: ${hp('0.6%')}px;
`;

export const CategoryName = styled(Text).attrs({
  fontStyle: 'bold',
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
  font-size: ${hp('1.5%')}px;
  text-align: center;
`;
