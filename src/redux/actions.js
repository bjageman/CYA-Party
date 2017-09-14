import { createAction } from 'redux-act';
export * from 'user/redux/actions';

export const loading = createAction('A process is currently running')
export const success = createAction('received a success message from the server')
export const error = createAction('received an error message from the server')
export const clear = createAction('Clear the error/success message')
