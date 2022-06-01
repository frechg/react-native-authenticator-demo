import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { AUTH_API } from '../constants';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [authState, authDispatch] = React.useReducer(
    (state, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...state,
            isLoading: false,
            authToken: action.token,
            username: action.username
          };
        case 'SIGN_IN':
          return {
            ...state,
            isSignout: false,
            authToken: action.token,
            username: action.username
          };
        case 'SIGN_OUT':
          return {
            ...state,
            isSignout: true,
            authToken: null,
            username: ''
          };
      }
    }, 
    {
      isLoading: true,
      isSignout: false,
      authToken: null,
      username: ''
    }
  );

  const getAuthState = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const username = await SecureStore.getItemAsync('username');
      authDispatch({ type: 'RESTORE_TOKEN', token: token, username: username });
    } catch (error) {
      throw new Error(error);
    }
  };

  const signIn = async (data) => {
    const response = await fetch(AUTH_API.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({user: { email: data.email, password: data.password }})
    })
    if (response.ok) {
      const jsonResponse = await response.json();
      await SecureStore.setItemAsync('authToken', jsonResponse.token);
      await SecureStore.setItemAsync('username', jsonResponse.username);
      authDispatch({ type: 'SIGN_IN', token: jsonResponse.token, username: jsonResponse.username});
    } else {
      throw new Error('Email or password are incorrect.');
    }
  };

  const signUp = async (data) => {
    const response = await fetch(AUTH_API.SIGN_UP, {
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
}

export default AuthProvider;