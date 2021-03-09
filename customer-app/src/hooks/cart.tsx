import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { formatCurrency } from '~/utils';

import { IProduct } from './products';

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}

interface CartContextData {
  cartProducts: ICartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  addToCart(cartProduct: ICartProduct): void;
  cartProductsQuantity: number;
  cartTotal: string;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);

  const addToCart = useCallback(
    ({ product, quantity }: ICartProduct) => {
      const newCartProducts = [...cartProducts];

      const findProductIndex = cartProducts.findIndex(
        (cartProduct) => product.id === cartProduct.product.id
      );

      if (findProductIndex >= 0) {
        newCartProducts[findProductIndex].quantity =
          newCartProducts[findProductIndex].quantity + quantity;
      } else {
        newCartProducts.push({ product, quantity });
      }

      setCartProducts(newCartProducts);
    },
    [cartProducts]
  );

  const cartProductsQuantity = useMemo(() => {
    return cartProducts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
  }, [cartProducts]);

  const cartTotal = useMemo(() => {
    const total = cartProducts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity * currentValue.product.price;
    }, 0);

    return formatCurrency(total);
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        cartProductsQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

export { CartProvider, useCart };
