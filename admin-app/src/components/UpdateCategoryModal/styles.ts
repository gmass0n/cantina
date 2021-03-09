import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${hp('3.3%')}px ${hp('3.3%')}px;
`;

export const ButtonsContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;
