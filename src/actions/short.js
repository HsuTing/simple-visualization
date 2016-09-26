'use strict';

// choose type
export const CHOOSE_SHORT_TYPE = 'CHOOSE_SHORT_TYPE';
export const chooseType = (action, dispatch) => {
  dispatch({
    type: CHOOSE_SHORT_TYPE,
    value: action.value
  });
};
