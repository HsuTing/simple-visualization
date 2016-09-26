'use strict';

// choose data
export const CHOOSE_DATA = 'CHOOSE_DATA';
export const chooseData = (action, dispatch) => {
  dispatch({
    type: CHOOSE_DATA,
    index: action.index
  });
};

// choose ratio
export const CHOOSE_RATIO = 'CHOOSE_RATIO';
export const chooseRatio = (action, dispatch) => {
  dispatch({
    type: CHOOSE_RATIO,
    value: action.value
  });
};
