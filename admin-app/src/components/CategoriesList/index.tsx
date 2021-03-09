import React, { useRef } from 'react';

import { ICategory } from '~/hooks/categories';

import ListEmpty from '../ListEmpty';
import UpdateCategoryModal, {
  IUpdateCategoryModalHandles,
} from '../UpdateCategoryModal';
import {
  Container,
  Categories,
  Category,
  CategoryPicture,
  CategoryName,
  LoadingContainer,
  LoadingSkeleton,
} from './styles';

interface IProps {
  categories: ICategory[];
  ListHeader?: JSX.Element;
  loading?: boolean;
}

const CategoriesList: React.FC<IProps> = ({
  categories,
  ListHeader,
  loading,
}) => {
  const updateCategoryModalRef = useRef<IUpdateCategoryModalHandles>(null);

  return (
    <Container>
      {!!ListHeader && ListHeader}

      {loading ? (
        <LoadingContainer>
          <LoadingSkeleton />

          <LoadingSkeleton />
        </LoadingContainer>
      ) : (
        <Categories
          data={categories}
          keyExtractor={(category) => category.id}
          ListEmptyComponent={
            <ListEmpty content="Você não adicionou nenhuma categoria." />
          }
          renderItem={({ item: category }) => (
            <Category
              onPress={() =>
                updateCategoryModalRef.current?.openModal(category.id)
              }
            >
              <CategoryPicture
                source={{ uri: category.picture || undefined }}
              />

              <CategoryName>{category.name}</CategoryName>
            </Category>
          )}
        />
      )}

      <UpdateCategoryModal ref={updateCategoryModalRef} />
    </Container>
  );
};

export default CategoriesList;
