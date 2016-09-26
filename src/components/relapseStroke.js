'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';

import Chart from './chart/index';

class RelapseStroke extends React.Component {
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
  const choiceRatio = state.data.choiceRatio;
  const save = data[17] * 0.25 * 0.59;
  const dataOne = [
    data[17] * 0.25,
    save,
    save * data[7],
    save * data[8],
    save * data[9],
    save * data[10]
  ];
  const max = save * data[10] * data[9];
  const dataTwo = [1, 0.5, 0.38, 0.3, 0.41, 0.15, 0.05, 0].map(ratio => {
    return max * ratio;
  });

  return {
    data: [{
      list: ['總病患數', '存活病患數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'],
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: ['ASA換藥數', 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo))
    }]
  };
})(RelapseStroke);
