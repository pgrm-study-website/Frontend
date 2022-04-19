import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as applicationAPI from 'lib/api/application';

const INIT_COMMENT = 'application/INIT_COMMENT';
const LIST = 'application/LIST';
const LIST_SUCCESS = 'application/LIST_SUCCESS';
const LIST_FAILURE = 'application/LIST_FAILURE';
const WRITE = 'application/WRITE';
const WRITE_SUCCESS = 'application/WRITE_SUCCESS';
const WRITE_FAILURE = 'application/WRITE_FAILURE';
const UPDATE = 'application/UPDATE';
const UPDATE_SUCCESS = 'application/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'application/UPDATE_FAILURE';

export const initComment = createAction(INIT_COMMENT)();
export const list = createAction(LIST)<number>();
export const listSuccess = createAction(LIST_SUCCESS)<any>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();
export const write = createAction(WRITE)<number>();
export const writeSuccess = createAction(WRITE_SUCCESS)();
export const writeFailure = createAction(WRITE_FAILURE)<AxiosError>();
export const update = createAction(UPDATE)<applicationAPI.updateRequestType>();
export const updateSuccess = createAction(UPDATE_SUCCESS)();
export const updateFailure = createAction(UPDATE_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, applicationAPI.list);
const writeSaga = createRequestSaga(WRITE, applicationAPI.write);
const updateSaga = createRequestSaga(UPDATE, applicationAPI.update);

export function* applicationSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(UPDATE, updateSaga);
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
};
type applicationAction = ActionType<typeof actions>;
type applicationState = {
  list: applicationAPI.listResponseType | null;
  reload: boolean | null;
};
const initialState: applicationState = {
  list: null,
  reload: null,
};

const application = createReducer<applicationState, applicationAction>(
  initialState,
  {
    [INIT_COMMENT]: () => initialState,
    [LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      list: payload.data,
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
  },
);

export default application;
