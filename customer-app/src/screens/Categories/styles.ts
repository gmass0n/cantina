import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Text } from '~/components';

import { IFormattedCategory } from '.';

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
  margin-bottom: 22.5px;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<IFormattedCategory>
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 22.5,
    paddingBottom: 82.5,
  },
})``;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  align-items: center;
  justify-content: space-between;

  height: 110px;
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.palette.card};
  padding: 15px;
  margin: 7.5px;
`;

export const CategoryPicture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  background: ${({ theme }) => theme.palette.secondary};
  margin-bottom: 6px;
`;

export const CategoryName = styled(Text).attrs({
  fontStyle: 'bold',
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.palette.text};
  letter-spacing: 0.5px;
  font-size: 13px;
  text-align: center;
`;
