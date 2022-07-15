import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { initialAuthState, authStateReducer } from '../authStateReducer';
import * as Api from '../../services/auth';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [authState, authDispatch] = React.useReducer(authStateReducer, initialAuthState);

  const getAuthState = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const username = await SecureStore.getItemAsync('username');
      authDispatch({type: 'RESTORE_TOKEN', token: token, username: username});
    } catch (error) {
      throw new Error(error);
    }
  };

  const signIn = async (data) => {
    await Api.signIn(data)
    .then(async (response) => {
      if (response.ok) {
        const jsonResponse = await response.json();
        await SecureStore.setItemAsync('authToken', jsonResponse.token);
        await SecureStore.setItemAsync('username', jsonResponse.username);
        authDispatch({type: 'SIGN_IN', token: jsonResponse.token, username: jsonResponse.username});
      } else {
        throw new Error('Email or password are incorrect.');
      }
    })
  };

  const signUp = async (data) => {
    await Api.signUp(data)
    .then(async (response) => {
      if (response.ok) {
        const jsonResponse = await response.json();
        await SecureStore.setItemAsync('authToken', jsonResponse.token);
        await SecureStore.setItemAsync('username', jsonResponse.username);
        authDispatch({type: 'SIGN_IN', token: jsonResponse.token, username: jsonResponse.username});
      } else {
        const jsonResponse = await response.json();
        throw new Error(jsonResponse.errors[0])
      }
    });
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('username');
      authDispatch({type: 'SIGN_OUT'});
    } catch (error) {
      throw new Error(error);
    }
  };

  const contextValue = React.useMemo(() => {
    return {authState, getAuthState, signUp, signIn, signOut};
  }, [authState]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};