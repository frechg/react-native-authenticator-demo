import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { AuthContext } from '../../../common/contexts/AuthProvider';
import { Navigation } from '../index';

describe('<Navigation /> renders multiple states', () => {
  test('Renders with Splash screen when authState set to loading', () => {
    const authState = {isLoading: true};
    const getAuthState = jest.fn();
    render(
      <AuthContext.Provider value={{authState, getAuthState}}>
        <Navigation />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('Renders SignIn if auth token not present', () => {
       const authState = {isLoading: false, authToken: null};
       render(
         <AuthContext.Provider value={{authState}}>
           <Navigation />
         </AuthContext.Provider>
       );

       expect(screen.getByText('Sign In')).toBeTruthy();
  });

  test('Renders Profile if an auth token is present', () => {
    const authState = {isLoading: false, authToken: 123};
    render(
      <AuthContext.Provider value={{authState}}>
        <Navigation />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Welcome')).toBeTruthy();
  });
});

describe('<Navigation /> allows user to navigate between screens', () => {
  test('User navigates from SignIn to SignUp', () => {
    const authState = {isLoading: false, authToken: null};
    render(
      <AuthContext.Provider value={{authState}}>
        <Navigation />
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByText('Create Account'));

    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  test('User navigates from SignIn to ForgotPassword', () => {
    const authState = {isLoading: false, authToken: null};
    render(
      <AuthContext.Provider value={{authState}}>
        <Navigation />
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByText('Forgot Password'));

    expect(screen.getByText('Request password reset')).toBeTruthy();
  });
});