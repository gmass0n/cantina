import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${hp('3.3%')}px ${hp('3.3%')}px;
`;

export const ImageContainer = styled.TouchableOpacity`
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: ${hp('35%')}px;
  overflow: hidden;
  margin-bottom: ${hp('3.3%')}px;
  padding: ${hp('2%')}px;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;

export const ButtonsContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;
