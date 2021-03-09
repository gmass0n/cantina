import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import Text from '../Text';

interface IContainerProps {
  backgroundColor: string;
}

interface IButtonTextProps {
  textColor: string;
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  height: ${hp('6.3%')}px;
  flex: 1;

  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ backgroundColor }) => backgroundColor};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text).attrs({
  fontStyle: 'bold',
})<IButtonTextProps>`
  color: ${({ textColor }) => textColor};
  font-size: ${hp('1.6%')}px;
  letter-spacing: 0.5px;
`;
