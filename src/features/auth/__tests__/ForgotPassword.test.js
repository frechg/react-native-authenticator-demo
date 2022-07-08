import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

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

  test('User submits form with valid data', () => {
    const passwordReset = jest.fn();
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    // Submit form data
    const email = 'person@example.com';
    fireEvent.changeText(screen.getByPlaceholderText('Email'), email);
    fireEvent.press(screen.getByText('Request Password Reset'));

    expect(passwordReset).toHaveBeenCalledWith(email);
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
    const errorMessage = 'Request failed';
    const passwordReset = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage))
    
    render(
      <AuthContext.Provider value={{passwordReset}}>
        <ForgotPassword />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'person@example.com');
      fireEvent.press(screen.getByText('Request Password Reset'));

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});