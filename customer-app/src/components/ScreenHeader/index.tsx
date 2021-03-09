import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Container, Content, HeaderLeft, Title, HeaderRight } from './styles';

interface IProps {
  title?: string;
  headerLeft?: JSX.Element;
  headerRight?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const ScreenHeader: React.FC<IProps> = ({
  headerLeft,
  headerRight,
  title,
  style,
}) => {
  return (
    <Container style={style}>
      <Content>
        {headerLeft && <HeaderLeft>{headerLeft}</HeaderLeft>}

        {!!title && <Title>{title}</Title>}

        {headerRight && <HeaderRight>{headerRight}</HeaderRight>}
      </Content>
    </Container>
  );
};

export default ScreenHeader;
