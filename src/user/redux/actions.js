import { createAction } from 'redux-act';

export const register = createAction('Register the new user');
export const login = createAction('Login the user');
export const loginSuccess = createAction('Login Succeeded');

export const logout = createAction('Logout the user');

export const getUser = createAction('Get User info')
