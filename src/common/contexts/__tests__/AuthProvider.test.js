import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthProvider } from '../AuthProvider';
import { jestResetJsReanimatedModule } from 'react-native-reanimated/lib/reanimated2/core';

jest.mock('expo-secure-store');

describe('<AuthProvider/>', () => {
  const TestComponent = () => {
    const { authState, getAuthState } = React.useContext(AuthContext);

    return (
      <View>
        <View>
          { authState.isLoading ? 
            <View>
              <Text>Auth State Loading...</Text>
            </View>
          :
            <View>
              <Text>{ authState.authToken }</Text>
              <Text>{ authState.username }</Text>
            </View>
          }
        </View>
        <Button title='getAuthState' onPress={() => getAuthState()} />
      </View>
    );
  };

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

    expect(screen.getByText('Auth State Loading...')).toBeTruthy();

    fireEvent.press(screen.getByText('getAuthState'));

    await waitFor(() => {
      expect(screen.queryByText('Auth State Loading...')).toBeFalsy();
      expect(screen.getByText(token)).toBeTruthy();
      expect(screen.getByText(username)).toBeTruthy();
    });
  });

  test('provides signIn which updates authState', async () => {
    // Mock SecureStore
    // Mock fetch response object
    // Expect SecureStore to be called 2 times (with authToken and username)
    // Expect authState to be updated
  });

  test('provides signUp which updates authState', async () => {
    // Mock SecureStore
    // Mock fetch response object
    // Expect SecureStore to be called 2 times (with authToken and username)
    // Expect authState to be updated
  });

  test('provides signOut which updates authState', async () => {
    // Mock SecureStore
    // Expect SecureStore to be called 2 times (with authToken and username)
    // Expect authState to be updated
  });

  test('provides passwordReset', async () => {
    // Mock fetch response object
    
    // Render test component
    // Fire password reset

    // Expect fetch to be called
    // Expect a passwordReset return value
  });
});