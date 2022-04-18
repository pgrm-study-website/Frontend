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

export const messageRead = createAction(MESSAGE_READ)();
export const messageReadSuccess = createAction(MESSAGE_READ_SUCCESS)();
export const messageReadFailure =
  createAction(MESSAGE_READ_FAILURE)<AxiosError>();

export const messageDetailRead = createAction(MESSAGE_DETAIL_READ)();
export const messageDetailReadSuccess = createAction(
  MESSAGE_DETAIL_READ_SUCCESS,
)();
export const messageDetailReadFailure = createAction(
  MESSAGE_DETAIL_READ_FAILURE,
)<AxiosError>();

export const messageDeleteAll = createAction(MESSAGE_DELETE_ALL)();
export const messageDeleteAllSuccess = createAction(
  MESSAGE_DELETE_ALL_SUCCESS,
)();
export const messageDeleteAllFailure = createAction(
  MESSAGE_DELETE_ALL_FAILURE,
)<AxiosError>();

export const messageDeleteOne = createAction(MESSAGE_DELETE_ONE)();
export const messageDeleteOneSuccess = createAction(
  MESSAGE_DELETE_ONE_SUCCESS,
)();
export const messageDeleteOneFailure = createAction(
  MESSAGE_DELETE_ONE_FAILURE,
)<AxiosError>();
export const messageSend = createAction(MESSAGE_SEND)();
export const messageSendSuccess = createAction(MESSAGE_SEND_SUCCESS)();
export const messageSendFailure =
  createAction(MESSAGE_SEND_FAILURE)<AxiosError>();

//   Redux-Saga
// const signupSaga = createRequestSaga(SIGNUP, usersAPI.signup);

export type messageState = {
  messages: Array<messageAPI.messagesProps> | null;
  remove: boolean | null;
  error: AxiosError | null;
};
export type messageDetailState = {
  messageDetail: Array<messageAPI.messagesDetailProps> | null;
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
  remove: null,
  error: null,
};
const messages = createReducer(initialState, {
  [MESSAGE_READ]: (state, { payload }) => ({
    ...state,
    messages: null,
    // notice: messageUserListTestData,
  }),
  [MESSAGE_READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    messages: payload.data,
  }),
  [MESSAGE_READ_FAILURE]: (state, { payload: error }) => {
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
    alert('message reading error');
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
    messageDetail: payload.data,
  }),
  [MESSAGE_SEND_FAILURE]: (state, { payload: error }) => {
    alert('message send error');
    return {
      ...state,
      error,
    };
  },
});
export default messages;

const messageUserListTestData = [
  {
    id: 1,
    userId: 123,
    userName: 'sumi',
    otherId: 33333,
    otherName: 'hey',
    content: 'this is message',
  },
  {
    id: 2,
    userId: 123,
    userName: 'sumi',
    otherId: 33313,
    content: 'this is message',
    otherName: 'hey2312',
  },
  {
    id: 3,
    userId: 123,
    userName: 'sumi',
    otherId: 1232132,
    content: 'this is message',
    otherName: 'heyasdd',
  },
];
