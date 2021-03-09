/* eslint-disable no-undef */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';

import { api } from '~/services';

import { theme } from '~/styles';

import { Container, Image } from './styles';

interface IProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImagePicker: React.FC<IProps> = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setImage(null);
  }, [setImage]);

  const handleSelectImage = useCallback(async () => {
    try {
      setLoading(true);

      const { uri, cancelled } = (await ExpoImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }
      )) as {
        uri: string;
        cancelled: boolean;
        type: 'string';
      };

      if (!cancelled) {
        const fileName = uri.split('/').pop() as string;

        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;

        const fileData = new FormData() as any;

        fileData.append('file', {
          uri,
          type,
          name: fileName,
        });

        const response = await api.post('files', fileData);

        setImage(response.data.fileUrl);
      }
    } catch (error) {
      Alert.alert(
        'Ops, ocorreu um erro!',
        'Não conseguimos fazer o upload da imagem desejada.'
      );
    } finally {
      setLoading(false);
    }
  }, [setImage]);

  const ImageComponent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator color={theme.palette.text} size="large" />;
    }

    if (image) {
      return <Image source={{ uri: image }} />;
    }

    return <Feather name="image" color="#999" size={50} />;
  }, [image, loading]);

  return <Container onPress={handleSelectImage}>{ImageComponent}</Container>;
};

export default ImagePicker;
