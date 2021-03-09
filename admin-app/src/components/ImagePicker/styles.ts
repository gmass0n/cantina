import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: ${hp('35%')}px;
  overflow: hidden;
  margin-bottom: ${hp('3.3%')}px;
  padding: ${hp('2%')}px;

  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;
