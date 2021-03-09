import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View``;

export const InputContainer = styled.View`
  align-items: center;
  flex-direction: row;

  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${hp('2%')}px;
  width: 100%;
  height: ${hp('6.3%')}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: ${({ theme }) => theme.palette.text};
  font-size: ${hp('1.7%')}px;
  font-family: 'Montserrat_400Regular';
`;

export const StartIconContainer = styled.View`
  margin-right: ${hp('1.5%')}px;
`;

export const EndAdornment = styled.View`
  margin-left: ${hp('1.5%')}px;
  align-items: center;
  flex-direction: row;
`;

export const FeatherIcon = styled(Feather)`
  font-size: ${hp('2%')}px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const ErrorContainer = styled.View`
  align-items: center;
  flex-direction: row;

  margin-top: ${hp('0.5%')}px;
`;

export const ErrorIcon = styled(Feather).attrs({
  name: 'alert-circle',
})`
  font-size: ${hp('1.4%')}px;
  color: ${({ theme }) => theme.palette.primary};
  margin-right: ${hp('0.8%')}px;
`;

export const ErrorMessage = styled(Text)`
  font-size: ${hp('1.5%')}px;
  color: ${({ theme }) => theme.palette.primary};
`;
