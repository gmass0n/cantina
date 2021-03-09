import styled from 'styled-components/native';

import { Text } from '~/components';

export const Container = styled.ScrollView.attrs({
  bounces: false,
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
  height: 620px;
  width: 620px;
  opacity: 0.65;
`;

export const BottomRightImg = styled.Image`
  z-index: 1;
  position: absolute;
  bottom: -250px;
  right: -250px;
  height: 620px;
  width: 620px;
  opacity: 0.65;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 30px;
  z-index: 2;
`;

export const TitleImg = styled.Image``;

export const Separator = styled.View`
  height: 55%;
  margin: 0 15px;
  background-color: ${({ theme }) => theme.palette.secondary};
  width: 2px;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: #fff;
  font-size: 30px;
  max-width: 70%;
`;

export const Form = styled.View`
  padding: 0 30px;
  width: 100%;
  z-index: 2;
`;

export const ButtonContainer = styled.View`
  height: 55px;
`;

export const SignUpButton = styled.TouchableOpacity`
  padding-top: 15px;
`;

export const SignUpButtonText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary};
  text-align: center;
`;
