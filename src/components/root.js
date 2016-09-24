'use strict';

import React from 'react';
import {StyleRoot, Style} from 'radium';
import normalize from 'radium-normalize';

export default class Root extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Style rules={normalize} />

        Hello word!
      </StyleRoot>
    );
  }
}
