'use strict';

import csv from 'csv';

// format data
const formatData = data => {
  return data.slice(1).map(item => item.map((d, index) => {
    if(index >= 2)
      return d === '' ? 0 : Number(d);
    return d;
  }));
};

// convert csv to array
const parseData = data => {
  return new Promise((resolve, reject) => {
    csv.parse(data, {}, (err, output) => {
      if(err)
        reject(err);
      else
        resolve(output);
    });
  });
};

// add data action
export const ADD_DATA = 'ADD_DATA';
export const addData = (action, dispatch) => {
  const file = action.data;

  // check type
  if(file.type !== 'text/csv') {
    alert('type error');
    return;
  }

  // read data
  const reader = new FileReader();
  reader.readAsText(file, 'utf-8');
  reader.onloadend = evt => {
    if(evt.target.readyState === FileReader.DONE)
      parseData(evt.target.result)
        .then(
          formatData
        ).then(data => {
          dispatch({
            type: ADD_DATA,
            data
          });
        }).catch(e => {
          console.log(e);
        });
  };
};
