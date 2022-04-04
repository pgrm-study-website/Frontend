import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';

const INIT_READ = 'readPosts/INIT_READ';
const READ = 'readPosts/READ';
const READ_SUCCESS = 'readPosts/READ_SUCCESS';
const READ_FAILURE = 'readPosts/READ_FAILURE';
const REMOVE = 'readPosts/REMOVE';
const REMOVE_SUCCESS = 'readPosts/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'readPosts/REMOVE_FAILURE';

export const initRead = createAction(INIT_READ)();
export const read = createAction(READ)<number>();
export const readSuccess =
  createAction(READ_SUCCESS)<postsAPI.readResponseType>();
export const readFailure = createAction(READ_FAILURE)<AxiosError>();
export const remove = createAction(REMOVE)<number>();
export const removeSuccess = createAction(REMOVE_SUCCESS)();
export const removeFailure = createAction(REMOVE_FAILURE)<AxiosError>();

const readSaga = createRequestSaga(READ, postsAPI.read);
const removeSaga = createRequestSaga(REMOVE, postsAPI.remove);

export function* readPostsSaga() {
  yield takeLatest(READ, readSaga);
  yield takeLatest(REMOVE, removeSaga);
}

const actions = {
  initRead,
  read,
  readSuccess,
  readFailure,
  remove,
  removeSuccess,
  removeFailure,
};
type readPostsAction = ActionType<typeof actions>;
type readPostsState = {
  post: postsAPI.readResponseType | null;
  error: AxiosError | null;
  remove: boolean | null;
};
const initialState: readPostsState = {
  post: null,
  error: null,
  remove: null,
};

const readPosts = createReducer<readPostsState, readPostsAction>(initialState, {
  [INIT_READ]: () => initialState,
  [READ_SUCCESS]: (state, { payload: post }) => ({
    ...state,
    post,
  }),
  [READ_FAILURE]: (state, { payload: error }) => {
    alert('read error');
    return {
      ...state,
      error,
    };
  },
  [REMOVE_SUCCESS]: state => ({
    ...state,
    remove: true,
  }),
  [REMOVE_FAILURE]: (state, { payload: error }) => {
    alert('read error');
    return state;
  },
});

export default readPosts;
