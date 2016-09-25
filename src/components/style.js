'use strict';

import React from 'react';
import radium from 'radium';
import normalize from 'radium-normalize';

class Style extends React.Component {
  render() {
    return (
      <div>
        <radium.Style rules={normalize} />
        <radium.Style scopeSelector="a"
                      rules={{color: 'inherit', textDecoration: 'initial'}}
        />
      </div>
    );
  }
}

export default radium(Style);
