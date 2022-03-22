import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import writePosts, { writePostsSaga } from 'modules/post/writePosts';

const rootReducer = combineReducers({ loading, writePosts });

export function* rootSaga() {
  yield all([writePostsSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
