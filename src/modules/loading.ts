import { createAction, ActionType, createReducer } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING)<string>();
export const finishLoading = createAction(FINISH_LOADING)<string>();

const actions = { startLoading, finishLoading };
type loadingAction = ActionType<typeof actions>;
type loadingState = {
  [key: string]: boolean;
};
const initialState = {};

const loading = createReducer<loadingState, loadingAction>(initialState, {
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
});

export default loading;
