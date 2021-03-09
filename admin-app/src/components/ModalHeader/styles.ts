import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${hp('3.3%')}px;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  font-size: ${hp('1.75%')}px;
  letter-spacing: 0.5px;
`;
