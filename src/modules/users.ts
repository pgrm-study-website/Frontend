import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';

const CHANGE_FIELD = 'users/CHANGE_FIELD';
const SIGNUP = 'users/SIGNUP';
const SIGNUP_SUCCESS = 'users/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'users/SIGNUP_FAILURE';
const LOGIN = 'users/LOGIN';
const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'users/LOGIN_FAILURE';
const CHECK = 'users/CHECK';
const CHECK_SUCCESS = 'users/CHECK_SUCCESS';
const CHECK_FAILURE = 'users/CHECK_FAILURE';
const LOGOUT = 'users/LOGOUT';
const SEND_AUTH_EMAIL = 'users/SEND_AUTH_EMAIL';
const SEND_AUTH_EMAIL_SUCCESS = 'users/SEND_AUTH_EMAIL_SUCCESS';
const SEND_AUTH_EMAIL_FAILURE = 'users/SEND_AUTH_EMAIL_FAILURE';
const CHECK_AUTH_EMAIL = 'users/CHECK_AUTH_EMAIL';
const CHECK_AUTH_EMAIL_SUCCESS = 'users/CHECK_AUTH_EMAIL_SUCCESS';
const CHECK_AUTH_EMAIL_FAILURE = 'users/CHECK_AUTH_EMAIL_FAILURE';
const READ = 'users/READ';
const READ_SUCCESS = 'users/READ_SUCCESS';
const READ_FAILURE = 'users/READ_FAILURE';
const UPDATE = 'users/UPDATE';
const UPDATE_SUCCESS = 'users/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'users/UPDATE_FAILURE';
const REMOVE = 'users/REMOVE';
const REMOVE_SUCCESS = 'users/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'users/REMOVE_FAILURE';
const CHECK_PASSWORD = 'users/CHECK_PASSWORD';
const CHECK_PASSWORD_SUCCESS = 'users/CHECK_PASSWORD_SUCCESS';
const CHECK_PASSWORD_FAILURE = 'users/CHECK_PASSWORD_FAILURE';
const CHANGE_PASSWORD = 'users/CHANGE_PASSWORD';
const CHANGE_PASSWORD_SUCCESS = 'users/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILURE = 'users/CHANGE_PASSWORD_FAILURE';

export const changeField =
  createAction(CHANGE_FIELD)<{ key: string; value: any }>();
export const signup = createAction(SIGNUP)<usersAPI.signupRequestType>();
export const signupSuccess =
  createAction(SIGNUP_SUCCESS)<usersAPI.simpleResponseType>();
export const signupFailure = createAction(SIGNUP_FAILURE)<AxiosError>();
export const login = createAction(LOGIN)<usersAPI.loginRequestType>();
export const loginSuccess = createAction(LOGIN_SUCCESS)<any>();
export const loginFailure = createAction(LOGIN_FAILURE)<AxiosError>();
export const check = createAction(CHECK)();
export const checkSuccess = createAction(CHECK_SUCCESS)();
export const checkFailure = createAction(CHECK_FAILURE)<AxiosError>();
export const logout = createAction(LOGOUT)();
export const sendAuthEmail =
  createAction(SEND_AUTH_EMAIL)<usersAPI.sendAuthEmailRequestType>();
export const sendAuthEmailSuccess = createAction(SEND_AUTH_EMAIL_SUCCESS)();
export const sendAuthEmailFailure = createAction(
  SEND_AUTH_EMAIL_FAILURE,
)<AxiosError>();
export const checkAuthEmail =
  createAction(CHECK_AUTH_EMAIL)<usersAPI.checkAuthEmailRequestType>();
export const checkAuthEmailSuccess = createAction(
  CHECK_AUTH_EMAIL_SUCCESS,
)<boolean>();
export const checkAuthEmailFailure = createAction(
  CHECK_AUTH_EMAIL_FAILURE,
)<AxiosError>();
export const read = createAction(READ)<number>();
export const readSuccess =
  createAction(READ_SUCCESS)<usersAPI.readResponseType>();
export const readFailure = createAction(READ_FAILURE)<AxiosError>();
export const update = createAction(UPDATE)<usersAPI.updateRequestType>();
export const updateSuccess = createAction(UPDATE_SUCCESS)();
export const updateFailure = createAction(UPDATE_FAILURE)<AxiosError>();
export const remove = createAction(REMOVE)<number>();
export const removeSuccess = createAction(REMOVE_SUCCESS)();
export const removeFailure = createAction(REMOVE_FAILURE)<AxiosError>();
export const checkPassword =
  createAction(CHECK_PASSWORD)<usersAPI.passwordRequsetType>();
export const checkPasswordSuccess = createAction(
  CHECK_PASSWORD_SUCCESS,
)<boolean>();
export const checkPasswordFailure = createAction(
  CHECK_PASSWORD_FAILURE,
)<AxiosError>();
export const changePassword =
  createAction(CHANGE_PASSWORD)<usersAPI.passwordRequsetType>();
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS)();
export const changePasswordFailure = createAction(
  CHANGE_PASSWORD_FAILURE,
)<AxiosError>();

const signupSaga = createRequestSaga(SIGNUP, usersAPI.signup);
const loginSaga = createRequestSaga(LOGIN, usersAPI.login);
const checkSaga = createRequestSaga(CHECK, usersAPI.check);
const sendAuthEmailSaga = createRequestSaga(
  SEND_AUTH_EMAIL,
  usersAPI.sendAuthEmail,
);
const checkAuthEmailSaga = createRequestSaga(
  CHECK_AUTH_EMAIL,
  usersAPI.checkAuthEmail,
);
const readSaga = createRequestSaga(READ, usersAPI.read);
const updateSaga = createRequestSaga(UPDATE, usersAPI.update);
const removeSaga = createRequestSaga(REMOVE, usersAPI.remove);
const checkPasswordSaga = createRequestSaga(
  CHECK_PASSWORD,
  usersAPI.checkPassword,
);
const changePasswordSaga = createRequestSaga(
  CHANGE_PASSWORD,
  usersAPI.changePassword,
);
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
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(SEND_AUTH_EMAIL, sendAuthEmailSaga);
  yield takeLatest(CHECK_AUTH_EMAIL, checkAuthEmailSaga);
  yield takeLatest(READ, readSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(CHECK_PASSWORD, checkPasswordSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

const actions = {
  changeField,
  signup,
  signupSuccess,
  signupFailure,
  login,
  loginSuccess,
  loginFailure,
  check,
  checkSuccess,
  checkFailure,
  logout,
  sendAuthEmail,
  sendAuthEmailSuccess,
  sendAuthEmailFailure,
  checkAuthEmail,
  checkAuthEmailSuccess,
  checkAuthEmailFailure,
  read,
  readSuccess,
  readFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  checkPassword,
  checkPasswordSuccess,
  checkPasswordFailure,
  changePassword,
  changePasswordSuccess,
  changePasswordFailure,
};

type usersAction = ActionType<typeof actions>;
type usersState = {
  user: usersAPI.simpleResponseType | null;
  authEmail: boolean | null;
  read: {
    data: usersAPI.readResponseType | null;
    error: AxiosError | null;
  };
  update: boolean | null;
  remove: boolean | null;
  checkPassword: boolean | null;
  changePassword: boolean | null;
};
const initialState: usersState = {
  user: null,
  authEmail: null,
  read: {
    data: null,
    error: null,
  },
  update: null,
  remove: null,
  checkPassword: null,
  changePassword: null,
};

const users = createReducer<usersState, usersAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
  [SIGNUP]: state => ({
    ...state,
    user: null,
  }),
  [SIGNUP_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [SIGNUP_FAILURE]: (state, { payload }) => {
    alert('signup error');
    console.dir(payload);
    return state;
  },
  [LOGIN]: state => ({
    ...state,
    user: null,
  }),
  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload.data,
  }),
  [LOGIN_FAILURE]: (state, { payload }) => {
    alert('login error');
    console.dir(payload);
    return state;
  },
  [CHECK_FAILURE]: state => ({
    ...state,
    user: null,
  }),
  [LOGOUT]: state => ({
    ...state,
    user: null,
  }),
  [SEND_AUTH_EMAIL_FAILURE]: (state, { payload }) => {
    alert('sendAuthEmail error');
    console.dir(payload);
    return state;
  },
  [CHECK_AUTH_EMAIL]: state => ({
    ...state,
    authEmail: null,
  }),
  [CHECK_AUTH_EMAIL_SUCCESS]: (state, { payload }) => ({
    ...state,
    authEmail: payload,
  }),
  [CHECK_AUTH_EMAIL_FAILURE]: (state, { payload }) => {
    alert('checkAuthEmail error');
    console.dir(payload);
    return {
      ...state,
      authEmail: false,
    };
  },
  [READ]: state => ({
    ...state,
    read: {
      data: null,
      error: null,
    },
  }),
  [READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    read: {
      data: payload,
      error: null,
    },
  }),
  [READ_FAILURE]: (state, { payload }) => {
    alert('read error');
    console.dir(payload);
    return {
      ...state,
      read: {
        data: null,
        error: payload,
      },
    };
  },
  [UPDATE]: state => ({
    ...state,
    update: null,
  }),
  [UPDATE_SUCCESS]: state => ({
    ...state,
    update: true,
  }),
  [UPDATE_FAILURE]: (state, { payload }) => {
    alert('update error');
    console.dir(payload);
    return {
      ...state,
      update: false,
    };
  },
  [REMOVE]: state => ({
    ...state,
    remove: null,
  }),
  [REMOVE_SUCCESS]: state => ({
    ...state,
    remove: true,
  }),
  [REMOVE_FAILURE]: (state, { payload }) => {
    alert('remove error');
    console.dir(payload);
    return {
      ...state,
      remove: false,
    };
  },
  [CHECK_PASSWORD]: state => ({
    ...state,
    checkPassword: null,
  }),
  [CHECK_PASSWORD_SUCCESS]: (state, { payload }) => ({
    ...state,
    checkPassword: payload,
  }),
  [CHECK_PASSWORD_FAILURE]: (state, { payload }) => {
    alert('checkPassword error');
    console.dir(payload);
    return {
      ...state,
      checkPassword: false,
    };
  },
  [CHANGE_PASSWORD]: state => ({
    ...state,
    changePassword: null,
  }),
  [CHANGE_PASSWORD_SUCCESS]: state => ({
    ...state,
    changePassword: true,
  }),
  [CHANGE_PASSWORD_FAILURE]: (state, { payload }) => {
    alert('changePassword error');
    console.dir(payload);
    return {
      ...state,
      changePassword: false,
    };
  },
});

export default users;
