import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  height: 200px;
  background: ${({ theme }) => theme.palette.primary};
  padding-top: 20px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderLeft = styled.View`
  align-items: center;
  position: absolute;
  left: 30px;
`;

export const Title = styled(Text).attrs({
  fontStyle: 'bold',
})`
  color: #fff;
  font-size: 17px;
  letter-spacing: 0.5px;
`;

export const HeaderRight = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 30px;
`;
