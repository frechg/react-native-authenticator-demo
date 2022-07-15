import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { ForgotPassword } from '../ForgotPassword';
import { AuthContext } from '../../../common/contexts/AuthProvider';
import * as Api from '../../../services/auth';

jest.spyOn(Alert, 'alert');
jest.mock('../../../services/auth');

describe('<ForgotPassword />', () => {
  beforeEach(() => {
    Api.passwordReset.mockClear();
  });

  test('Render ForgotPassword screen', () => {
    render(
      <ForgotPassword />
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('User submits form with valid data', async () => {
    Api.passwordReset.mockResolvedValue({ok: true});

    render(
      <ForgotPassword />
    );

    const email = 'person@example.com';
    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByText('Request password reset');
    
    fireEvent.changeText(input, email);
    fireEvent.press(button);

    await waitFor(() => {
      expect(Api.passwordReset).toHaveBeenCalledWith({email: email});
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Check your email for a link to reset your password.',
        expect.anything()
      );
    });
  });

  test('User sees error when email is missing', async () => {
    render(
      <ForgotPassword />
    );

    fireEvent.press(screen.getByText('Request password reset'));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeTruthy();
    });
  });

  test('User sees error when email is invalid', async () => {
    render(
      <ForgotPassword />
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'not_an_email');
    fireEvent.press(screen.getByText('Request password reset'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeTruthy();
    });
  });

  test('User sees error when request fails', async () => {
    Alert.alert.mockClear();
    Api.passwordReset.mockResolvedValue({ok: false});
    
    render(
      <ForgotPassword />
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