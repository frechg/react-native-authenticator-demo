import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthProvider } from '../AuthProvider';
import { FORGOT_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from '../../constants';

jest.mock('expo-secure-store');
global.fetch = jest.fn();

const TestComponent = (props) => {
  const { authState, getAuthState, signIn, signUp, signOut, passwordReset } = React.useContext(AuthContext);
  return (
    <View>
      <View>
        <Text>{ authState.isLoading ? 'Loading...' : '' }</Text>
        <Text>{ authState.isSignout ? 'Signed Out' : '' }</Text>
        <Text>{ authState.authToken }</Text>
        <Text>{ authState.username }</Text>
      </View>
      <Button title='Get State' onPress={() => getAuthState()} />
      <Button title='Sign In' onPress={() => signIn({})} />
      <Button title='Sign Up' onPress={() => signUp({})} />
      <Button title='Sign Out' onPress={() => signOut()} />
      <Button title='Password Reset' onPress={() => passwordReset({})} />
    </View>
  );
};

describe('<AuthProvider/>', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('provides getAuthState which updates authState', async () => {
    const token = '123';
    const username = 'person';
    SecureStore.getItemAsync
      .mockResolvedValueOnce(token)
      .mockResolvedValueOnce(username);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeTruthy();

    fireEvent.press(screen.getByText('Get State'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeFalsy();
      expect(screen.getByText(token)).toBeTruthy();
      expect(screen.getByText(username)).toBeTruthy();
    });
  });

  test('provides signIn which updates authState', async () => {
    const token = '123';
    const username = 'person';

    fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({token: token, username: username}),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(SIGN_IN_URL, expect.anything());
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('authToken', token);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('username', username);
      expect(screen.getByText(token)).toBeTruthy();
      expect(screen.getByText(username)).toBeTruthy();
    });
  });

  test('provides signUp which updates authState', async () => {
    const token = '123';
    const username = 'person';

    fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({token: token, username: username}),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(SIGN_UP_URL, expect.anything());
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('authToken', token);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('username', username);
      expect(screen.getByText(token)).toBeTruthy();
      expect(screen.getByText(username)).toBeTruthy();
    });
  });

  test('provides signOut which updates authState', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.queryByText('Signed Out')).toBeFalsy();

    fireEvent.press(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(2);
      expect(screen.getByText('Signed Out')).toBeTruthy();
    });
  });

  test('provides passwordReset', async () => {
    fetch.mockResolvedValue({ok: true});
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByText('Password Reset'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(FORGOT_PASSWORD_URL, expect.anything());
    });
  });
});