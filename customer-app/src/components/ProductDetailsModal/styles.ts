import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import Text from '../Text';

export const Content = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: 0;
  padding-bottom: 60px;
`;

export const ProductContainer = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const ProductPictureContainer = styled.View`
  height: 220px;
  background: ${({ theme }) => theme.palette.secondary};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  padding: 20px;
`;

export const ProductPicture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`;

export const ProductInfo = styled.View`
  justify-content: center;
  padding: 20px;
`;

export const ProductTitle = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  margin-bottom: 10px;
  font-size: 18px;
  letter-spacing: 0.5px;
`;

export const ProductDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.palette.text};
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
`;

export const ProductPrice = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.green};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const QuantityContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 55px;
  padding: 0 15px;
  margin-right: 20px;
`;

export const QuantityButton = styled.TouchableOpacity`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
    `};
`;

export const QuantityIcon = styled(Feather).attrs({
  size: 15,
})`
  color: #444;
`;

export const QuantityText = styled(Text)`
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 18px;
  color: #444;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
`;
