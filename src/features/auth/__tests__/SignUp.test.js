import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import { SignUp } from '../SignUp';
import { AuthContext } from '../../../common/contexts/AuthProvider';

describe('<SignUp />', () => {
  test('Renders SignUp screen', () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('User submits form with valid account data', () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    // Setup account data
    const username = 'person';
    const email = 'person@email.com';
    const password = 'testingpass';

    // Enter and submit account data
    fireEvent.changeText(screen.getByPlaceholderText('Username'), username);
    fireEvent.changeText(screen.getByPlaceholderText('Email'), email);
    fireEvent.changeText(screen.getByPlaceholderText('Password'), password);
    fireEvent.press(screen.getByText('Sign Up'));

    // Expect account data to be submitted
    expect(signUp).toHaveBeenCalledWith({email: email, password: password, username: username});
  });

  test('User submits form without username', () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    // Enter and submit account data
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@email.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign Up'));

    // Expect account data to be submitted
    expect(screen.getByText('Username is required')).toBeTruthy();
  });

  test('User submits form without email', () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    // Enter and submit account data
    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign Up'));

    // Expect account data to be submitted
    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  test('User submits form without password', () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    // Enter and submit account data
    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.press(screen.getByText('Sign Up'));

    // Expect account data to be submitted
    expect(screen.getByText('Password is required')).toBeTruthy();
  });

  test('User sees error when sign up request fails', async () => {
    const errorMessage = 'Sign up failed';
    const signUp = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));
    
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      // Enter and submit account data
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
      fireEvent.press(screen.getByText('Sign Up'));

      // Expect account data to be submitted
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});