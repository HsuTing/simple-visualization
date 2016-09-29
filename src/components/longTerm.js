'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import {MAIN_COLOR} from './../style';
import getMax from './../getMax';

import Chart from './chart/index';
import Explain from './explain';

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
          <div style={{padding: '20px 0px 0px',
                       textAlign: 'center'}}
          >{'資料類別：' + this.props.data[1].typeName}</div>
        </div>
        <div style={cell([6, 4, 4])}>
          <Chart {...this.props.data[0]}
                 onClick={this.chooseType.bind(this)}
          />
          <Explain>出院長期，Pletaal處方潛力來自不耐受目前Antiplatelets患者，但機會低。此時，若患者不耐受CLO./TICLO.當多數轉換成Pletaal；若患者不耐受ASA，Pletaal當與CLO./TICLO.競爭。</Explain>
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
  const colors = [MAIN_COLOR, '#2962FF', '#AEEA00', '#DD2C00', '#AA00FF'];
  const childColor = [];
  for(let i = 0; i < 8; i++) {
    childColor.push(colors[state.long.type]);
  }

  return {
    data: [{
      list: ['總患病數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'],
      color: colors,
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: [(state.long.type === 0 ? '總不耐受' : '不耐受' + typeName), 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      color: childColor,
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo)),
      typeName
    }]
  };
})(LongTerm);
