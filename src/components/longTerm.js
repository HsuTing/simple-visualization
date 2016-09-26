'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';

import Chart from './chart/index';

class LongTerm extends React.Component {
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
  const dataOne = data[16] === undefined ? [] : [data[16]].concat(
    data.slice(12, 16)
  );
  const dataTwo = data[16] === undefined ? [] : [
    (data[12] * 0.0139),
    (data[12] * 0.0139 * 0.5)
  ];

  return {
    data: [{
      list: ['總患病數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'],
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: ['不耐受AGGRE', 'PLT總潛力'],
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo))
    }]
  };
})(LongTerm);
