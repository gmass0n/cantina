import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Text } from '~/components';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: hp('3.3%'),
    paddingBottom: hp('3.3%'),
  },
})`
  flex: 1;
  margin-top: ${hp('-2.8%')}px;
`;
export const ChangePasswordButton = styled.TouchableOpacity`
  margin-bottom: ${hp('3.3%')}px;

  flex-direction: row;
  align-items: center;
`;

export const ChangePasswordIcon = styled(Feather).attrs({
  name: 'edit',
})`
  font-size: ${hp('1.6%')}px;

  color: ${({ theme }) => theme.palette.primary};
  margin-right: ${hp('0.8%')}px;
`;

export const ChangePasswordButtonText = styled(Text).attrs({
  fontStyle: 'semiBold',
})`
  font-size: ${hp('1.6%')}px;

  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.palette.primary};
`;
