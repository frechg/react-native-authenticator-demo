import * as React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';

import { ForgotPassword } from '../ForgotPassword';
import { AuthContext } from '../../../common/contexts/AuthProvider';

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
    const passwordReset = jest.fn().mockResolvedValue(true);

    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    const email = 'person@example.com';
    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByText('Request Password Reset');
    
    fireEvent.changeText(input, email);
    fireEvent.press(button);

    expect(passwordReset).toHaveBeenCalledWith(email);

    await waitFor(() => {
      expect(screen.getByText('Check your email for a link to reset your password.')).toBeTruthy();
    });
  });

  test('User sees error when email is missing', () => {
    const passwordReset = jest.fn();
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByText('Request Password Reset'));

    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  test('User sees error when request fails', async () => {
    const passwordReset = jest.fn().mockResolvedValue(false);
    
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
    fireEvent.press(screen.getByText('Request Password Reset'));

    await waitFor(() => {
      expect(screen.getByText('Sorry, something went wrong.')).toBeTruthy();
    });
  });
});