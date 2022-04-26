import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as noticeAPI from 'lib/api/notice';

// const TEST = 'notices/test';
const CHANGE_FIELD = 'notices/CHANGE_FIELD';
// const NOTICE_CREATE = 'notices/NOTICE_CREATE';
// const NOTICE_CREATE_SUCCESS = 'notices/NOTICE_CREATE_SUCCESS';
// const NOTICE_CREATE_FAILURE = 'notices/NOTICE_CREATE_FAILURE';
const NOTICE_READ = 'notices/NOTICE_READ';
const NOTICE_READ_SUCCESS = 'notices/NOTICE_READ_SUCCESS';
const NOTICE_READ_FAILURE = 'notices/NOTICE_READ_FAILURE';
// const NOTICE_READ_ONE = 'notices/NOTICE_READ_ONE';
// const NOTICE_READ_ONE_SUCCESS = 'notices/NOTICE_READ_ONE_SUCCESS';
// const NOTICE_READ_ONE_FAILURE = 'notices/NOTICE_READ_ONE_FAILURE';
const NOTICE_DELETE = 'notices/NOTICE_DELETE';
const NOTICE_DELETE_SUCCESS = 'notices/NOTICE_DELETE_SUCCESS';
const NOTICE_DELETE_FAILURE = 'notices/NOTICE_DELETE_FAILURE';
const NOTICE_DELETE_ONE = 'notices/NOTICE_DELETE_ONE';
const NOTICE_DELETE_ONE_SUCCESS = 'notices/NOTICE_DELETE_ONE_SUCCESS';
const NOTICE_DELETE_ONE_FAILURE = 'notices/NOTICE_DELETE_ONE_FAILURE';

// export const test = createAction(TEST)();
export const changeField =
  createAction(CHANGE_FIELD)<{ key: string; value: any }>();
// export const noticeCreate = createAction(NOTICE_CREATE)();
// export const noticeCreateSuccess = createAction(NOTICE_CREATE_SUCCESS)();
// export const noticeCreateFailure = createAction(
//   NOTICE_CREATE_FAILURE,
// )<AxiosError>();
export const noticeRead = createAction(NOTICE_READ)();
export const noticeReadSuccess = createAction(NOTICE_READ_SUCCESS)();
export const noticeReadFailure =
  createAction(NOTICE_READ_FAILURE)<AxiosError>();
// export const noticeReadOne = createAction(NOTICE_READ_ONE)<any>();
// export const noticeReadOneSuccess = createAction(
//   NOTICE_READ_ONE_SUCCESS,
// )<any>();
// export const noticeReadOneFailure = createAction(
//   NOTICE_READ_ONE_FAILURE,
// )<AxiosError>();
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

// const createSaga = createRequestSaga(NOTICE_CREATE, noticeAPI.create);
const readSaga = createRequestSaga(NOTICE_READ, noticeAPI.read);
// const readOneSaga = createRequestSaga(NOTICE_READ_ONE, noticeAPI.readOne);
const removeAllSaga = createRequestSaga(NOTICE_DELETE, noticeAPI.removeAll);
const removeOneSaga = createRequestSaga(NOTICE_DELETE_ONE, noticeAPI.removeOne);

export function* noticesSaga() {
  // yield takeLatest(NOTICE_CREATE, createSaga);
  yield takeLatest(NOTICE_READ, readSaga);
  // yield takeLatest(NOTICE_READ_ONE, readOneSaga);
  yield takeLatest(NOTICE_DELETE, removeAllSaga);
  yield takeLatest(NOTICE_DELETE_ONE, removeOneSaga);
}

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

//기본 : API로 보내기 시작하는 단계"
//API와의 연동 결과에 따라 success, failure가 자동으로 실행
//서버로부터 받아온 응답은 success의 payload
const notices = createReducer(initialState, {
  //새로운 알림 발생
  // [TEST]: (state, { payload }) => ({
  //   ...state,
  //   notice: dummyData,
  // }),
  [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
  // [NOTICE_CREATE]: state => ({
  //   ...state,
  //   notice: null,
  // }),
  // [NOTICE_CREATE_SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   notice: payload.data,
  // }),
  // [NOTICE_CREATE_FAILURE]: (state, { payload: error }) => {
  //   alert(error.response?.data.message);
  //   return {
  //     ...state,
  //     error,
  //   };
  // },
  //모든 알림 읽기
  [NOTICE_READ]: state => ({
    ...state,
    // 초기화 안함 (화면 깜빡임 방지)
  }),
  [NOTICE_READ_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      notice: payload.data.data,
    };
  },
  [NOTICE_READ_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  //알림 하나만 읽기
  // [NOTICE_READ_ONE]: state => ({
  //   ...state,
  //   notice: null,
  // }),
  // [NOTICE_READ_ONE_SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   notice: payload.data,
  // }),
  // [NOTICE_READ_ONE_FAILURE]: (state, { payload: error }) => {
  //   alert(error.response?.data.message);
  //   return {
  //     ...state,
  //     error,
  //   };
  // },
  //모든 알림 삭제
  [NOTICE_DELETE]: state => ({
    ...state,
    remove: null,
  }),
  [NOTICE_DELETE_SUCCESS]: state => ({
    ...state,
    remove: true,
  }),
  [NOTICE_DELETE_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  //알림 하나만 삭제
  [NOTICE_DELETE_ONE]: state => ({
    ...state,
    remove: null,
  }),
  [NOTICE_DELETE_ONE_SUCCESS]: state => ({
    ...state,
    remove: true,
  }),
  [NOTICE_DELETE_ONE_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
});

export default notices;
