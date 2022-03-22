import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'modules/loading';

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default function createRequestSaga<P1, P2>(
  type: string,
  request: PromiseCreatorFunction<P1, P2>,
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: { type: string; payload: P1 }) {
    yield put(startLoading(type));
    try {
      const response: ResponseGenerator = yield call(request, action.payload);
      console.log(response);
      yield put({
        type: SUCCESS,
        payload: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
