'use strict';

import * as Action from './../actions/relapse';

const initialState = {
  type: 0
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Action.CHOOSE_RELAPSE_TYPE:
      return Object.assign({}, state, {
        type: action.value
      });

    default:
      return state;
  }
};
