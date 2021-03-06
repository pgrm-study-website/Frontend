import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { rootSaga } from 'modules';
import { changeField, check } from 'modules/users';
import { simpleResponseType } from 'lib/api/users';

import App from 'App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
function loadUser() {
  try {
    if (localStorage.getItem('user') === null) return;
    const user: simpleResponseType = JSON.parse(localStorage.getItem('user')!);
    store.dispatch(changeField({ key: 'user', value: user }));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working.', e);
  }
}
sagaMiddleware.run(rootSaga);
loadUser();
document.getElementById('root')?.setAttribute('spellcheck', 'false');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
