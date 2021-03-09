import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  height: ${hp('20%')}px;
  background: ${({ theme }) => theme.palette.primary};
  padding-top: ${hp('2%')}px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderLeft = styled.View`
  align-items: center;
  position: absolute;
  left: ${hp('3.3%')}px;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: #fff;
  font-size: ${hp('1.75%')}px;
  letter-spacing: 0.5px;
`;

export const HeaderRight = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${hp('3.3%')}px;
`;
