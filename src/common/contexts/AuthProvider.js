import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { FORGOT_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from '../constants';
import { initialAuthState, authStateReducer } from '../authStateReducer';

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
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: { email: data.email, password: data.password }})
    })
    if (response.ok) {
      const jsonResponse = await response.json();
      await SecureStore.setItemAsync('authToken', jsonResponse.token);
      await SecureStore.setItemAsync('username', jsonResponse.username);
      authDispatch({type: 'SIGN_IN', token: jsonResponse.token, username: jsonResponse.username});
    } else {
      throw new Error('Email or password are incorrect.');
    }
  };

  const signUp = async (data) => {
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_user: { ...data }})
    })
    if (response.ok) {
      const jsonResponse = await response.json();
      await SecureStore.setItemAsync('authToken', jsonResponse.token);
      await SecureStore.setItemAsync('username', jsonResponse.username);
      authDispatch({type: 'SIGN_IN', token: jsonResponse.token, username: jsonResponse.username});
    } else {
      const jsonResponse = await response.json();
      throw new Error(jsonResponse.errors[0])
    }
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

  const passwordReset = async (data) => {
    const response = await fetch(FORGOT_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password: data})
    })

    if (response.ok) {
      console.log('Mocked value resolved as expected');
      return true;
    } else {
      return false;
    }
  }

  const contextValue = React.useMemo(() => {
    return {authState, getAuthState, signUp, signIn, signOut, passwordReset};
  }, [authState]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};