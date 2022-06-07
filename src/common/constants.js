import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.API_URL;

export const SIGN_IN_URL = `${API_URL}/authenticate`;
export const SIGN_UP_URL = `${API_URL}/signup`;
export const FORGOT_PASSWORD_URL = `${API_URL}/passwords`;