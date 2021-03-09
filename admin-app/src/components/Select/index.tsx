import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { Feather } from '@expo/vector-icons';

import {
  OptionsContainer,
  OptionButton,
  Option,
  OptionLabel,
  OptionIcon,
  ValueContainer,
  ValueText,
  SearchInput,
  ModalHeader,
  TextInput,
} from './styles';

export interface ISelectHandles {
  open(): void;
}

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  name: string;
  placeholder: string;
  options: IOption[];
  error?: string;
  style?: StyleProp<ViewStyle>;
  value: string;
  onChangeValue(value: string, name: string): void;
  disabled?: boolean;
  onPress?(event: GestureResponderEvent): void;
}

const Select: React.ForwardRefRenderFunction<ISelectHandles, IProps> = (
  {
    name,
    placeholder,
    options,
    style,
    value,
    onChangeValue,
    onPress,
    disabled,
  },
  ref
) => {
  const modalRef = useRef<Modalize>(null);

  const [filteredOptions, setFilteredOptions] = useState<IOption[] | undefined>(
    undefined
  );

  const open = useCallback(() => {
    modalRef.current?.open();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open,
    };
  });

  const handlePressSelect = useCallback(
    (e) => {
      if (onPress) {
        onPress(e);
      }

      modalRef.current?.open();
    },
    [onPress]
  );

  const handlePressOption = useCallback(
    (itemValue: string) => {
      onChangeValue(itemValue, name);

      modalRef.current?.close();
    },
    [onChangeValue, name]
  );

  const selectValue = useMemo(() => {
    return options.find((option) => option.value === value)?.label;
  }, [options, value]);

  const HeaderComponent = useMemo(() => {
    const handleSearch = (text: string): void => {
      const newOptions = options.filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredOptions(newOptions);
    };

    return (
      <ModalHeader>
        <SearchInput>
          <Feather name="search" color="#999" size={16} />

          <TextInput placeholder="Pesquise aqui" onChangeText={handleSearch} />
        </SearchInput>
      </ModalHeader>
    );
  }, [options]);

  const data = useMemo(() => {
    return filteredOptions || options;
  }, [filteredOptions, options]);

  return (
    <>
      <ValueContainer
        style={disabled ? [{ opacity: 0.7 }, style] : style}
        onPress={handlePressSelect}
        disabled={disabled}
      >
        <ValueText hasValue={!!selectValue}>
          {selectValue || placeholder}
        </ValueText>

        <Feather name="chevron-down" color="#999" size={20} />
      </ValueContainer>

      <Portal>
        <Modalize
          useNativeDriver
          adjustToContentHeight
          ref={modalRef}
          onClosed={() => setFilteredOptions(undefined)}
          HeaderComponent={HeaderComponent}
          scrollViewProps={{
            bounces: false,
            showsVerticalScrollIndicator: false,
          }}
        >
          <OptionsContainer>
            <OptionButton onPress={() => handlePressOption('')}>
              <Option>
                <OptionLabel style={{ color: '#999' }}>
                  {placeholder}
                </OptionLabel>

                <OptionIcon name="chevron-right" color="#999" />
              </Option>
            </OptionButton>

            {data.map((option) => (
              <OptionButton
                key={option.value}
                onPress={() => handlePressOption(option.value)}
              >
                <Option>
                  <OptionLabel>{option.label}</OptionLabel>

                  <OptionIcon name="chevron-right" color="#444" />
                </Option>
              </OptionButton>
            ))}
          </OptionsContainer>
        </Modalize>
      </Portal>
    </>
  );
};

export default forwardRef(Select);
