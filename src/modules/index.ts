import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import listPosts, { listPostsSaga } from 'modules/posts/listPosts';
import writePosts, { writePostsSaga } from 'modules/posts/writePosts';
import readPosts, { readPostsSaga } from 'modules/posts/readPosts';

const rootReducer = combineReducers({
  loading,
  listPosts,
  writePosts,
  readPosts,
});

export function* rootSaga() {
  yield all([listPostsSaga(), writePostsSaga(), readPostsSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
