import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Text } from '~/components';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderLeftText = styled(Text).attrs({
  fontStyle: 'medium',
})`
  font-size: ${hp('1.8%')}px;
  line-height: ${hp('2.5%')}px;
  color: #fff;
`;

export const HeaderLeftSeparator = styled.View`
  height: 55%;
  margin-left: ${hp('0.8%')}px;
  margin-right: ${hp('2.4%')}px;
  background-color: ${({ theme }) => theme.palette.secondary};
  width: 2px;
`;

export const LogoImg = styled.Image`
  height: ${hp('2.65%')}px;
`;

export const SignOutButton = styled.TouchableOpacity`
  align-items: center;
`;

export const SignOutIcon = styled(Feather).attrs({
  name: 'log-out',
})`
  color: #fff;
  font-size: ${hp('2.4%')}px;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: ${hp('-2.8%')}px;
`;

export const InputBox = styled.View`
  padding: 0 ${hp('3.3%')}px;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 ${hp('3.3%')}px ${hp('2%')}px;
`;

export const ListHeaderTitle = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: ${({ theme }) => theme.palette.text};
  font-size: ${hp('2.1%')}px;
  letter-spacing: 0.8px;
`;

export const AddNewButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})``;

export const AddNewIcon = styled(Feather).attrs({
  name: 'plus',
})`
  color: ${({ theme }) => theme.palette.primary};
  font-size: ${hp('2.2%')}px;
`;

export const RefreshButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})`
  margin-left: auto;
  margin-right: ${hp('1.2%')}px;
`;

export const RefreshIcon = styled(Feather).attrs({
  name: 'refresh-ccw',
})`
  color: ${({ theme }) => theme.palette.primary};
  font-size: ${hp('1.8%')}px;
`;
