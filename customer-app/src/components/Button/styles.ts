import styled, { css } from 'styled-components/native';

import Text from '../Text';

interface IContainerProps {
  backgroundColor: string;
}

interface IButtonTextProps {
  textColor: string;
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  height: 55px;
  flex: 1;

  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ backgroundColor }) => backgroundColor};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text).attrs({
  fontStyle: 'bold',
})<IButtonTextProps>`
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  letter-spacing: 0.5px;
`;
