'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';

import Chart from './chart/index';

class NewStroke extends React.Component {
  render() {
    return (
      <StyleRoot style={Grid}>
        <div style={cell([6, 4, 4])}>
          <Chart {...this.props.data[0]} />
        </div>
        <div style={cell([6, 4, 4])}>
          <Chart {...this.props.data[1]} />
        </div>
      </StyleRoot>
    );
  }
}

export default connect(state => {
  const data = state.data.choiceData;
  const dataOne = data[17] === undefined ? [] : [(data[17] * state.data.choiceRatio * (1 - 0.07)) || 0];
  const dataTwo = [];

  return {
    data: [{
      list: ['ASA病患數'],
      componentData: dataOne,
      max: getMax(Math.max(dataOne))
    }, {
      list: ['HPN', 'AF', 'PAD', 'Age>75', 'ICAS', 'SVD', 'PLT總潛力', '不耐受ASA'],
      componentData: dataTwo,
      max: getMax(Math.max(dataTwo))
    }]
  };
})(NewStroke);
