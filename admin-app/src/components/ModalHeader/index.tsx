import React from 'react';

import { Container, Title } from './styles';

interface IProps {
  title: string;
}

const ModalHeader: React.FC<IProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default ModalHeader;
