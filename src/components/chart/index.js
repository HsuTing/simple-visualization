'use strict';

import React from 'react';

import {CHART_HEIGHT, MAIN_COLOR} from './../../style';

import ChartElement from './chartElement';

export default class Chart extends React.Component {
  onClick() {
  }

  render() {
    const {componentData, max, list, onClick, color} = this.props;

    return (
      <svg style={{width: 'calc(100% - 40px)',
                   height: 'calc(' + CHART_HEIGHT + 'px * ' + componentData.length + ')',
                   margin: '20px'}}
      >
        {componentData.map((data, index) => {
          return (
            <ChartElement key={index}
                          name={list[index]}
                          ratio={isNaN(data / max) ? 0 : (max === 0 ? 0 : Math.abs(data) / Math.abs(max))}
                          y={CHART_HEIGHT * index}
                          data={data}
                          style={{cursor: onClick !== undefined ? 'pointer' : 'initial'}}
                          color={color === undefined ? MAIN_COLOR : color[index] || MAIN_COLOR}
                          onClick={(this.props.onClick || this.onClick).bind(this, index)}
            />
          );
        })}
      </svg>
    );
  }
}
