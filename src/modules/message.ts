import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as messageAPI from 'lib/api/message';

const MESSAGE_READ = 'notices/MESSAGE_READ';
const MESSAGE_READ_SUCCESS = 'notices/MESSAGE_READ_SUCCESS';
const MESSAGE_READ_FAILURE = 'notices/MESSAGE_READ_FAILURE';
const MESSAGE_DETAIL_READ = 'notices/MESSAGE_DETAIL_READ';
const MESSAGE_DETAIL_READ_SUCCESS = 'notices/MESSAGE_DETAIL_READ_SUCCESS';
const MESSAGE_DETAIL_READ_FAILURE = 'notices/MESSAGE_DETAIL_READ_FAILURE';
const MESSAGE_DELETE_ALL = 'notices/MESSAGE_DELETE_ALL';
const MESSAGE_DELETE_ALL_SUCCESS = 'notices/MESSAGE_DELETE_ALL_SUCCESS';
const MESSAGE_DELETE_ALL_FAILURE = 'notices/MESSAGE_DELETE_ALL_FAILURE';
const MESSAGE_DELETE_ONE = 'notices/MESSAGE_DELETE_ONE';
const MESSAGE_DELETE_ONE_SUCCESS = 'notices/MESSAGE_DELETE_ONE_SUCCESS';
const MESSAGE_DELETE_ONE_FAILURE = 'notices/MESSAGE_DELETE_ONE_FAILURE';
const MESSAGE_SEND = 'notices/MESSAGE_SEND';
const MESSAGE_SEND_SUCCESS = 'notices/MESSAGE_SEND_SUCCESS';
const MESSAGE_SEND_FAILURE = 'notices/MESSAGE_SEND_FAILURE';

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

export const messageDeleteOne = createAction(MESSAGE_DELETE_ONE)();
export const messageDeleteOneSuccess = createAction(
  MESSAGE_DELETE_ONE_SUCCESS,
)<any>();
export const messageDeleteOneFailure = createAction(
  MESSAGE_DELETE_ONE_FAILURE,
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
const removeOneSaga = createRequestSaga(
  MESSAGE_DELETE_ONE,
  messageAPI.removeOne,
);
const sendSaga = createRequestSaga(MESSAGE_SEND, messageAPI.send);

export function* messagesSaga() {
  yield takeLatest(MESSAGE_READ, readSaga);
  yield takeLatest(MESSAGE_DETAIL_READ, readDetailSaga);
  yield takeLatest(MESSAGE_DELETE_ALL, removeAllSaga);
  yield takeLatest(MESSAGE_DELETE_ONE, removeOneSaga);
  yield takeLatest(MESSAGE_SEND, sendSaga);
}

const actions = {
  messageRead,
  messageReadSuccess,
  messageReadFailure,
  messageDetailRead,
  messageDetailReadSuccess,
  messageDetailReadFailure,
  messageDeleteAll,
  messageDeleteAllSuccess,
  messageDeleteAllFailure,
  messageDeleteOne,
  messageDeleteOneSuccess,
  messageDeleteOneFailure,
  messageSend,
  messageSendSuccess,
  messageSendFailure,
};
type messagesAction = ActionType<typeof actions>;

export type messageState = {
  messages: Array<messageAPI.messagesProps> | null;
  remove: boolean | null;
  error: AxiosError | null;
};
export type messageDetailState = {
  messageDetail: Array<messageAPI.messagesDetailProps> | null;
  sendMessage: messageAPI.messagesDetailProps | null;
  remove: boolean | null;
  error: AxiosError | null;
};
const initialState: messageState = {
  messages: null,
  remove: null,
  error: null,
};
const initialMessageDetailState: messageDetailState = {
  messageDetail: null,
  sendMessage: null,
  remove: null,
  error: null,
};
const messages = createReducer<messageState, messagesAction>(initialState, {
  [MESSAGE_READ]: state => ({
    ...state,
    messages: null,
  }),
  [MESSAGE_READ_SUCCESS]: (state: any, { payload }: any) => ({
    ...state,
    messages: payload.data,
  }),
  [MESSAGE_READ_FAILURE]: (state: any, { payload: error }: any) => {
    alert('message reading error');
    return {
      ...state,
      error,
    };
  },
});
export const messageDetail = createReducer(initialMessageDetailState, {
  [MESSAGE_DETAIL_READ]: (state, { payload }) => ({
    ...state,
    messageDetail: null,
  }),
  [MESSAGE_DETAIL_READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    messageDetail: payload.data,
  }),
  [MESSAGE_DETAIL_READ_FAILURE]: (state, { payload: error }) => {
    // alert('message reading error');
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  [MESSAGE_DELETE_ALL]: (state, { payload }) => ({
    ...state,
    messageDetail: null,
  }),
  [MESSAGE_DELETE_ALL_SUCCESS]: (state, { payload }) => ({
    ...state,
    remove: true,
    messageDetail: payload.data,
  }),
  [MESSAGE_DELETE_ALL_FAILURE]: (state, { payload: error }) => {
    alert('message delete error');
    return {
      ...state,
      error,
    };
  },
  [MESSAGE_DELETE_ONE]: (state, { payload }) => ({
    ...state,
    messageDetail: null,
  }),
  [MESSAGE_DELETE_ONE_SUCCESS]: (state, { payload }) => ({
    ...state,
    remove: true,
    messageDetail: payload.data,
  }),
  [MESSAGE_DELETE_ONE_FAILURE]: (state, { payload: error }) => {
    alert('message delete error');
    return {
      ...state,
      error,
    };
  },
  [MESSAGE_SEND]: (state, { payload }) => ({
    ...state,
    messageDetail: null,
  }),
  [MESSAGE_SEND_SUCCESS]: (state, { payload }) => ({
    ...state,
    sendMessage: payload.data,
  }),
  [MESSAGE_SEND_FAILURE]: (state, { payload: error }) => {
    alert('message send error');
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
});
export default messages;
