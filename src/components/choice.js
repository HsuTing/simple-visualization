'use strict';

import React from 'react';
import {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import {CenterCenter} from 'hsuting/lib/layout';

import {MAIN_COLOR} from './../style';
import Upload from './upload';

import {chooseData, chooseRatio} from './../actions/data';

class Choice extends React.Component {
  chooseRatio(e) {
    chooseRatio({
      value: Number(e.target.value.replace('%', '')) / 100
    }, this.props.dispatch);
  }

  chooseData(e) {
    chooseData({
      index: Number(e.target.value.split('.')[0]) - 1
    }, this.props.dispatch);
  }

  render() {
    const style = {
      padding: '5px 0px'
    };
    const {componentData} = this.props;

    return (
      <StyleRoot style={[{width: '100%',
                          padding: '20px 0px',
                          color: 'white',
                          background: MAIN_COLOR}, CenterCenter]}
      >
        <div>
          <div style={[style, CenterCenter]}>
            上傳資料：
            <Upload />
          </div>
          <div style={[style, CenterCenter]}>
            選擇醫院：
            <select onChange={this.chooseData.bind(this)}>
              {componentData.hospital.map((data, index) => {
                return (
                  <option key={index}
                  >{data}</option>
                );
              })}
            </select>
          </div>
          <div style={[style, CenterCenter]}>
            住院患者處方ASA+CLO.比例：
            <select onChange={this.chooseRatio.bind(this)}>
              {componentData.ratio.map((ratio, index) => {
                return (
                  <option key={index}
                  >{ratio * 100 + '%'}</option>
                );
              })}
            </select>
          </div>
        </div>
      </StyleRoot>
    );
  }
}

export default connect(state => {
  return {componentData: state.data};
})(Choice);
