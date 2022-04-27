import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as messageAPI from 'lib/api/message';

const CHANGE_FIELD = 'notices/CHANGE_FIELD';
const MESSAGE_READ = 'notices/MESSAGE_READ';
const MESSAGE_READ_SUCCESS = 'notices/MESSAGE_READ_SUCCESS';
const MESSAGE_READ_FAILURE = 'notices/MESSAGE_READ_FAILURE';
const MESSAGE_DETAIL_READ = 'notices/MESSAGE_DETAIL_READ';
const MESSAGE_DETAIL_READ_SUCCESS = 'notices/MESSAGE_DETAIL_READ_SUCCESS';
const MESSAGE_DETAIL_READ_FAILURE = 'notices/MESSAGE_DETAIL_READ_FAILURE';
const MESSAGE_DELETE_ALL = 'notices/MESSAGE_DELETE_ALL';
const MESSAGE_DELETE_ALL_SUCCESS = 'notices/MESSAGE_DELETE_ALL_SUCCESS';
const MESSAGE_DELETE_ALL_FAILURE = 'notices/MESSAGE_DELETE_ALL_FAILURE';
const MESSAGE_SEND = 'notices/MESSAGE_SEND';
const MESSAGE_SEND_SUCCESS = 'notices/MESSAGE_SEND_SUCCESS';
const MESSAGE_SEND_FAILURE = 'notices/MESSAGE_SEND_FAILURE';

export const changeField =
  createAction(CHANGE_FIELD)<{ key: string; value: any }>();

export const messageRead =
  createAction(MESSAGE_READ)<messageAPI.readMessages>();
export const messageReadSuccess = createAction(MESSAGE_READ_SUCCESS)();
export const messageReadFailure =
  createAction(MESSAGE_READ_FAILURE)<AxiosError>();

export const messageDetailRead = createAction(MESSAGE_DETAIL_READ)<any>();
export const messageDetailReadSuccess = createAction(
  MESSAGE_DETAIL_READ_SUCCESS,
)<any>();
export const messageDetailReadFailure = createAction(
  MESSAGE_DETAIL_READ_FAILURE,
)<AxiosError>();

export const messageDeleteAll = createAction(MESSAGE_DELETE_ALL)<string>();
export const messageDeleteAllSuccess = createAction(
  MESSAGE_DELETE_ALL_SUCCESS,
)<any>();
export const messageDeleteAllFailure = createAction(
  MESSAGE_DELETE_ALL_FAILURE,
)<AxiosError>();

export const messageSend = createAction(MESSAGE_SEND)<any>();
export const messageSendSuccess = createAction(MESSAGE_SEND_SUCCESS)<any>();
export const messageSendFailure =
  createAction(MESSAGE_SEND_FAILURE)<AxiosError>();

//   Redux-Saga
const readSaga = createRequestSaga(MESSAGE_READ, messageAPI.read);
const readDetailSaga = createRequestSaga(
  MESSAGE_DETAIL_READ,
  messageAPI.readDetail,
);
const removeAllSaga = createRequestSaga(
  MESSAGE_DELETE_ALL,
  messageAPI.removeAll,
);
const sendSaga = createRequestSaga(MESSAGE_SEND, messageAPI.send);

export function* messagesSaga() {
  yield takeLatest(MESSAGE_READ, readSaga);
  yield takeLatest(MESSAGE_DETAIL_READ, readDetailSaga);
  yield takeLatest(MESSAGE_DELETE_ALL, removeAllSaga);
  yield takeLatest(MESSAGE_SEND, sendSaga);
}

const actions = {
  changeField,
  messageRead,
  messageReadSuccess,
  messageReadFailure,
  messageDetailRead,
  messageDetailReadSuccess,
  messageDetailReadFailure,
  messageDeleteAll,
  messageDeleteAllSuccess,
  messageDeleteAllFailure,
  messageSend,
  messageSendSuccess,
  messageSendFailure,
};
type messagesAction = ActionType<typeof actions>;

export type messageState = {
  messages: Array<messageAPI.messagesProps> | null;
  error: AxiosError | null;
};
export type messageDetailState = {
  messageDetail: Array<messageAPI.messagesDetailProps> | null;
  reload: boolean | null;
  error: AxiosError | null;
};
const initialState: messageState = {
  messages: null,
  error: null,
};
const initialMessageDetailState: messageDetailState = {
  messageDetail: null,
  reload: null,
  error: null,
};
const messages = createReducer<messageState, messagesAction>(initialState, {
  [MESSAGE_READ]: state => ({
    ...state,
    // 초기화 안함 (화면 깜빡임 방지)
  }),
  [MESSAGE_READ_SUCCESS]: (state: any, { payload }: any) => ({
    ...state,
    messages: payload.data,
  }),
  [MESSAGE_READ_FAILURE]: (state: any, { payload: error }: any) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
});
export const messageDetail = createReducer(initialMessageDetailState, {
  [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
  [MESSAGE_DETAIL_READ]: state => ({
    ...state,
    // 초기화 안함 (화면 깜빡임 방지)
  }),
  [MESSAGE_DETAIL_READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    messageDetail: payload.data,
  }),
  [MESSAGE_DETAIL_READ_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  [MESSAGE_DELETE_ALL]: state => ({
    ...state,
    reload: null,
  }),
  [MESSAGE_DELETE_ALL_SUCCESS]: state => ({
    ...state,
    reload: true,
  }),
  [MESSAGE_DELETE_ALL_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  [MESSAGE_SEND]: state => ({
    ...state,
    reload: null,
  }),
  [MESSAGE_SEND_SUCCESS]: state => ({
    ...state,
    reload: true,
  }),
  [MESSAGE_SEND_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
});

export default messages;
