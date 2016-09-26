'use strict';

import React from 'react';

import {CHART_HEIGHT} from './../../style';
import ChartElement from './chartElement';

export default class Chart extends React.Component {
  onClick() {
  }

  render() {
    const {componentData, max, list} = this.props;

    return (
      <svg style={{width: 'calc(100% - 40px)',
                   height: 'calc(' + CHART_HEIGHT + 'px * ' + componentData.length + ')',
                   margin: '50px 20px'}}
      >
        {componentData.map((data, index) => {
          return (
            <ChartElement key={index}
                          name={list[index]}
                          ratio={isNaN(data / max) ? 0 : data / max}
                          y={CHART_HEIGHT * index}
                          data={data}
                          style={{cursor: this.props.onClick !== undefined ? 'pointer' : 'initial'}}
                          onClick={(this.props.onClick || this.onClick).bind(this, index)}
            />
          );
        })}
      </svg>
    );
  }
}
