'use strict';

import React from 'react';

import {CHART_HEIGHT} from './../../style';
import ChartElement from './chartElement';

export default class Chart extends React.Component {
  render() {
    const {componentData, max, list} = this.props;

    return (
      <svg style={{width: 'calc(100% - 40px)',
                   height: 'calc(' + CHART_HEIGHT + 'px * ' + componentData.length + ')',
                   margin: '50px 20px'}}
      >
        {componentData.map((data, index) => {
          const ratio = data === undefined ? 0 : data / max;

          return (
            <ChartElement key={index}
                          name={list[index]}
                          ratio={data === undefined ? 0 : data / max}
                          y={CHART_HEIGHT * index}
                          data={data}
            />
          );
        })}
      </svg>
    );
  }
}
