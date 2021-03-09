import React, { useRef, useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Alert,
  TextInput,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import * as Yup from 'yup';

import { useProfile } from '~/hooks/profile';
import { useAuth } from '~/hooks/auth';

import {
  Input,
  Button,
  ScreenHeader,
  ChangePasswordModal,
  Cart,
} from '~/components';
import { IChangePasswordModalHandles } from '~/components/ChangePasswordModal';

import getValidationErrors, { IError } from '~/utils/getValidationErrors';
import { maskDocument, maskPhoneNumber, unmask } from '~/utils';

import { theme } from '~/styles';

import { api } from '~/services';

import {
  Container,
  Content,
  ImageContainer,
  Image,
  ChangePasswordButton,
  ChangePasswordIcon,
  ChangePasswordButtonText,
  SignOutButton,
  SignOutIcon,
} from './styles';

interface IFormData {
  name: string;
  email: string;
  document: string;
  avatar: string | null;
  phoneNumber: string | null;
}

const Profile: React.FC = () => {
  const { loadProfile, updateProfile } = useProfile();
  const { signOut } = useAuth();

  const changePasswordModalRef = useRef<IChangePasswordModalHandles>(null);
  const emailRef = useRef<TextInput>({} as TextInput);
  const phoneNumberRef = useRef<TextInput>({} as TextInput);
  const documentRef = useRef<TextInput>({} as TextInput);

  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    avatar: null,
    document: '',
    phoneNumber: '',
  });

  const [formErrors, setFormErrors] = useState<IError>({
    name: '',
    email: '',
    document: '',
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Ops, você não tem permissões para acessar a galeria.');
        }
      }
    })();
  }, []);

  useEffect(() => {
    async function loadProfileData(): Promise<void> {
      try {
        const {
          name,
          document,
          email,
          phoneNumber,
          avatar,
        } = await loadProfile();

        setFormData({ name, document, email, phoneNumber, avatar });
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

      const {
        document,
        name,
        phoneNumber,
        email,
        avatar,
      } = await loadProfile();

      setFormData({
        avatar: avatar || null,
        document: document || '',
        name: name || '',
        phoneNumber: phoneNumber || '',
        email: email || '',
      });
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
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }));

      if (name === 'document' || name === 'phoneNumber') {
        setFormData((prevState) => ({
          ...prevState,
          [name]: unmask(text),
        }));

        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        [name]: text,
      }));
    },
    [setFormData]
  );

  const handleSelectImage = useCallback(async () => {
    let { uri, cancelled } = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as {
      uri: string;
      cancelled: boolean;
      type: 'string';
    };

    if (!cancelled) {
      const fileName = uri.split('/').pop() as string;

      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;

      const fileData = new FormData() as any;

      fileData.append('file', {
        uri,
        type,
        name: fileName,
      });

      await api.post('files', fileData);

      setFormData((prevState) => ({
        ...prevState,
        avatar: uri,
      }));
    }
  }, []);

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

      await updateProfile(formData);

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

        return;
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [updateProfile, formData]);

  return (
    <Container enabled={Platform.OS === 'ios'} behavior="padding">
      <ScreenHeader
        title="Meu perfil"
        headerRight={
          <SignOutButton onPress={signOut}>
            <SignOutIcon />
          </SignOutButton>
        }
      />

      <Content
        refreshControl={
          <RefreshControl
            tintColor={theme.palette.primary}
            progressBackgroundColor="#fff"
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <TouchableOpacity onPress={handleSelectImage}>
          <ImageContainer>
            {formData.avatar && <Image source={{ uri: formData.avatar }} />}
          </ImageContainer>
        </TouchableOpacity>

        <Input
          name="name"
          placeholder="Insira seu nome completo"
          containerStyle={{ marginBottom: 20 }}
          value={formData.name}
          onChangeValue={handleChangeValue}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          error={formErrors.name}
        />

        <Input
          name="email"
          placeholder="Insira seu e-mail"
          containerStyle={{ marginBottom: 20 }}
          value={formData.email}
          onChangeValue={handleChangeValue}
          onSubmitEditing={() => documentRef.current.focus()}
          ref={emailRef}
          error={formErrors.email}
        />

        <Input
          name="document"
          placeholder="Insira seu CPF/CNPJ"
          containerStyle={{ marginBottom: 20 }}
          value={maskDocument(formData.document)}
          onChangeValue={handleChangeValue}
          ref={documentRef}
          onSubmitEditing={() => phoneNumberRef.current.focus()}
          maxLength={18}
          error={formErrors.document}
        />

        <Input
          name="phoneNumber"
          placeholder="Insira seu telefone"
          containerStyle={{ marginBottom: 20 }}
          value={maskPhoneNumber(formData.phoneNumber || '')}
          onChangeValue={handleChangeValue}
          ref={phoneNumberRef}
          maxLength={16}
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

      <Cart />
    </Container>
  );
};

export default Profile;
