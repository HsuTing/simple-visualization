'use strict';

import React from 'react';

import Wrapper from './../components/radium-wrapper';
import Router from './../routers/index';

export default class Index extends React.Component {
  render() {
    return (
      <Wrapper>
        {Router}
      </Wrapper>
    );
  }
}
