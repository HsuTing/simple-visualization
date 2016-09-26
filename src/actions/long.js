'use strict';

// choose type
export const CHOOSE_TYPE = 'CHOOSE_TYPE';
export const chooseType = (action, dispatch) => {
  dispatch({
    type: CHOOSE_TYPE,
    value: action.value
  });
};
