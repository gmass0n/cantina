/* eslint-disable no-undef */
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Alert, TextInput, Platform, RefreshControl } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Yup from 'yup';

import { useProfile } from '~/hooks/profile';

import {
  Input,
  Button,
  ScreenHeader,
  ChangePasswordModal,
  ImagePicker,
} from '~/components';
import { IAddCategoryModalHandles } from '~/components/AddCategoryModal';

import { theme } from '~/styles';

import getValidationErrors, { IError } from '~/utils/getValidationErrors';

import {
  Container,
  Content,
  ChangePasswordButton,
  ChangePasswordIcon,
  ChangePasswordButtonText,
} from './styles';

interface IFormData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const { loadProfile, updateProfile } = useProfile();

  const changePasswordModalRef = useRef<IAddCategoryModalHandles>(null);
  const emailRef = useRef<TextInput>({} as TextInput);

  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
  });

  const [avatar, setAvatar] = useState<string | null>(null);

  const [formErrors, setFormErrors] = useState<IError>({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProfileData(): Promise<void> {
      try {
        const profileData = await loadProfile();

        setFormData(profileData);
        setAvatar(profileData.avatar);
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Verifique sua conexão e tente novamente.'
        );
      }
    }

    loadProfileData();
  }, [loadProfile]);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      const profileData = await loadProfile();

      setFormData(profileData);
      setAvatar(profileData.avatar);
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Verifique sua conexão e tente novamente.'
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadProfile]);

  const handleChangeValue = useCallback(
    (text: string, name: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [name]: text,
      }));

      setFormErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Por favor, insira um nome completo'),
        email: Yup.string().required('Por favor, insira um e-mail'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await updateProfile({ ...formData, avatar });

      Alert.alert('Boa!', 'Seu perfil foi alterado com sucesso.');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        setFormErrors(errors);

        return;
      }

      if (error.response.status === 409) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Esse e-mail já esta sendo usado por outro usuário.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [updateProfile, formData, avatar]);

  return (
    <Container enabled={Platform.OS === 'ios'} behavior="padding">
      <ScreenHeader title="Meu perfil" />

      <Content
        refreshControl={
          <RefreshControl
            colors={[theme.palette.primary]}
            progressBackgroundColor="#fff"
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <ImagePicker image={avatar} setImage={setAvatar} />

        <Input
          name="name"
          placeholder="Insira seu nome completo"
          containerStyle={{ marginBottom: hp('3.3%') }}
          value={formData.name}
          onChangeValue={handleChangeValue}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          error={formErrors.name}
        />

        <Input
          name="email"
          placeholder="Insira seu e-mail"
          containerStyle={{ marginBottom: hp('3.3%') }}
          value={formData.email}
          onChangeValue={handleChangeValue}
          ref={emailRef}
          error={formErrors.email}
        />

        <ChangePasswordButton
          onPress={() => changePasswordModalRef.current?.openModal()}
        >
          <ChangePasswordIcon />

          <ChangePasswordButtonText>Mudar senha</ChangePasswordButtonText>
        </ChangePasswordButton>

        <Button title="Salvar" onPress={handleSubmit} loading={loading} />
      </Content>

      <ChangePasswordModal ref={changePasswordModalRef} />
    </Container>
  );
};

export default Profile;
