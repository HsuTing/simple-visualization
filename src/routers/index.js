'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import reducerData from './../reducers/data';
import reducerRelapse from './../reducers/relapse';
import reducerShort from './../reducers/short';
import reducerLong from './../reducers/long';

import Root from './../components/root';
import NewStroke from './../components/newStroke';
import RelapseStroke from './../components/relapseStroke';
import ShortTerm from './../components/shortTerm';
import LongTerm from './../components/longTerm';

const reducers = combineReducers({
  data: reducerData,
  relapse: reducerRelapse,
  short: reducerShort,
  long: reducerLong
});
export const store = createStore(reducers);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/simple-visualization/" component={Root}>
        <IndexRoute component={NewStroke} />
        <Route path="relapse" component={RelapseStroke} />
        <Route path="short" component={ShortTerm} />
        <Route path="long" component={LongTerm} />
        <Route path="*" component={NewStroke} />
      </Route>
    </Router>
  </Provider>
);
