import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import users, { usersSaga } from 'modules/users';
import listPosts, { listPostsSaga } from 'modules/posts/listPosts';
import writePosts, { writePostsSaga } from 'modules/posts/writePosts';
import readPosts, { readPostsSaga } from 'modules/posts/readPosts';
import comments, { commentsSaga } from 'modules/posts/comments';
import application, { applicationSaga } from 'modules/posts/application';
import notices, { noticesSaga } from 'modules/notices';
import messages, { messageDetail, messagesSaga } from './message';

const rootReducer = combineReducers({
  loading,
  users,
  listPosts,
  writePosts,
  readPosts,
  comments,
  notices,
  messages,
  messageDetail,
  application,
});

export function* rootSaga() {
  yield all([
    listPostsSaga(),
    writePostsSaga(),
    readPostsSaga(),
    usersSaga(),
    commentsSaga(),
    applicationSaga(),
    messagesSaga(),
    noticesSaga(),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
