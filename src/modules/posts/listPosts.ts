import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';

const INIT_LIST = 'listPosts/INIT_LIST';
const LIST = 'listPosts/LIST';
const LIST_SUCCESS = 'listPosts/LIST_SUCCESS';
const LIST_FAILURE = 'listPosts/LIST_FAILURE';
const MY_LIST = 'listPosts/MY_LIST';
const MY_LIST_SUCCESS = 'listPosts/MY_LIST_SUCCESS';
const MY_LIST_FAILURE = 'listPosts/MY_LIST_FAILURE';

export const initList = createAction(INIT_LIST)();
export const list = createAction(LIST)<string>();
export const listSuccess = createAction(LIST_SUCCESS)<any>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();
export const myList = createAction(MY_LIST)();
export const myListSuccess = createAction(MY_LIST_SUCCESS)<any>();
export const myListFailure = createAction(MY_LIST_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, postsAPI.list);
const myListSaga = createRequestSaga(MY_LIST, postsAPI.myList);

export function* listPostsSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(MY_LIST, myListSaga);
}

const actions = {
  initList,
  list,
  listSuccess,
  listFailure,
  myList,
  myListSuccess,
  myListFailure,
};
type listPostsAction = ActionType<typeof actions>;
type listPostsState = {
  posts: {
    content: postsAPI.listResponseType;
    totalElements: number;
    totalPages: number;
    [key: string]: any;
  } | null;
  error: AxiosError | null;
};
const initialState: listPostsState = {
  posts: null,
  error: null,
};

const listPosts = createReducer<listPostsState, listPostsAction>(initialState, {
  [INIT_LIST]: () => initialState,
  [LIST]: () => initialState,
  [LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    posts: payload.data,
  }),
  [LIST_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
  [MY_LIST]: () => initialState,
  [MY_LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    posts: payload.data,
  }),
  [MY_LIST_FAILURE]: (state, { payload: error }) => {
    alert(error.response?.data.message);
    return {
      ...state,
      error,
    };
  },
});

export default listPosts;
