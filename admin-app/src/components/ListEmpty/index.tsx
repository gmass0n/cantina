import React from 'react';

import { Container, ContentText } from './styles';

interface IProps {
  content: string;
}

const ListEmpty: React.FC<IProps> = ({ content }) => {
  return (
    <Container>
      <ContentText>{content}</ContentText>
    </Container>
  );
};

export default ListEmpty;
