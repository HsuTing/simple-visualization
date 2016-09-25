'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import reducerData from './../reducers/data';

import Root from './../components/root';
import Index from './../components/index';

const reducers = combineReducers({
  data: reducerData
});
export const store = createStore(reducers);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/simple-visualization/" component={Root}>
        <IndexRoute component={Index} />
        <Route path="*" component={null} />
      </Route>
    </Router>
  </Provider>
);
