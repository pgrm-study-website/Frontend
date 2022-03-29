import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';

const SET_USER = 'users/SET_USER';
const REGISTER = 'users/REGISTER';
const REGISTER_SUCCESS = 'users/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'users/REGISTER_FAILURE';
const LOGIN = 'users/LOGIN';
const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'users/LOGIN_FAILURE';
const CHECK = 'users/CHECK';
const CHECK_SUCCESS = 'users/CHECK_SUCCESS';
const CHECK_FAILURE = 'users/CHECK_FAILURE';
const LOGOUT = 'users/LOGOUT';

export const setUser = createAction(SET_USER)<usersAPI.userSimpleType>();
export const register = createAction(REGISTER)<usersAPI.userInputType>();
export const registerSuccess =
  createAction(REGISTER_SUCCESS)<usersAPI.userSimpleType>();
export const registerFailure = createAction(REGISTER_FAILURE)<AxiosError>();
export const login =
  createAction(LOGIN)<{ username: string; password: string }>();
export const loginSuccess =
  createAction(LOGIN_SUCCESS)<usersAPI.userSimpleType>();
export const loginFailure = createAction(LOGIN_FAILURE)<AxiosError>();
export const check = createAction(CHECK)();
export const checkSuccess = createAction(CHECK_SUCCESS)();
export const checkFailure = createAction(CHECK_FAILURE)<AxiosError>();
export const logout = createAction(LOGOUT)();

const registerSaga = createRequestSaga(REGISTER, usersAPI.register);
const loginSaga = createRequestSaga(LOGIN, usersAPI.login);
const checkSaga = createRequestSaga(CHECK, usersAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(usersAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* usersSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const actions = {
  setUser,
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  check,
  checkSuccess,
  checkFailure,
  logout,
};
type usersAction = ActionType<typeof actions>;
type usersState = {
  user: usersAPI.userSimpleType | null;
};
const initialState: usersState = {
  user: null,
};

const users = createReducer<usersState, usersAction>(initialState, {
  [SET_USER]: (state, { payload: user }) => ({
    user,
  }),
  [REGISTER_SUCCESS]: (state, { payload: user }) => ({
    user,
  }),
  [REGISTER_FAILURE]: (state, { payload: error }) => {
    alert('register error');
    return state;
  },
  [LOGIN_SUCCESS]: (state, { payload: user }) => ({
    user,
  }),
  [LOGIN_FAILURE]: (state, { payload: error }) => {
    alert('login error');
    return state;
  },
  [CHECK_FAILURE]: () => ({ user: null }),
  [LOGOUT]: () => ({ user: null }),
});

export default users;
