import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Text from '../Text';

interface IValueTextProps {
  hasValue: boolean;
}

export const ValueContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  background: ${({ theme }) => theme.palette.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${hp('2%')}px;
  width: 100%;
  height: ${hp('6.3%')}px;
`;

export const ValueText = styled(Text)<IValueTextProps>`
  color: ${({ hasValue, theme }) => (hasValue ? theme.palette.text : '#999')};
`;

export const ModalHeader = styled.View`
  padding: ${hp('2.5%')}px ${hp('2.5%')}px 0;
`;

export const SearchInput = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin-left: ${hp('1.5%')}px;
  font-size: ${hp('2%')}px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.palette.text};
  flex: 1;
`;

export const OptionsContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  height: ${hp('48%')}px;
  margin: ${hp('2.5%')}px 0;
  border-top-color: #ddd;
  border-top-width: 1px;
`;

export const OptionButton = styled.TouchableHighlight.attrs({
  underlayColor: 'rgba(0,0,0,0.1)',
})``;

export const Option = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: ${hp('2.5%')}px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const OptionLabel = styled(Text)`
  color: #444;
  font-size: ${hp('1.8%')}px;
  letter-spacing: 0.5px;
`;

export const OptionIcon = styled(Feather).attrs({
  name: 'chevron-right',
})`
  font-size: ${hp('1.8%')}px;
`;
