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
import { SignIn } from '..';
import { maskDocument, unmask } from '~/utils';

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  document: string;
}

const SignUp: React.FC = () => {
  const passwordRef = useRef<TextInput>({} as TextInput);
  const documentRef = useRef<TextInput>({} as TextInput);
  const emailRef = useRef<TextInput>({} as TextInput);
  const confirmPasswordRef = useRef<TextInput>({} as TextInput);

  const { navigate } = useNavigation();
  const { signUp, signIn } = useAuth();

  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    document: '',
    confirmPassword: '',
    name: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeValue = useCallback((text: string, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'document' ? unmask(text) : text,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const { email, password, confirmPassword, name, document } = formData;

      if (password !== confirmPassword) {
        Alert.alert(
          'Ops, aconteceu um imprevisto!',
          'As senhas não coincidem.'
        );
      }

      await signUp({
        email,
        password,
        name,
        document,
      });

      Alert.alert('É isso ai!', 'Seu cadastro foi realizado com sucesso.');

      await signIn({
        email,
        password,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Ops, ocorreu um erro!', 'Email e/ou senha incorreto(s).');

        return;
      }
    } finally {
      setLoading(false);
    }
  }, [signUp, formData, signIn]);

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

          <Title>Faça seu cadastro no app.</Title>
        </TitleContainer>

        <Form>
          <Input
            name="name"
            startIcon="user"
            placeholder="Insira seu nome completo"
            returnKeyType="next"
            autoCapitalize="none"
            style={{ marginBottom: 20 }}
            value={formData.name}
            onChangeValue={handleChangeValue}
            onSubmitEditing={() => documentRef.current.focus()}
          />

          <Input
            name="document"
            startIcon="briefcase"
            placeholder="Insira seu CPF/CNPJ"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="numeric"
            style={{ marginBottom: 20 }}
            value={maskDocument(formData.document)}
            maxLength={18}
            ref={documentRef}
            onChangeValue={handleChangeValue}
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <Input
            name="email"
            startIcon="mail"
            placeholder="Insira seu e-mail"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 20 }}
            ref={emailRef}
            value={formData.email}
            onChangeValue={handleChangeValue}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <Input
            name="password"
            startIcon="lock"
            placeholder="Insira sua senha"
            returnKeyType="next"
            secureTextEntry={!showPassword}
            ref={passwordRef}
            style={{ marginBottom: 20 }}
            value={formData.password}
            onChangeValue={handleChangeValue}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />

          <Input
            name="confirmPassword"
            startIcon="lock"
            placeholder="Confirme sua senha"
            returnKeyType="done"
            secureTextEntry={!showPassword}
            ref={confirmPasswordRef}
            style={{ marginBottom: 20 }}
            value={formData.confirmPassword}
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
            <Button
              title="Cadastrar"
              onPress={handleSubmit}
              loading={loading}
            />
          </ButtonContainer>

          <SignUpButton onPress={() => navigate('SignIn')}>
            <SignUpButtonText>Já tenho uma conta</SignUpButtonText>
          </SignUpButton>
        </Form>

        <BottomRightImg source={pizzaRight} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
