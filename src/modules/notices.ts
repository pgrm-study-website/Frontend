import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as noticeAPI from 'lib/api/notice';
/*
  액션 타입

  액션 타입은 문자열로 '파일명/변수명'으로 지정하기로 합니다.
  요청을 보내고, 응답의 성공/실패 여부가 영향을 주는 경우에는 그 액션의
  SUCCESS 및 FAILURE도 함께 만듭니다.
*/
const TEST = 'notices/test';
const NOTICE_CREATE = 'notices/NOTICE_CREATE';
const NOTICE_CREATE_SUCCESS = 'notices/NOTICE_CREATE_SUCCESS';
const NOTICE_CREATE_FAILURE = 'notices/NOTICE_CREATE_FAILURE';
const NOTICE_READ = 'notices/NOTICE_READ';
const NOTICE_READ_SUCCESS = 'notices/NOTICE_READ_SUCCESS';
const NOTICE_READ_FAILURE = 'notices/NOTICE_READ_FAILURE';
const NOTICE_READ_ONE = 'notices/NOTICE_READ_ONE';
const NOTICE_READ_ONE_SUCCESS = 'notices/NOTICE_READ_ONE_SUCCESS';
const NOTICE_READ_ONE_FAILURE = 'notices/NOTICE_READ_ONE_FAILURE';
const NOTICE_DELETE = 'notices/NOTICE_DELETE';
const NOTICE_DELETE_SUCCESS = 'notices/NOTICE_DELETE_SUCCESS';
const NOTICE_DELETE_FAILURE = 'notices/NOTICE_DELETE_FAILURE';
const NOTICE_DELETE_ONE = 'notices/NOTICE_DELETE';
const NOTICE_DELETE_ONE_SUCCESS = 'notices/NOTICE_DELETE_ONE_SUCCESS';
const NOTICE_DELETE_ONE_FAILURE = 'notices/NOTICE_DELETE_ONE_FAILURE';

/*
  액션

  createAction([ACTION TYPE])<[PARAMETER TYPE]>?(); 로 만듭니다.
  파라미터에 아무것도 들어가지 않으면 <> 는 쓰지 않습니다.

  ...Success의 parameter은 any(혹은 빈 칸)로 합니다.
  ...Failure의 parameter은 AxiosError로 합니다.

  changeField를 아래처럼 구현하면 수동으로 state를 조작할 수 있습니다.
  (꼭 필요할 때만 사용합니다.)
*/
// create : 입력된 회원정보 (id?)
export const test = createAction(TEST)();

export const noticeCreate = createAction(NOTICE_CREATE)();
export const noticeCreateSuccess = createAction(NOTICE_CREATE_SUCCESS)();
export const noticeCreateFailure = createAction(
  NOTICE_CREATE_FAILURE,
)<AxiosError>();
export const noticeRead = createAction(NOTICE_READ)();
export const noticeReadSuccess = createAction(NOTICE_READ_SUCCESS)();
export const noticeReadFailure =
  createAction(NOTICE_READ_FAILURE)<AxiosError>();
export const noticeReadOne = createAction(NOTICE_READ_ONE)<any>();
export const noticeReadOneSuccess = createAction(
  NOTICE_READ_ONE_SUCCESS,
)<any>();
export const noticeReadOneFailure = createAction(
  NOTICE_READ_ONE_FAILURE,
)<AxiosError>();
export const noticeDelete = createAction(NOTICE_DELETE)();
export const noticeDeleteSuccess = createAction(NOTICE_DELETE_SUCCESS)();
export const noticeDeleteFailure = createAction(
  NOTICE_DELETE_FAILURE,
)<AxiosError>();
export const noticeDeleteOne = createAction(NOTICE_DELETE_ONE)<any>();
export const noticeDeleteOneSuccess = createAction(
  NOTICE_DELETE_ONE_SUCCESS,
)<any>();
export const noticeDeleteOneFailure = createAction(
  NOTICE_DELETE_ONE_FAILURE,
)<AxiosError>();

/*
  Redux-Saga

  특정 액션 타입이 불리면, 그에 해당하는 API를 호출합니다.
  createRequestSaga에서 이미 구현되어 있습니다.

  SIGNUP 액션이 실행되면, 자동으로 usersAPI.signup을 호출하고,
  state의 loading[users/LOGIN]을 true로 바꾼 뒤,
  결과에 따라 SIGNUP_SUCCESS or SIGNUP_FAILURE 액션을 실행하고,
  state의 loading[users/LOGIN]을 false로 바꿉니다.

  // const signupSaga = createRequestSaga(SIGNUP, usersAPI.signup);
  
*/
// const noticeCreateSaga = createRequestSaga(NOTICE_CREATE, usersAPI.signup);
export type noticesState = {
  notice: Array<noticeAPI.notificationProps> | null;
  remove: boolean | null;
  error: AxiosError | null;
};
const initialState: noticesState = {
  notice: null,
  remove: null,
  error: null,
};
const dummyData: Array<noticeAPI.notificationProps> = [
  {
    id: 1,
    date: new Date(),
    content: '알림입니다!',
    noticeId: 1,
  },
  {
    id: 2,
    date: new Date(),
    content: '알림입니다! 2',
    noticeId: 2,
  },
  {
    id: 3,
    date: new Date(),
    content: '알림입니다! 3',
    noticeId: 3,
  },
];

//기본 : API로 보내기 시작하는 단계"
//API와의 연동 결과에 따라 success, failure가 자동으로 실행
//서버로부터 받아온 응답은 success의 payload
const notices = createReducer(initialState, {
  //새로운 알림 발생
  [TEST]: (state, { payload }) => ({
    ...state,
    notice: dummyData,
  }),
  [NOTICE_CREATE]: (state, { payload }) => ({
    ...state,
    notice: null,
  }),
  [NOTICE_CREATE_SUCCESS]: (state, { payload }) => ({
    ...state,
    notice: payload.data,
  }),
  [NOTICE_CREATE_FAILURE]: (state, { payload: error }) => {
    alert('notice reading error');
    return {
      ...state,
      error,
    };
  },
  //모든 알림 읽기
  [NOTICE_READ]: (state, { payload }) => ({
    ...state,
    notice: null,
  }),
  [NOTICE_READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    notice: payload.data,
  }),
  [NOTICE_READ_FAILURE]: (state, { payload: error }) => {
    alert('notice read error');
    return {
      ...state,
      error,
    };
  },
  //알림 하나만 읽기
  [NOTICE_READ_ONE]: (state, { payload }) => ({
    ...state,
    notice: null,
  }),
  [NOTICE_READ_ONE_SUCCESS]: (state, { payload }) => ({
    ...state,
    notice: payload.data,
  }),
  [NOTICE_READ_ONE_FAILURE]: (state, { payload: error }) => {
    alert('notice read one error');
    return {
      ...state,
      error,
    };
  },
  //모든 알림 삭제
  [NOTICE_DELETE]: (state, { payload }) => ({
    ...state,
    remove: null,
    notice: null,
  }),
  [NOTICE_DELETE_SUCCESS]: (state, { payload }) => ({
    ...state,
    remove: true,
    notice: payload.data,
  }),
  [NOTICE_DELETE_FAILURE]: (state, { payload: error }) => {
    alert('notice delete error');
    return {
      ...state,
      error,
    };
  },
  //알림 하나만 삭제
  [NOTICE_DELETE_ONE]: (state, { payload }) => ({
    ...state,
    remove: null,
    notice: null,
  }),
  [NOTICE_DELETE_ONE_SUCCESS]: (state, { payload }) => ({
    ...state,
    remove: true,
    notice: payload.data,
  }),
  [NOTICE_DELETE_ONE_FAILURE]: (state, { payload: error }) => {
    alert('notice delete one error');
    return {
      ...state,
      error,
    };
  },
});

export default notices;
