import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Container, Title, CloseButton, CloseIcon } from './styles';

interface IProps {
  title: string;
  onClose?(event: GestureResponderEvent): void;
}

const ModalHeader: React.FC<IProps> = ({ title, onClose }) => {
  return (
    <Container>
      <Title>{title}</Title>

      {onClose && (
        <CloseButton onPress={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
    </Container>
  );
};

export default ModalHeader;
