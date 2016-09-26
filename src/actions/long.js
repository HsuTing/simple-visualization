'use strict';

// choose type
export const CHOOSE_LONG_TYPE = 'CHOOSE_LONG_TYPE';
export const chooseType = (action, dispatch) => {
  dispatch({
    type: CHOOSE_LONG_TYPE,
    value: action.value
  });
};
