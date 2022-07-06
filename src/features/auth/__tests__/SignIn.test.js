import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { SignIn } from '../SignIn';
import { AuthContext } from '../../../common/contexts/AuthProvider';

describe('<SignIn />', () => {
  test('Renders expected UI', () => {

    // Convert to a snapshot test?

    const signIn = jest.fn();    
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{signIn}}>
        <SignIn/>
      </AuthContext.Provider>
    );
    const submitButton = getByText('Sign In');
    const emailInput = getByPlaceholderText('Your email');
    const passwordInput = getByPlaceholderText('Your password');

    expect(submitButton).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  test('Sign In calls signIn with form data', () => {
    // Setup SignIn component
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
});