import * as React from 'react';

const initialAuthState = ({
  isLoading: true,
  isSignout: false,
  authToken: null,
  username: null
});

const authStateReducer = (state, action) => {
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
        username: null
      };
  }
};