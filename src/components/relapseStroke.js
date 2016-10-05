'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {StyleRoot} from 'radium';
import {Grid, Cell as cell} from 'hsuting/lib/layout';

import {MAIN_COLOR} from './../style';

import getMax from './../getMax';

import Chart from './chart/index';
import Explain from './explain';

import {chooseType} from './../actions/relapse';

class RelapseStroke extends React.Component {
  chooseType(index) {
    if(index === 1)
      return;

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
          <Explain>復發中風住院死亡率高達41%，Pletaal處方潛力來自ASA無效的存活患者，亦即原來要開CLO.或TICLO.，有機會改開Pletaal</Explain>
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
  const save = data[17] * 0.25 * 0.59;
  const dataOne = [
    data[17] * 0.25,
    save,
    save * data[7],
    save * data[8],
    save * data[9],
    save * data[10]
  ];
  let typeName = ['總病患數', 'ASA', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'][state.relapse.type];
  const ratios = [
    [1, 0.5, 0.38, 0.3, 0.41, 0.15, 0.05, 0],
    [1, 1, 0.38, 0.3, 0.41, 0.15, 0.05, 0]
  ];
  let dataTwo = [];
  switch(state.relapse.type) {
    case 2:
      dataTwo = ratios[0].map(ratio => {
        return save * data[7] * 0.82 * ratio;
      });
      break;

    case 3:
      dataTwo = ratios[0].map(ratio => {
        return save * data[8] * 0.82 * ratio;
      });
      break;

    case 4:
      dataTwo = ratios[1].map(ratio => {
        return save * data[9] * 0.82 * ratio;
      });
      break;

    case 5:
      dataTwo = ratios[1].map(ratio => {
        return save * data[10] * 0.82 * ratio;
      });
      break;

    default:
      dataTwo = [0, 0, 0, 0, 0, 0, 0, 0].map((item, itemIndex) => {
        dataOne.slice(2).forEach((d, index) => {
          switch(index) {
            case 0:
            case 1:
              item += d * 0.82 * ratios[0][itemIndex];
              break;

            case 2:
            case 3:
              item += d * 0.82 * ratios[1][itemIndex];
              break;

            default:
              break;
          }
        });
        return item;
      });
      break;
  }
  const colors = [MAIN_COLOR, '#2962FF', '#AEEA00', '#DD2C00', '#AA00FF', '#D50000'];
  const childColor = [];
  for(let i = 0; i < 8; i++) {
    childColor.push(colors[state.relapse.type]);
  }

  return {
    data: [{
      list: ['總病患數', '存活病患數', 'AGGRE.', 'ASA', 'CLO.', 'TICLO.'],
      color: colors,
      componentData: dataOne,
      max: getMax(Math.max(...dataOne))
    }, {
      list: [typeName === '總病患數' ? '總換藥人數' : typeName + '換藥數', 'PLT總潛力', 'SVD', 'ICAS', 'Age>75', 'PAD', 'AF', 'HPN'],
      color: childColor,
      componentData: dataTwo,
      max: getMax(Math.max(...dataTwo)),
      typeName
    }]
  };
})(RelapseStroke);
