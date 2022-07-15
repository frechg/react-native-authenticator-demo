import { FORGOT_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from '../common/constants';

// signIn requrest
export const signIn = async (data) => {
  return await fetch(SIGN_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: data})
  })
};

// signUp request
export const signUp = async (data) => {
  return await fetch(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({new_user: data})
  })
};

// passwordReset request
export const passwordReset = async (data) => {
  return await fetch(FORGOT_PASSWORD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: data})
  })
}