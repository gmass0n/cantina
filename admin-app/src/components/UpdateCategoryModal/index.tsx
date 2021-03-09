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

import { theme } from '~/styles';

import getValidationErrors, { IError } from '~/utils/getValidationErrors';

import Button from '../Button';
import ImagePicker from '../ImagePicker';
import Input from '../Input';
import ModalHeader from '../ModalHeader';
import { Container, ButtonsContainer } from './styles';

interface IFormData {
  name: string;
  id: string;
}

export interface IUpdateCategoryModalHandles {
  openModal(categoryId: string): Promise<void>;
}

const UpdateCategoryModal: React.ForwardRefRenderFunction<IUpdateCategoryModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);

  const { updateCategory, loadCategoryById, deleteCategory } = useCategories();

  const [formData, setFormData] = useState<IFormData>({
    name: '',
    id: '',
  });

  const [formErrors, setFormErrors] = useState<IError>({
    name: '',
  });

  const [picture, setPicture] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const modalHeight = useMemo(() => {
    return Dimensions.get('window').height - hp('10%');
  }, []);

  const openModal = useCallback(
    async (categoryId: string) => {
      const category = await loadCategoryById(categoryId);

      setFormData((prevState) => ({
        ...prevState,
        name: category.name,
        id: categoryId,
      }));

      setPicture(category.picture);

      modalRef.current?.open();
    },
    [loadCategoryById]
  );

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

  const handleDeleteCategory = useCallback(async () => {
    try {
      setDeleteLoading(true);

      await deleteCategory(formData.id);

      Alert.alert('Boa!', 'Essa categoria foi excluida com sucesso.', [
        {
          text: 'OK',
          style: 'default',
          onPress: () => modalRef.current?.close(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Verifique sua conexão e tenta novamente.'
      );
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteCategory, formData]);

  const handlePressToDelete = useCallback(() => {
    Alert.alert(
      'Voce tem certeza?',
      'Todas os produtos que estão atrelados a essa categoria também serão apagados.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: handleDeleteCategory,
        },
      ]
    );
  }, [handleDeleteCategory]);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Por favor, insira um nome'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await updateCategory({ ...formData, picture });

      Alert.alert('Boa!', 'A categoria selecionada foi alterada com sucesso.', [
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

      if (error.response.status === 409) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Já existe uma categoria com esse nome.'
        );

        return;
      }

      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos alterar a categoria selecionada, verifique sua conexão e tente novamente.'
      );
    } finally {
      setSubmitLoading(false);
    }
  }, [updateCategory, formData, picture]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={modalHeight}
        HeaderComponent={<ModalHeader title="Alteração de categoria" />}
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

          <ButtonsContainer>
            <Button
              title="Excluir"
              textColor="#fff"
              backgroundColor={theme.palette.primary}
              onPress={handlePressToDelete}
              style={{ marginRight: hp('3.3%') }}
              loading={deleteLoading}
              loadingColor="#fff"
            />

            <Button
              title="Alterar"
              onPress={handleSubmit}
              loading={submitLoading}
            />
          </ButtonsContainer>
        </Container>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(UpdateCategoryModal);
