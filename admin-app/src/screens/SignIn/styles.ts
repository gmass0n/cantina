import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import { Text } from '~/components';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  background: ${({ theme }) => theme.palette.primary};
`;

export const TopLeftImg = styled.Image`
  z-index: 1;
  position: absolute;
  top: -250px;
  left: -250px;
  height: ${hp('73%')}px;
  width: ${hp('73%')}px;
  opacity: 0.65;
`;

export const BottomRightImg = styled.Image`
  z-index: 1;
  position: absolute;
  bottom: -250px;
  right: -250px;
  height: ${hp('73%')}px;
  width: ${hp('73%')}px;
  opacity: 0.65;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('6%')}px;
  padding: 0 ${hp('3.3%')}px;
  z-index: 2;
`;

export const TitleImg = styled.Image``;

export const Separator = styled.View`
  height: 55%;
  margin: 0 ${hp('2.6%')}px;
  background-color: ${({ theme }) => theme.palette.secondary};
  width: 2px;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: #fff;
  font-size: ${hp('3.3%')}px;
  max-width: 65%;
`;

export const Form = styled.View`
  padding: 0 ${hp('3.3%')}px;
  width: 100%;
  z-index: 2;
`;

export const ButtonContainer = styled.View`
  height: ${hp('6.3%')}px;
`;
