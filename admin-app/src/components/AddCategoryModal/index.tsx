import React, {
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
} from 'react';
import { Dimensions, Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Yup from 'yup';

import { useCategories } from '~/hooks/categories';

import getValidationErrors, { IError } from '~/utils/getValidationErrors';

import Button from '../Button';
import ImagePicker from '../ImagePicker';
import Input from '../Input';
import ModalHeader from '../ModalHeader';
import { Container } from './styles';

interface IFormData {
  name: string;
}

export interface IAddCategoryModalHandles {
  openModal(): void;
}

const AddCategoryModal: React.ForwardRefRenderFunction<IAddCategoryModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);

  const { createCategory } = useCategories();

  const [formData, setFormData] = useState<IFormData>({
    name: '',
  });

  const [formErrors, setFormErrors] = useState<IError>({
    name: '',
  });

  const [picture, setPicture] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const modalHeight = useMemo(() => {
    return Dimensions.get('window').height - hp('10%');
  }, []);

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

  const handlePressAlertOk = useCallback(() => {
    modalRef.current?.close();

    setFormData({
      name: '',
    });

    setPicture(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Por favor, insira um nome'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await createCategory({ ...formData, picture });

      Alert.alert('Boa!', 'Uma nova categoria foi adicionada com sucesso.', [
        {
          text: 'OK',
          style: 'default',
          onPress: handlePressAlertOk,
        },
      ]);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        setFormErrors(errors);

        return;
      }

      if (error.response.status === 409) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Já existe uma categoria com esse nome.'
        );

        return;
      }

      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos cadastrar uma nova categoria, verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }, [createCategory, formData, handlePressAlertOk, picture]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={modalHeight}
        HeaderComponent={<ModalHeader title="Cadastro de categoria" />}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
      >
        <Container>
          <ImagePicker image={picture} setImage={setPicture} />

          <Input
            name="name"
            placeholder="Insira o nome da categoria"
            containerStyle={{ marginBottom: hp('3.3%') }}
            value={formData.name}
            onChangeValue={handleChangeValue}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            error={formErrors.name}
          />

          <Button title="Cadastrar" onPress={handleSubmit} loading={loading} />
        </Container>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(AddCategoryModal);
