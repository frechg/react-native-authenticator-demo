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

  test('User submits form with valid account data', async () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    const username = 'person';
    const email = 'person@email.com';
    const password = 'testingpass';

    fireEvent.changeText(screen.getByPlaceholderText('Username'), username);
    fireEvent.changeText(screen.getByPlaceholderText('Email'), email);
    fireEvent.changeText(screen.getByPlaceholderText('Password'), password);
    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({username: username, email: email, password: password});
    });
  });

  test('User submits form without username', async () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@email.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeTruthy();
    });
  });

  test('User submits form without email', async () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeTruthy();
    });
  });

  test('User submits form without password', async () => {
    const signUp = jest.fn();
    render(
      <AuthContext.Provider value={{signUp}}>
        <SignUp />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeTruthy();
    });
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

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Person');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testingpass');
    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});