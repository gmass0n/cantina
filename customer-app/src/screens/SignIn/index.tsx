/* eslint-disable no-return-assign */
import React, { useRef, useCallback, useState } from 'react';
import {
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useAuth } from '~/hooks/auth';

import { Input, Button } from '~/components';

import { theme } from '~/styles';

import { logo, pizzaLeft, pizzaRight } from '~/assets';

import {
  Container,
  TopLeftImg,
  BottomRightImg,
  TitleContainer,
  TitleImg,
  Separator,
  Title,
  Form,
  ButtonContainer,
  SignUpButton,
  SignUpButtonText,
} from './styles';
import { useNavigation } from '@react-navigation/native';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordRef = useRef<TextInput>({} as TextInput);

  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeValue = useCallback((text: string, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const { email, password } = formData;

      await signIn({
        email,
        password,
      });
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        Alert.alert('Ops, ocorreu um erro!', 'Email e/ou senha incorreto(s).');
      }
    } finally {
      setLoading(false);
    }
  }, [signIn, formData]);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={{ flex: 1 }}
    >
      <Container>
        <TopLeftImg source={pizzaLeft} />

        <TitleContainer>
          <TitleImg source={logo} />

          <Separator />

          <Title>Faça o login para entrar no app.</Title>
        </TitleContainer>

        <Form>
          <Input
            name="email"
            startIcon="mail"
            placeholder="Insira seu e-mail"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 20 }}
            value={formData.email}
            onChangeValue={handleChangeValue}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <Input
            name="password"
            startIcon="lock"
            placeholder="Insira sua senha"
            returnKeyType="done"
            secureTextEntry={!showPassword}
            ref={passwordRef}
            style={{ marginBottom: 20 }}
            value={formData.password}
            onChangeValue={handleChangeValue}
            onSubmitEditing={handleSubmit}
            endAdornment={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.palette.gray}
                />
              </TouchableOpacity>
            }
          />

          <ButtonContainer>
            <Button title="Entrar" onPress={handleSubmit} loading={loading} />
          </ButtonContainer>

          <SignUpButton onPress={() => navigate('SignUp')}>
            <SignUpButtonText>Não tenho uma conta</SignUpButtonText>
          </SignUpButton>
        </Form>

        <BottomRightImg source={pizzaRight} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
