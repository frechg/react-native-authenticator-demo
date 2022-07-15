import * as React from 'react';
import * as Api from '../Auth';
import { FORGOT_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from '../../common/constants';

global.fetch = jest.fn().mockResolvedValue({ok: true});

describe('Api for user authentication', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Posts sign in request', async () => {
    const response = await Api.signIn({});

    expect(response.ok).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(SIGN_IN_URL, expect.anything());
  });
  
  test('Posts sign up request', async () => {
    const response = await Api.signUp({});

    expect(response.ok).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(SIGN_UP_URL, expect.anything());
  });
  
  test('Posts password reset request', async () => {
    const response = await Api.passwordReset({});

    expect(response.ok).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(FORGOT_PASSWORD_URL, expect.anything());
  });
});