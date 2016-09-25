'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {addData} from './../actions/data';

class Upload extends React.Component {
  getData(e) {
    addData({data: e.target.files[0]}, this.props.dispatch);
  }

  render() {
    return (
      <input type="file"
             style={{width: '170px',
                     outline: '0px'}}
             onChange={this.getData.bind(this)}
      />
    );
  }
}

export default connect()(Upload);
