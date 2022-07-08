import * as React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Splash } from '../Splash';
import { AuthContext } from '../../../common/contexts/AuthProvider';

describe('<Splash />', () => {
  test('Renders Splash screen', () => {
    const getAuthState = jest.fn();
    render(
      <AuthContext.Provider value={{getAuthState}}>
        <Splash />
      </AuthContext.Provider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('Checks current auth state', () => {
    const getAuthState = jest.fn();
    render(
      <AuthContext.Provider value={{getAuthState}}>
        <Splash />
      </AuthContext.Provider>
    );

    expect(getAuthState).toHaveBeenCalled();
  });
});
