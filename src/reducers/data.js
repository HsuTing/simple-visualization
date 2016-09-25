'use strict';

import * as Action from './../actions/data';

const initialState = {
  data: [],
  hospital: [],
  ratio: [0.1, 0.5],
  choiceHospital: '',
  choiceRatio: 0.1
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Action.ADD_DATA:
      return Object.assign({}, state, {
        data: [...action.data],
        hospital: action.data.map(d => {
          return d[1];
        })
      });

    default:
      return state;
  }
};
