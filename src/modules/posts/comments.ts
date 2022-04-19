import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as commemtsAPI from 'lib/api/comments';

const INIT_COMMENT = 'comments/INIT_COMMENT';
const LIST = 'comments/LIST';
const LIST_SUCCESS = 'comments/LIST_SUCCESS';
const LIST_FAILURE = 'comments/LIST_FAILURE';
const WRITE = 'comments/WRITE';
const WRITE_SUCCESS = 'comments/WRITE_SUCCESS';
const WRITE_FAILURE = 'comments/WRITE_FAILURE';
const UPDATE = 'comments/UPDATE';
const UPDATE_SUCCESS = 'comments/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'comments/UPDATE_FAILURE';
const REMOVE = 'comments/REMOVE';
const REMOVE_SUCCESS = 'comments/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'comments/REMOVE_FAILURE';

export const initComment = createAction(INIT_COMMENT)();
export const list = createAction(LIST)<number>();
export const listSuccess = createAction(LIST_SUCCESS)<any>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();
export const write = createAction(WRITE)<commemtsAPI.writeRequestType>();
export const writeSuccess = createAction(WRITE_SUCCESS)();
export const writeFailure = createAction(WRITE_FAILURE)<AxiosError>();
export const update = createAction(UPDATE)<commemtsAPI.updateRequestType>();
export const updateSuccess = createAction(UPDATE_SUCCESS)();
export const updateFailure = createAction(UPDATE_FAILURE)<AxiosError>();
export const remove = createAction(REMOVE)<number>();
export const removeSuccess = createAction(REMOVE_SUCCESS)();
export const removeFailure = createAction(REMOVE_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, commemtsAPI.list);
const writeSaga = createRequestSaga(WRITE, commemtsAPI.write);
const updateSaga = createRequestSaga(UPDATE, commemtsAPI.update);
const removeSaga = createRequestSaga(REMOVE, commemtsAPI.remove);

export function* commentsSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(REMOVE, removeSaga);
}

const actions = {
  initComment,
  list,
  listSuccess,
  listFailure,
  write,
  writeSuccess,
  writeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
};
type commentsAction = ActionType<typeof actions>;
type commentsState = {
  comments: commemtsAPI.commentType[] | null;
  reload: boolean | null;
};
const initialState: commentsState = {
  comments: null,
  reload: null,
};

const comments = createReducer<commentsState, commentsAction>(initialState, {
  [INIT_COMMENT]: () => initialState,
  [LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    comments: payload.data,
  }),
  [LIST_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return state;
  },
  [WRITE]: state => ({
    ...state,
    reload: null,
  }),
  [WRITE_SUCCESS]: state => ({
    ...state,
    reload: true,
  }),
  [WRITE_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      reload: false,
    };
  },
  [UPDATE]: state => ({
    ...state,
    reload: null,
  }),
  [UPDATE_SUCCESS]: state => ({
    ...state,
    reload: true,
  }),
  [UPDATE_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      reload: false,
    };
  },
  [REMOVE]: state => ({
    ...state,
    reload: null,
  }),
  [REMOVE_SUCCESS]: state => ({
    ...state,
    reload: true,
  }),
  [REMOVE_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      reload: false,
    };
  },
});

export default comments;
