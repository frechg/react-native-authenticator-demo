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

  test('User submits form with valid authorization data', () => {
    const signIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    // Setup form data
    const email = 'person@example.com';
    const password = 'testingpass';
    const formData = {email: email, password: password};

    // Get the form elements
    const emailInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');
    const submitButton = getByText('Sign In');

    // Enter data and submit form
    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(submitButton);

    expect(signIn).toHaveBeenCalledWith(formData);
  });

  test('User submits form without email', () => {
    const signIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );
  
    fireEvent.changeText(getByPlaceholderText('Your password'), 'testingpass');
    fireEvent.press(getByText('Sign In'));
  
    expect(getByText('Email is required')).toBeDefined();
  });
  
  test('User submits form without password', () => {
    const signIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Your email'), 'person@example.com');
    fireEvent.press(getByText('Sign In'));

    expect(getByText('Password is required')).toBeDefined();
  });

  test('User sees error when sign in request fails', async () => {
    // Mock signIn to reject with an error
    const errorMessage = 'Sign in failed';
    const signIn = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));
    
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      // Enter data and submit form
      fireEvent.changeText(getByPlaceholderText('Your email'), 'person@example.com');
      fireEvent.changeText(getByPlaceholderText('Your password'), 'testingpass');
      fireEvent.press(getByText('Sign In'));
      
      expect(getByText(errorMessage)).toBeDefined();
    });
  });
});