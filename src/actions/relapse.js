'use strict';

// choose type
export const CHOOSE_RELAPSE_TYPE = 'CHOOSE_RELAPSE_TYPE';
export const chooseType = (action, dispatch) => {
  dispatch({
    type: CHOOSE_RELAPSE_TYPE,
    value: action.value
  });
};
