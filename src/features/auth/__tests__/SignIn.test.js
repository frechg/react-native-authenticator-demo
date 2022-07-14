import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import { SignIn } from '../SignIn';
import { AuthContext } from '../../../common/contexts/AuthProvider';

describe('<SignIn />', () => {
  test('Renders SignIn screen', () => {
    const signIn = jest.fn();    
    render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('User submits form with valid authorization data', async () => {
    const signIn = jest.fn().mockResolvedValue();
    render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    // Setup form data
    const email = 'person@example.com';
    const password = 'testingpass';
    const formData = {email: email, password: password};

    // Get the form elements
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign In');

    // Enter data and submit form
    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(formData);
    });
  });

  test('User submits form without email', async () => {
    const signIn = jest.fn();
    render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );
  
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Required')).toBeDefined();
    });
  });
  
  test('User submits form without password', async () => {
    const signIn = jest.fn();
    render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeDefined();
    });
  });

  test('User sees error when sign in request fails', async () => {
    const errorMessage = 'Sign in failed';
    const signIn = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));
    
    render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeDefined();
    });
  });
});