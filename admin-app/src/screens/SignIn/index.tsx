/* eslint-disable no-return-assign */
import React, { useRef, useCallback, useState } from 'react';
import {
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
} from './styles';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordRef = useRef<TextInput>({} as TextInput);

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
      if (error.response.status === 401) {
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
            style={{ marginBottom: hp('3.3%') }}
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
            style={{ marginBottom: hp('3.3%') }}
            value={formData.password}
            onChangeValue={handleChangeValue}
            onSubmitEditing={handleSubmit}
            endAdornment={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={theme.palette.gray}
                />
              </TouchableOpacity>
            }
          />

          <ButtonContainer>
            <Button title="Entrar" onPress={handleSubmit} loading={loading} />
          </ButtonContainer>
        </Form>

        <BottomRightImg source={pizzaRight} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
