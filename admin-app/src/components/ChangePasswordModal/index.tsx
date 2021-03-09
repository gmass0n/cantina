import React, {
  useRef,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useState,
} from 'react';
import { TextInput, Alert, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import { useProfile } from '~/hooks/profile';

import { theme } from '~/styles';

import { getValidationErrors } from '~/utils';
import { IError } from '~/utils/getValidationErrors';

import Button from '../Button';
import Input from '../Input';
import ModalHeader from '../ModalHeader';
import { Container } from './styles';

export interface IChangePasswordModalHandles {
  openModal(): void;
}

interface IFormData {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const ChangePasswordModal: React.RefForwardingComponent<IChangePasswordModalHandles> = (
  _,
  ref
) => {
  const passwordRef = useRef<TextInput>({} as TextInput);
  const passwordConfirmationRef = useRef<TextInput>({} as TextInput);

  const modalRef = useRef<Modalize>(null);

  const { updatePassword } = useProfile();

  const [formData, setFormData] = useState<IFormData>({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  });

  const [formErrors, setFormErrors] = useState<IError>({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
    false
  );

  const [loading, setLoading] = useState(false);

  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  const handleChangeValue = useCallback((text: string, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: text,
    }));

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        oldPassword: Yup.string().required('Por favor, insira sua senha atual'),
        password: Yup.string().required('Por favor, insira sua nova senha'),
        passwordConfirmation: Yup.string()
          .when('oldPassword', {
            is: (val) => !!val,
            then: Yup.string().required('Por favor, confirme sua senha'),
            otherwise: Yup.string(),
          })
          .oneOf(
            [Yup.ref('password'), undefined],
            'Ops, as senhas não coincidem'
          ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const { oldPassword, password } = formData;

      await updatePassword({
        oldPassword,
        password,
      });

      Alert.alert('Boa!', 'Sua senha foi alterada com sucesso.', [
        {
          text: 'OK',
          style: 'default',
          onPress: () => modalRef.current?.close(),
        },
      ]);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        setFormErrors(errors);

        return;
      }

      if (error.response.status === 403) {
        Alert.alert('Ops, ocorreu um erro!', 'Senha atual não confere.');

        return;
      }

      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos alterar sua senha, verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }, [formData, updatePassword]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        HeaderComponent={<ModalHeader title="Trocar senha" />}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
      >
        <Container>
          <Input
            name="oldPassword"
            placeholder="Insira sua senha atual"
            style={{ marginBottom: hp('3.3%') }}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={formData.oldPassword}
            onChangeValue={handleChangeValue}
            error={formErrors.oldPassword}
            secureTextEntry={!showOldPassword}
            endAdornment={
              <TouchableOpacity
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <Feather
                  name={showOldPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={theme.palette.gray}
                />
              </TouchableOpacity>
            }
          />

          <Input
            name="password"
            placeholder="Insira sua nova senha"
            style={{ marginBottom: hp('3.3%') }}
            returnKeyType="next"
            ref={passwordRef}
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            value={formData.password}
            onChangeValue={handleChangeValue}
            error={formErrors.password}
            secureTextEntry={!showPassword}
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

          <Input
            name="passwordConfirmation"
            placeholder="Insira sua nova senha novamente"
            style={{ marginBottom: hp('3.3%') }}
            returnKeyType="done"
            ref={passwordConfirmationRef}
            onSubmitEditing={handleSubmit}
            value={formData.passwordConfirmation}
            onChangeValue={handleChangeValue}
            error={formErrors.passwordConfirmation}
            secureTextEntry={!showPasswordConfirmation}
            endAdornment={
              <TouchableOpacity
                onPress={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              >
                <Feather
                  name={showPasswordConfirmation ? 'eye-off' : 'eye'}
                  size={18}
                  color={theme.palette.gray}
                />
              </TouchableOpacity>
            }
          />

          <Button title="Trocar" onPress={handleSubmit} loading={loading} />
        </Container>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(ChangePasswordModal);
