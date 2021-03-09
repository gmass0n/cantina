/* eslint-disable @typescript-eslint/no-empty-function */
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  StyleProp,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';

import { theme } from '~/styles';

import {
  Container,
  StartIconContainer,
  EndAdornment,
  FeatherIcon,
  TextInput,
  InputContainer,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
} from './styles';

interface IProps extends TextInputProps {
  startIcon?: string;
  endAdornment?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeValue?(text: string, name: string): void;
  name: string;
  error?: string;
}

const Input: ForwardRefRenderFunction<RNTextInput, IProps> = (
  {
    startIcon,
    endAdornment,
    containerStyle,
    onChangeValue = () => {},
    style,
    name,
    error,
    ...props
  },
  ref
) => {
  return (
    <Container style={containerStyle}>
      <InputContainer style={style}>
        {!!startIcon && (
          <StartIconContainer>
            <FeatherIcon name={startIcon} />
          </StartIconContainer>
        )}

        <TextInput
          placeholderTextColor={theme.palette.gray}
          onChangeText={(text) => onChangeValue(text, name)}
          ref={ref}
          {...props}
        />

        {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
      </InputContainer>

      {!!error && (
        <ErrorContainer>
          <ErrorIcon />
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
};

export default forwardRef(Input);
