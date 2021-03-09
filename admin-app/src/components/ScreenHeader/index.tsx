import React from 'react';

import { Container, Content, HeaderLeft, Title, HeaderRight } from './styles';

interface IProps {
  title?: string;
  headerLeft?: JSX.Element;
  headerRight?: JSX.Element;
}

const ScreenHeader: React.FC<IProps> = ({ headerLeft, headerRight, title }) => {
  return (
    <Container>
      <Content>
        {headerLeft && <HeaderLeft>{headerLeft}</HeaderLeft>}

        {!!title && <Title>{title}</Title>}

        {headerRight && <HeaderRight>{headerRight}</HeaderRight>}
      </Content>
    </Container>
  );
};

export default ScreenHeader;
