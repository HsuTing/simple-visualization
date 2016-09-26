'use strict';

import * as Action from './../actions/data';

const initialState = {
  data: [],
  hospital: [],
  ratio: [0.1, 0.5],
  choiceData: [],
  choiceRatio: 0.1
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Action.ADD_DATA:
      return Object.assign({}, state, {
        data: [...action.data],
        hospital: action.data.map((d, index) => {
          return (index + 1) + '. ' + d[1];
        }),
        choiceData: [...action.data[0]]
      });

    case Action.CHOOSE_DATA:
      return Object.assign({}, state, {
        choiceData: [...state.data[action.index]]
      });

    case Action.CHOOSE_RATIO:
      return Object.assign({}, state, {
        choiceRatio: action.value
      });

    default:
      return state;
  }
};
