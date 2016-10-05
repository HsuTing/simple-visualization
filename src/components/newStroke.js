'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';

import Chart from './chart/index';
import Explain from './explain';

class NewStroke extends React.Component {
  render() {
    return (
      <StyleRoot style={Grid}>
        <div style={cell([6, 4, 4])}>
          <Chart {...this.props.data[0]} />
          <Explain>新發中風住院死亡率高達41%，但有82%會調整抗血小板劑，大部分存活者有換或加Pletaal的機會</Explain>
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
  const dataOne = [
    data[17] * 0.75 * (1 - 0.07)
  ];
  const max = (data[4] - data[17] * 0.75 * (1 - 0.07) * choiceRatio - data[9] * (data[17] * 0.25 * 0.59)) +
    (data[5] - data[10] * (data[17] * 0.25 * 0.59));
  const dataTwo = [1, 0.5, 0.38, 0.3, 0.41, 0.15, 0.05, 0].map(ratio => {
    return max * ratio;
  });

  return {
    data: [{
      list: ['ASA病患數'],
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: ['不耐受ASA', 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo))
    }]
  };
})(NewStroke);
