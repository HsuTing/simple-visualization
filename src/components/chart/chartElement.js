'use strict';

import React from 'react';
import radium from 'radium';

import {CHART_HEIGHT} from './../../style';

class ChartElement extends React.Component {
  render() {
    const {data, name, ratio, y, onClick, style, color} = this.props;
    const outputData = String(Math.round(data));

    return (
      <g style={{transform: 'translate(140px, calc(0px + ' + y + 'px))'}}>
        <text x="-10"
              y={(CHART_HEIGHT - 20) / 2 + 15}
              textAnchor="end"
        >{name}</text>
        <rect x="0"
              y={(CHART_HEIGHT - 20) / 2}
              style={{width: 'calc(calc(100% - 140px) * ' + (ratio) + ')',
                      height: '18.5px',
                      opacity: ratio < 0.3 ? 0.3 : ratio,
                      fill: color}}
        />
        <text x="5"
              y="15"
              y={(CHART_HEIGHT - 20) / 2 + 15}
              style={{fill: 'black',
                      opacity: 1}}
        >{outputData}</text>
        <rect key="chartElement"
              x="-140"
              y={(CHART_HEIGHT - 20) / 2}
              style={[style, {width: '100%',
                      height: CHART_HEIGHT + 'px',
                      opacity: '0'}]}
              onClick={onClick}
        />
      </g>
    );
  }
}

export default radium(ChartElement);
