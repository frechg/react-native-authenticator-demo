import React from 'react';
import { render } from '@testing-library/react-native';

import App from '../App';

jest.useFakeTimers(); // without this, _reactNative.BackHandler.addEventListener causes errors

describe('<App />', () => {
  it('renders correctly', () => {
    const {debug} =render(<App />);
    debug();
  });
});