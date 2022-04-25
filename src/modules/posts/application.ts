import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import * as applicationAPI from 'lib/api/application';

const INIT_APPLICATION = 'application/INIT_APPLICATION';
const LIST = 'application/LIST';
const LIST_SUCCESS = 'application/LIST_SUCCESS';
const LIST_FAILURE = 'application/LIST_FAILURE';
const WRITE = 'application/WRITE';
const WRITE_SUCCESS = 'application/WRITE_SUCCESS';
const WRITE_FAILURE = 'application/WRITE_FAILURE';
const READ = 'application/READ';
const READ_SUCCESS = 'application/READ_SUCCESS';
const READ_FAILURE = 'application/READ_FAILURE';
const UPDATE = 'application/UPDATE';
const UPDATE_SUCCESS = 'application/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'application/UPDATE_FAILURE';
const REMOVE = 'application/REMOVE';
const REMOVE_SUCCESS = 'application/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'application/REMOVE_FAILURE';

export const initApplication = createAction(INIT_APPLICATION)();
export const list = createAction(LIST)<number>();
export const listSuccess = createAction(LIST_SUCCESS)<any>();
export const listFailure = createAction(LIST_FAILURE)<AxiosError>();
export const write = createAction(WRITE)<number>();
export const writeSuccess = createAction(WRITE_SUCCESS)();
export const writeFailure = createAction(WRITE_FAILURE)<AxiosError>();
export const read = createAction(READ)<number>();
export const readSuccess = createAction(READ_SUCCESS)<any>();
export const readFailure = createAction(READ_FAILURE)<AxiosError>();
export const update = createAction(UPDATE)<applicationAPI.updateRequestType>();
export const updateSuccess = createAction(UPDATE_SUCCESS)();
export const updateFailure = createAction(UPDATE_FAILURE)<AxiosError>();
export const remove = createAction(REMOVE)<number>();
export const removeSuccess = createAction(REMOVE_SUCCESS)();
export const removeFailure = createAction(REMOVE_FAILURE)<AxiosError>();

const listSaga = createRequestSaga(LIST, applicationAPI.list);
const writeSaga = createRequestSaga(WRITE, applicationAPI.write);
const readSaga = createRequestSaga(READ, applicationAPI.read);
const updateSaga = createRequestSaga(UPDATE, applicationAPI.update);
const removeSaga = createRequestSaga(REMOVE, applicationAPI.remove);

export function* applicationSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(READ, readSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(REMOVE, removeSaga);
}

const actions = {
  initApplication,
  list,
  listSuccess,
  listFailure,
  write,
  writeSuccess,
  writeFailure,
  read,
  readSuccess,
  readFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
};
type applicationAction = ActionType<typeof actions>;
type applicationState = {
  list: any | null;
  read: string | null;
  reload: boolean | null;
};
const initialState: applicationState = {
  list: null,
  read: null,
  reload: null,
};

const application = createReducer<applicationState, applicationAction>(
  initialState,
  {
    [INIT_APPLICATION]: () => initialState,
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
    [READ]: state => ({
      ...state,
      read: null,
    }),
    [READ_SUCCESS]: (state, { payload }) => ({
      ...state,
      read: payload.data,
    }),
    [READ_FAILURE]: (state, { payload: error }) => {
      alert(error.response?.data.message);
      return state;
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
    [REMOVE]: state => ({
      ...state,
      reload: null,
    }),
    [REMOVE_SUCCESS]: state => ({
      ...state,
      reload: true,
    }),
    [REMOVE_FAILURE]: (state, { payload: error }) => {
      alert(error.response?.data.message);
      return {
        ...state,
        reload: false,
      };
    },
  },
);

export default application;
