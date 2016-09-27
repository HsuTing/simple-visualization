'use strict';

import * as Action from './../actions/data';
import data from './../data';

// format data
const formatData = data => {
  return data.map(item => Object.keys(item).map((key, index) => {
    const value = item[key];
    if(index >= 2)
      return value === '' ? 0 : Number(value);
    return value;
  }));
};
const initialData = formatData(data);

const initialState = {
  data: initialData,
  hospital: initialData.map((d, index) => {
    return (index + 1) + '. ' + d[1];
  }),
  ratio: [0.05, 0.1, 0.12, 0.2],
  choiceData: [...initialData[0]],
  choiceRatio: 0.05
};

export default (state = initialState, action) => {
  switch(action.type) {
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
