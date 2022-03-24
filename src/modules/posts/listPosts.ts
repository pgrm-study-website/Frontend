import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';

const LIST = 'listPosts/LIST';
const LIST_SUCCESS = 'listPosts/LIST_SUCCESS';
const LIST_FAILURE = 'listPosts/LIST_FAILURE';

export const list = createAction(LIST)<string>();
export const listSuccess = createAction(LIST_SUCCESS)<postsAPI.postListType>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, postsAPI.list);

export function* listPostsSaga() {
  yield takeLatest(LIST, listSaga);
}

const actions = {
  list,
  listSuccess,
  listFailure,
};
type listPostsAction = ActionType<typeof actions>;
type listPostsState = {
  list: postsAPI.postListType | null;
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
});

export default listPosts;
