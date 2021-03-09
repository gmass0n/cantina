import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  width: 100%;
  padding: ${hp('1.4%')}px;
  background: #ffecd1;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const ContentText = styled(Text)`
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.palette.text};
  font-size: ${hp('1.6%')}px;
`;
