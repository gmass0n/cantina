import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { api } from '~/services';

interface User {
  id: string;
  name: string;
  email: string;
}

interface IData {
  token: string;
  user: User;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
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
      const [token, user] = await AsyncStorage.multiGet([
        '@CantinaAPP:token',
        '@CantinaAPP:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    await api.post('users', {
      name,
      email,
      password,
    });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('users/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@CantinaAPP:token', token],
      ['@CantinaAPP:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@CantinaAPP:token', '@@CantinaAPP:user']);

    setData({} as IData);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signUp, signIn, signOut, loading }}
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
