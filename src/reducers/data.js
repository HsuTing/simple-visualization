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

const ratios = [];
for(let i = 0; i < 15; i++) {
  ratios.push(i / 100);
}
const initialState = {
  data: initialData,
  hospital: initialData.map((d, index) => {
    return (index + 1) + '. ' + d[0] + ' ' + d[1];
  }),
  ratio: ratios,
  choiceData: [...initialData[0]],
  choiceRatio: ratios[0]
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
