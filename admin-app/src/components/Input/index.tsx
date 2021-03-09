/* eslint-disable @typescript-eslint/no-empty-function */
import React, { forwardRef, RefForwardingComponent } from 'react';
import {
  TextInputProperties,
  StyleProp,
  ViewStyle,
  TextInput as RNTextInpu,
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

interface IProps extends TextInputProperties {
  startIcon?: string;
  endAdornment?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeValue?(text: string, name: string): void;
  name: string;
  error?: string;
}

const Input: RefForwardingComponent<RNTextInpu, IProps> = (
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
