'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from './../components/radium-wrapper';
import Router from './../routers/index';

(() => {
  ReactDOM.render(
    <Wrapper>
      {Router}
    </Wrapper>,
    document.getElementById('root')
  );
})();
