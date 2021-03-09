import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import { theme } from '~/styles';

import Text from '../Text';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: relative;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  font-size: 17px;
  letter-spacing: 0.5px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
`;

export const CloseIcon = styled(Feather).attrs({
  name: 'x',
  color: theme.palette.text,
  size: 18,
})``;
