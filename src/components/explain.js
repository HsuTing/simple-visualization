'use strict';

import React from 'react';

export default class Explain extends React.Component {
  render() {
    return (
      <div style={{width: 'calc(100% - 120px)',
                   margin: '0px 20px 0px 100px',
                   lineHeight: '25px'}}
           {...this.props}
      ></div>
    );
  }
}
