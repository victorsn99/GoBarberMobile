import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string,
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(crendentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); //burrlar tipagem

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true); //estado de carregamento da aplicação

  useEffect(() => {
      async function loadStoragedData(): Promise<void> {
        const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;
          setData({ token: token[1], user: JSON.parse(user[1]) });
        }
        setLoading(false);
      }
      loadStoragedData();
  }, []);

  const signIn = useCallback(async({ email, password }) => {
    
    const response = await api.post('/session/auth', { 
      email,
      password,
    });
    const { token, user } = response.data;

    console.log("RESPONSE.DATA: ", response.data);

    await AsyncStorage.multiSet([['@GoBarber:token', token], ['@GoBarber:user', JSON.stringify(user)]]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({user, token} as AuthState);
  }, []);

  const signOut = useCallback(async() => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('UseAuth must be use within an authprovider');
  }

  return context;
}
