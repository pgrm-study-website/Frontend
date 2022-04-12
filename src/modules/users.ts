// import는 웬만하면 아래랑 똑같이 사용합니다. 가져오는 API 함수들만 바꿔주세요.
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';

/*
  액션 타입

  액션 타입은 문자열로 '파일명/변수명'으로 지정하기로 합니다.
  요청을 보내고, 응답의 성공/실패 여부가 영향을 주는 경우에는 그 액션의
  SUCCESS 및 FAILURE도 함께 만듭니다.
*/
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

/*
  액션

  createAction([ACTION TYPE])<[PARAMETER TYPE]>?(); 로 만듭니다.
  파라미터에 아무것도 들어가지 않으면 <> 는 쓰지 않습니다.

  ...Success의 parameter은 any(혹은 빈 칸)로 합니다.
  ...Failure의 parameter은 AxiosError로 합니다.

  changeField를 아래처럼 구현하면 수동으로 state를 조작할 수 있습니다.
  (꼭 필요할 때만 사용합니다.)
*/
export const changeField =
  createAction(CHANGE_FIELD)<{ key: string; value: any }>();
export const signup = createAction(SIGNUP)<usersAPI.signupRequestType>();
export const signupSuccess = createAction(SIGNUP_SUCCESS)<any>();
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
export const checkAuthEmailSuccess = createAction(CHECK_AUTH_EMAIL_SUCCESS)();
export const checkAuthEmailFailure = createAction(
  CHECK_AUTH_EMAIL_FAILURE,
)<AxiosError>();
export const read = createAction(READ)<number>();
export const readSuccess = createAction(READ_SUCCESS)<any>();
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

/*
  Redux-Saga

  특정 액션 타입이 불리면, 그에 해당하는 API를 호출합니다.
  createRequestSaga에서 이미 구현되어 있습니다.

  SIGNUP 액션이 실행되면, 자동으로 usersAPI.signup을 호출하고,
  state의 loading[users/LOGIN]을 true로 바꾼 뒤,
  결과에 따라 SIGNUP_SUCCESS or SIGNUP_FAILURE 액션을 실행하고,
  state의 loading[users/LOGIN]을 false로 바꿉니다.
*/
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
// 단순히 API 호출만 하지 않고 추가적으로 뭔가 실행하려면 수동으로 구현합니다.
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

// 모든 Saga를 모아서 하나로 만듭니다.
// takeLatest 는 액션이 연속적으로 실행되어도 마지막 명령만 실행시킵니다.
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

// 모든 action의 type을 저장합니다.
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

// 리덕스 state를 구현합니다.
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
// 초기 state입니다.
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

/*
  Reducer

  액션이 실행되면 payload에 따라 state를 변경합니다.
  변경되는 state 객체는 완전히 새로운 객체여야 합니다.
  state.user = {id: 1, ...} 처럼 변경하면 안 되고,
  {...state, user: {id: 1, ...}} 처럼 새로 만들어서 리턴합니다.
*/
const users = createReducer<usersState, usersAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
    // ex) changeField({key: user, value: {id: 1, ...}})로 호출
  }),
  [SIGNUP]: state => ({
    ...state,
    user: null,
    // 회원가입을 시작하면, 일단 user 데이터를 비운다
  }),
  [SIGNUP_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload.data,
    // 회원가입 성공: API 응답 값 중 원하는 부분을 state에 저장
  }),
  [SIGNUP_FAILURE]: (state, { payload }) => {
    alert(payload.response?.data.message);
    return state;
    // 회원가입 실패: 에러 메시지를 띄우고, state는 변화 없이 리턴
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
    alert(payload.response?.data.message);
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
    alert(payload.response?.data.message);
    return state;
  },
  [CHECK_AUTH_EMAIL]: state => ({
    ...state,
    authEmail: null,
  }),
  [CHECK_AUTH_EMAIL_SUCCESS]: state => ({
    ...state,
    authEmail: true,
  }),
  [CHECK_AUTH_EMAIL_FAILURE]: (state, { payload }) => {
    alert(payload.response?.data.message);
    return {
      ...state,
      authEmail: false,
    };
  },

  // 아래부턴 테스트되지 않았음
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
    alert(payload.response?.data.message);
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
    alert(payload.response?.data.message);
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
    alert(payload.response?.data.message);
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
    alert(payload.response?.data.message);
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
    alert(payload.response?.data.message);
    return {
      ...state,
      changePassword: false,
    };
  },
});

export default users;
