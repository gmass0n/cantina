import React, {
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  forwardRef,
  useState,
} from 'react';
import { Dimensions, Alert, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Yup from 'yup';

import { useCategories } from '~/hooks/categories';
import { useProducts } from '~/hooks/products';

import { formatCurrency, unformatCurrency } from '~/utils';
import getValidationErrors, { IError } from '~/utils/getValidationErrors';

import Button from '../Button';
import ImagePicker from '../ImagePicker';
import Input from '../Input';
import ModalHeader from '../ModalHeader';
import Select from '../Select';
import { Container } from './styles';

export interface IAddProductModalHandles {
  openModal(): void;
}

interface ICategory {
  label: string;
  value: string;
}

interface IFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  quantity: string;
}

const AddProductModal: React.ForwardRefRenderFunction<IAddProductModalHandles> = (
  _,
  ref
) => {
  const modalRef = useRef<Modalize>(null);
  const descriptionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const quantityRef = useRef<TextInput>(null);

  const { loadCategories } = useCategories();
  const { createProduct } = useProducts();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const [formData, setFormData] = useState<IFormData>({
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

  const [loading, setLoading] = useState(false);

  const modalHeight = useMemo(() => {
    return Dimensions.get('window').height - hp('10%');
  }, []);

  const openModal = useCallback(() => {
    async function loadCategoriesList(): Promise<void> {
      try {
        modalRef.current?.open();

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

  const handlePressAlertOk = useCallback(() => {
    modalRef.current?.close();

    setFormData({
      description: '',
      name: '',
      price: 0,
      categoryId: '',
      quantity: '',
    });

    setPicture(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

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

      await createProduct(data);

      Alert.alert('Boa!', 'Um novo produto foi adicionado com sucesso.', [
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
          'Já existe um produto com esse nome.'
        );

        return;
      }

      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos cadastrar um novo produto, verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }, [formData, createProduct, handlePressAlertOk, picture]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={modalHeight}
        HeaderComponent={<ModalHeader title="Cadastro de produto" />}
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
            onSubmitEditing={() => quantityRef.current?.focus()}
            value={formatCurrency(formData.price)}
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

          <Button title="Cadastrar" loading={loading} onPress={handleSubmit} />
        </Container>
      </Modalize>
    </Portal>
  );
};

export default forwardRef(AddProductModal);
