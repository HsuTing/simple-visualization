'use strict';

import React from 'react';
import {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import {CenterCenter} from 'hsuting/lib/layout';

import {MAIN_COLOR} from './../style';
import Upload from './upload';

class Choice extends React.Component {
  render() {
    const style = {
      padding: '5px 0px'
    };
    const {componentData, dispatch} = this.props;

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
            <select>
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
            <select>
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
