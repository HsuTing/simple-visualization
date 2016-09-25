'use strict';

import React from 'react';
import {StyleRoot} from 'radium';

import Style from './style';
import Choice from './choice';
import Menu from './menu';

export default class Root extends React.Component {
  render() {
    return (
      <div style={{width: '100vw',
                   height: '100vh',
                   overflowX: 'hidden',
                   overflowY: 'scroll'}}
      >
        <Style />
        <Choice />
        <Menu location={this.props.location} />
        {this.props.children}
      </div>
    );
  }
}
