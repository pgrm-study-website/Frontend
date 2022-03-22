import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';

const INIT_WRITE = 'writePosts/INIT_WRITE';
const CHANGE_FIELD = 'writePosts/CHANGE_FIELD';
const SET_ORIGINAL = 'writePosts/SET_ORIGINAL';
const WRITE = 'writePosts/WRITE';
const WRITE_SUCCESS = 'writePosts/WRITE_SUCCESS';
const WRITE_FAILURE = 'writePosts/WRITE_FAILURE';
const UPDATE = 'writePosts/UPDATE';
const UPDATE_SUCCESS = 'writePosts/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'writePosts/UPDATE_FAILURE';

export const initWrite = createAction(INIT_WRITE)();
export const changeField =
  createAction(CHANGE_FIELD)<{ key: string; value: any }>();
export const setOriginal = createAction(SET_ORIGINAL)<postsAPI.postType>();
export const write = createAction(WRITE)<postsAPI.postType>();
export const writeSuccess = createAction(WRITE_SUCCESS)<number>();
export const writeFailure = createAction(WRITE_FAILURE)<AxiosError>();
export const update = createAction(UPDATE)<postsAPI.postType>();
export const updateSuccess = createAction(UPDATE_SUCCESS)<number>();
export const updateFailure = createAction(UPDATE_FAILURE)<AxiosError>();

const writeSaga = createRequestSaga(WRITE, postsAPI.write);
const updateSaga = createRequestSaga(UPDATE, postsAPI.update);

export function* writePostsSaga() {
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(UPDATE, updateSaga);
}

const actions = {
  initWrite,
  changeField,
  setOriginal,
  write,
  writeSuccess,
  writeFailure,
  update,
  updateSuccess,
  updateFailure,
};
type writePostAction = ActionType<typeof actions>;
type writePostState = {
  post: postsAPI.postType;
  result: number | null;
  error: AxiosError | null;
};
const initialState: writePostState = {
  post: {
    postId: null,
    userId: 7, //임시
    title: '',
    tags: [],
    category: 'etc',
    content: '',
  },
  result: null,
  error: null,
};

const writePosts = createReducer<writePostState, writePostAction>(
  initialState,
  {
    [INIT_WRITE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      post: {
        ...state.post,
        [key]: value,
      },
    }),
    [SET_ORIGINAL]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE]: state => ({
      ...state,
      result: null,
      error: null,
    }),
    [WRITE_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      result,
    }),
    [WRITE_FAILURE]: (state, { payload: error }) => {
      alert('write error');
      return { ...state, error };
    },
    [UPDATE]: state => ({
      ...state,
      result: null,
      error: null,
    }),
    [UPDATE_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      result,
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => {
      alert('update error');
      return { ...state, error };
    },
  },
);

export default writePosts;
