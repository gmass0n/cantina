import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { api } from '~/services';

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  address: any | null;
  phoneNumber: string | null;
  document: string;
}

interface IData {
  token: string;
  customer: Customer;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  document: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  customer: Customer;
  loading: boolean;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IData>({} as IData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, customer] = await AsyncStorage.multiGet([
        '@CantinaAPP:token',
        '@CantinaAPP:customer',
      ]);

      if (token[1] && customer[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          customer: JSON.parse(customer[1]),
        });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signUp = useCallback(async ({ name, email, password, document }) => {
    await api.post('/customers', {
      name,
      email,
      password,
      document,
    });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/customers/sessions', {
      email,
      password,
    });

    const { token, customer } = response.data;

    await AsyncStorage.multiSet([
      ['@CantinaAPP:token', token],
      ['@CantinaAPP:customer', JSON.stringify(customer)],
    ]);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, customer });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@CantinaAPP:token',
      '@@CantinaAPP:customer',
    ]);

    setData({} as IData);
  }, []);

  return (
    <AuthContext.Provider
      value={{ customer: data.customer, signUp, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
