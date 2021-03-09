import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Text } from '~/components';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const SignOutButton = styled.TouchableOpacity`
  align-items: center;
`;

export const SignOutIcon = styled(Feather).attrs({
  name: 'log-out',
})`
  color: #fff;
  font-size: 20px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingBottom: 90,
  },
})`
  flex: 1;
  margin-top: -27.5px;
`;

export const ImageContainer = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  height: 320px;
  margin-bottom: 20px;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;

export const ChangePasswordButton = styled.TouchableOpacity`
  margin-bottom: 20px;

  flex-direction: row;
  align-items: center;
`;

export const ChangePasswordIcon = styled(Feather).attrs({
  name: 'edit',
})`
  font-size: 16px;

  color: ${({ theme }) => theme.palette.primary};
  margin-right: 8px;
`;

export const ChangePasswordButtonText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: 16px;

  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.palette.primary};
`;
