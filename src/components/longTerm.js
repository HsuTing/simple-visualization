'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import getMax from './../getMax';

import Chart from './chart/index';

import {chooseType} from './../actions/long';

class LongTerm extends React.Component {
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
  const dataOne = [data[16]].concat(
    data.slice(12, 16)
  );
  const ratios = [
    [1, 0.5, 0.38, 0.3, 0.41, 0.15, 0.05, 0],
    [1, 1, 0.38, 0.3, 0.41, 0.15, 0.05, 0]
  ];
  let typeName = 'AGGREE.';
  let dataTwo = [];
  switch(state.long.type) {
    case 1:
      dataTwo = ratios[0].map(ratio => {
        return data[12] * 0.0139 * ratio;
      });
      typeName = 'AGGREE.';
      break;

    case 2:
      dataTwo = ratios[0].map(ratio => {
        return data[13] * 0.0139 * ratio;
      });
      typeName = 'ASA';
      break;

    case 3:
      dataTwo = ratios[1].map(ratio => {
        return data[14] * 0.0104 * ratio;
      });
      typeName = 'CLO.';
      break;

    case 4:
      dataTwo = ratios[1].map(ratio => {
        return data[15] * 0.0104 * ratio;
      });
      typeName = 'TICLO.';
      break;

    default:
      dataTwo = [0, 0, 0, 0, 0, 0, 0, 0].map((item, itemIndex) => {
        data.slice(12, 16).forEach((d, index) => {
          switch(index + 1) {
            case 1:
            case 2:
              item += d * 0.0139 * ratios[0][itemIndex];
              break;

            case 3:
            case 4:
              item += d * 0.0104 * ratios[1][itemIndex];
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
      list: ['總患病數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'],
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: [(state.long.type === 0 ? '總不耐受' : '不耐受' + typeName), 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo)),
      typeName: typeName
    }]
  };
})(LongTerm);
