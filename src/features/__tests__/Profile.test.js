import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { AuthContext } from '../../common/contexts/AuthProvider';
import { Profile } from '../Profile';

describe('<Profile />', () => {
  test('Renders Profile screen', () => {
    const signOut = jest.fn();   
    const authState = {username: 'Person'};
 
    render(
      <AuthContext.Provider value={{authState, signOut}}>
        <Profile />
      </AuthContext.Provider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  test('User can sign out', () => {
    const signOut = jest.fn();   
    const authState = {username: 'Person'};
 
    render(
      <AuthContext.Provider value={{authState, signOut}}>
        <Profile />
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByText('Sign Out'));

    expect(signOut).toHaveBeenCalled();
  });
});