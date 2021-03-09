/* eslint-disable no-undef */
import React, {
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { Dimensions, Alert, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Yup from 'yup';

import { useCategories } from '~/hooks/categories';
import { useProducts } from '~/hooks/products';

import { theme } from '~/styles';

import { formatCurrency, unformatCurrency } from '~/utils';
import getValidationErrors, { IError } from '~/utils/getValidationErrors';

import Button from '../Button';
import ImagePicker from '../ImagePicker';
import Input from '../Input';
import ModalHeader from '../ModalHeader';
import Select from '../Select';
import { Container, ButtonsContainer } from './styles';

export interface IUpdateProductModalHandles {
  openModal(productId: string): Promise<void>;
}

interface ICategory {
  label: string;
  value: string;
}

interface IFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  quantity: string;
}

const UpdateProductModal: React.ForwardRefRenderFunction<IUpdateProductModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);
  const quantityRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const { loadCategories } = useCategories();
  const { updateProduct, loadProductById, deleteProduct } = useProducts();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const [formData, setFormData] = useState<IFormData>({
    id: '',
    description: '',
    name: '',
    price: 0,
    categoryId: '',
    quantity: '',
  });

  const [formErrors, setFormErrors] = useState<IError>({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
  });

  const [picture, setPicture] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const modalHeight = useMemo(() => {
    return Dimensions.get('window').height - hp('10%');
  }, []);

  useEffect(() => {
    async function loadCategoriesList(): Promise<void> {
      try {
        const categoriesList = await loadCategories();

        setCategories(
          categoriesList.map((category) => {
            return {
              label: category.name,
              value: category.id,
            };
          })
        );
      } catch (error) {
        Alert.alert(
          'Ops, ocorreu um erro!',
          'Não conseguimos carregar a lista de categorias, verifique sua conexão e tente novamente.'
        );
      }
    }

    loadCategoriesList();
  }, [loadCategories]);

  const openModal = useCallback(
    async (productId: string) => {
      const product = await loadProductById(productId);

      setFormData({
        ...product,
        quantity: String(product.quantity),
      });

      setPicture(product.picture);

      modalRef.current?.open();
    },
    [loadProductById]
  );

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  const handleChangeValue = useCallback((text: string, name: string) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));

    if (name === 'price') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: unformatCurrency(text),
      }));

      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  }, []);

  const handleDeleteProduct = useCallback(async () => {
    try {
      setDeleteLoading(true);

      await deleteProduct(formData.id);

      Alert.alert('Boa!', 'Esse produto foi excluido com sucesso.', [
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
  }, [deleteProduct, formData]);

  const handlePressToDelete = useCallback(() => {
    Alert.alert(
      'Voce tem certeza?',
      'Esse produto será apagado e essa ação é irreversível.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: handleDeleteProduct,
        },
      ]
    );
  }, [handleDeleteProduct]);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Por favor, insira um nome'),
        description: Yup.string().required('Por favor, insira uma descrição'),
        price: Yup.string().required('Por favor, insira um preço'),
        quantity: Yup.number()
          .required('Por favor, insira uma quantidade')
          .min(0, 'Por favor, insira uma quantidade'),
        categoryId: Yup.string().required('Por favor, selecione uma categoria'),
      });

      const data = {
        ...formData,
        quantity: Number(formData.quantity),
        picture,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      await updateProduct(data);

      Alert.alert('Boa!', 'O produto selecionado foi alterado com sucesso.', [
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
          'Já existe um produto com esse nome.'
        );

        return;
      }

      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos alterar o produto selecionado, verifique sua conexão e tente novamente.'
      );
    } finally {
      setSubmitLoading(false);
    }
  }, [formData, updateProduct, picture]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={modalHeight}
        HeaderComponent={<ModalHeader title="Alteração de produto" />}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
      >
        <Container>
          <ImagePicker image={picture} setImage={setPicture} />

          <Input
            name="name"
            placeholder="Insira o nome do produto"
            containerStyle={{ marginBottom: hp('3.3%') }}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            value={formData.name}
            onChangeValue={handleChangeValue}
            error={formErrors.name}
          />

          <Input
            name="description"
            placeholder="Insira a descrição do produto"
            textAlignVertical="top"
            multiline
            style={{ height: hp('13.3%') }}
            containerStyle={{ marginBottom: hp('3.3%') }}
            ref={descriptionRef}
            returnKeyType="next"
            onSubmitEditing={() => priceRef.current?.focus()}
            value={formData.description}
            onChangeValue={handleChangeValue}
            error={formErrors.description}
          />

          <Input
            name="price"
            placeholder="Insira o preço do produto"
            keyboardType="numeric"
            containerStyle={{ marginBottom: hp('3.3%') }}
            ref={priceRef}
            returnKeyType="next"
            value={formatCurrency(formData.price)}
            onSubmitEditing={() => quantityRef.current?.focus()}
            onChangeValue={handleChangeValue}
            error={formErrors.price}
          />

          <Input
            name="quantity"
            placeholder="Insira a quantidade do produto"
            keyboardType="numeric"
            containerStyle={{ marginBottom: hp('3.3%') }}
            ref={quantityRef}
            returnKeyType="next"
            value={formData.quantity}
            onChangeValue={handleChangeValue}
            error={formErrors.quantity}
          />

          <Select
            name="categoryId"
            value={formData.categoryId}
            placeholder="Selecione uma categoria"
            options={categories}
            style={{ marginBottom: hp('3.3%') }}
            onChangeValue={(value, name) => handleChangeValue(value, name)}
            error={formErrors.categoryId}
          />

          <ButtonsContainer>
            <Button
              title="Excluir"
              textColor="#fff"
              backgroundColor={theme.palette.primary}
              style={{ marginRight: hp('3.3%') }}
              onPress={handlePressToDelete}
              loading={deleteLoading}
              loadingColor="#fff"
            />

            <Button
              title="Alterar"
              loading={submitLoading}
              onPress={handleSubmit}
            />
          </ButtonsContainer>
        </Container>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(UpdateProductModal);
