import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View``;

export const InputContainer = styled.View`
  align-items: center;
  flex-direction: row;

  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  width: 100%;
  height: 55px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: ${({ theme }) => theme.palette.text};
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`;

export const StartIconContainer = styled.View`
  margin-right: 15px;
`;

export const EndAdornment = styled.View`
  margin-left: 15px;
  align-items: center;
  flex-direction: row;
`;

export const FeatherIcon = styled(Feather)`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const ErrorContainer = styled.View`
  align-items: center;
  flex-direction: row;

  margin-top: 5px;
`;

export const ErrorIcon = styled(Feather).attrs({
  name: 'alert-circle',
})`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary};
  margin-right: 0.8px;
`;

export const ErrorMessage = styled(Text)`
  font-size: 15px;
  margin-left: 6px;
  color: ${({ theme }) => theme.palette.primary};
`;
