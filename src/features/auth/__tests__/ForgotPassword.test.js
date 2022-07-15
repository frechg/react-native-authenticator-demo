import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { ForgotPassword } from '../ForgotPassword';
import { AuthContext } from '../../../common/contexts/AuthProvider';

jest.spyOn(Alert, 'alert');

describe('<ForgotPassword />', () => {
  test('Render ForgotPassword screen', () => {
    const passwordReset = jest.fn();
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('User submits form with valid data', async () => {
    const passwordReset = jest.fn().mockResolvedValue({ok: true});


    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    const email = 'person@example.com';
    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByText('Request password reset');
    
    fireEvent.changeText(input, email);
    fireEvent.press(button);

    await waitFor(() => {
      expect(passwordReset).toHaveBeenCalledWith({email: email});
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Check your email for a link to reset your password.',
        expect.anything()
      );
    });
  });

  test('User sees error when email is missing', async () => {
    const passwordReset = jest.fn();
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByText('Request password reset'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeTruthy();
    });
  });

  test('User sees error when email is invalid', async () => {
    const passwordReset = jest.fn();
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'not_an_email');
    fireEvent.press(screen.getByText('Request password reset'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeTruthy();
    });
  });

  test('User sees error when request fails', async () => {
    Alert.alert.mockClear();
    const passwordReset = jest.fn().mockResolvedValue({ok: false});
    
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.press(screen.getByText('Request password reset'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Password reset rquest failed.');
    });
  });
});