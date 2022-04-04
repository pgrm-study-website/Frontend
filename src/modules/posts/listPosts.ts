import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';

const LIST = 'listPosts/LIST';
const LIST_SUCCESS = 'listPosts/LIST_SUCCESS';
const LIST_FAILURE = 'listPosts/LIST_FAILURE';
const MY_LIST = 'listPosts/MY_LIST';
const MY_LIST_SUCCESS = 'listPosts/MY_LIST_SUCCESS';
const MY_LIST_FAILURE = 'listPosts/MY_LIST_FAILURE';

export const list = createAction(LIST)<string>();
export const listSuccess =
  createAction(LIST_SUCCESS)<postsAPI.listResponseType>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();
export const myList = createAction(MY_LIST)<number>();
export const myListSuccess =
  createAction(MY_LIST_SUCCESS)<postsAPI.listResponseType>();
export const myListFailure = createAction(MY_LIST_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, postsAPI.list);
const myListSaga = createRequestSaga(MY_LIST, postsAPI.myList);

export function* listPostsSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(MY_LIST, myListSaga);
}

const actions = {
  list,
  listSuccess,
  listFailure,
  myList,
  myListSuccess,
  myListFailure,
};
type listPostsAction = ActionType<typeof actions>;
type listPostsState = {
  list: postsAPI.listResponseType | null;
  error: AxiosError | null;
};
const initialState: listPostsState = {
  list: null,
  error: null,
};

const listPosts = createReducer<listPostsState, listPostsAction>(initialState, {
  [LIST]: () => initialState,
  [LIST_SUCCESS]: (state, { payload: list }) => ({
    ...state,
    list,
  }),
  [LIST_FAILURE]: (state, { payload: error }) => {
    alert('list error');
    return {
      ...state,
      error,
    };
  },
  [MY_LIST]: () => initialState,
  [MY_LIST_SUCCESS]: (state, { payload: list }) => ({
    ...state,
    list,
  }),
  [MY_LIST_FAILURE]: (state, { payload: error }) => {
    alert('list error');
    return {
      ...state,
      error,
    };
  },
});

export default listPosts;
