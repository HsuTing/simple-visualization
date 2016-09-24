'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import reducerIndex from './../reducers/index';

import Root from './../components/root';

const reducers = combineReducers({
  index: reducerIndex
});
const store = createStore(reducers);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} />
    </Router>
  </Provider>
);
