import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { theme } from '~/styles';

import { Container, ButtonText, Content } from './styles';

interface IProps extends TouchableOpacityProps {
  backgroundColor?: string;
  textColor?: string;
  title: string;
  loading?: boolean;
  loadingColor?: string;
}

const Button: React.FC<IProps> = ({
  title,
  backgroundColor = theme.palette.secondary,
  textColor = theme.palette.primaryDark,
  loading,
  loadingColor = theme.palette.primaryDark,
  ...props
}) => {
  return (
    <Container backgroundColor={backgroundColor} activeOpacity={0.6} {...props}>
      <Content>
        {loading ? (
          <ActivityIndicator color={loadingColor} />
        ) : (
          <ButtonText textColor={textColor}>{title}</ButtonText>
        )}
      </Content>
    </Container>
  );
};

export default Button;
