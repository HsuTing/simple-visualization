'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';
import countTotal from './../countTotal';

import Chart from './chart/index';

import {chooseType} from './../actions/short';

class ShortTerm extends React.Component {
  chooseType(index) {
    chooseType({
      value: index
    }, this.props.dispatch);
  }

  render() {
    return (
      <StyleRoot style={Grid}>
        <div style={cell([12, 8, 4])}>
          <div style={{padding: '40px 0px 0px',
                       textAlign: 'center'}}
          >{'資料類別：' + this.props.data[1].typeName}</div>
        </div>
        <div style={cell([6, 4, 4])}>
          <Chart {...this.props.data[0]}
                 onClick={this.chooseType.bind(this)}
          />
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
    data[2] - save * data[7],
    0,
    0,
    data[5] - save * data[10],
    data[17] * choiceRatio * (1 - 0.07) * 0.05
  ];
  dataOne[2] = data[4] - dataOne[4] - save * data[9];
  dataOne[1] = data[17] * choiceRatio * (1 - 0.07) - countTotal(dataOne);
  const ratios = [
    [1, 0.5, 0.38, 0.3, 0.41, 0.15, 0.05, 0],
    [1, 1, 0.38, 0.3, 0.41, 0.15, 0.05, 0]
  ];
  let typeName = 'AGGREE.';
  let dataTwo = [];
  switch(state.short.type) {
    case 1:
      dataTwo = ratios[0].map(ratio => {
        return dataOne[0] * 0.0139 * ratio;
      });
      typeName = 'AGGREE.';
      break;

    case 2:
      dataTwo = ratios[0].map(ratio => {
        return dataOne[1] * 0.0139 * ratio;
      });
      typeName = 'ASA';
      break;

    case 3:
      dataTwo = ratios[1].map(ratio => {
        return dataOne[4] * 0.08 * ratio;
      });
      typeName = 'CLO.';
      break;

    case 4:
      dataTwo = ratios[1].map(ratio => {
        return dataOne[3] * 0.08 * ratio;
      });
      typeName = 'TICLO.';
      break;

    case 5:
      dataTwo = ratios[1].map(ratio => {
        return dataOne[4] * 0.023 * ratio;
      });
      typeName = 'ASA+CLO.';
      break;

    default:
      dataTwo = [0, 0, 0, 0, 0, 0, 0, 0].map((item, itemIndex) => {
        [dataOne[0], dataOne[1], dataOne[4], dataOne[3], dataOne[4]].forEach((d, index) => {
          switch(index + 1) {
            case 1:
            case 2:
              item += d * 0.0139 * ratios[0][itemIndex];
              break;

            case 3:
            case 4:
              item += d * 0.08 * ratios[1][itemIndex];
              break;

            case 5:
              item += d * 0.023 * ratios[1][itemIndex];
              break;

            default:
              break;
          }
        });
        return item;
      });
      typeName = '總病患數';
      break;
  }

  return {
    data: [{
      list: ['總患病數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.', 'ASA+CLO.'],
      componentData: [countTotal(dataOne)].concat(dataOne),
      max: getMax(Math.max(...dataOne))
    }, {
      list: [(state.short.type === 0 ? '總不耐受' : '不耐受' + typeName), 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo)),
      typeName: typeName
    }]
  };
})(ShortTerm);
