'use strict';

import React from 'react';
import radium from 'radium';

import {MAIN_COLOR, CHART_HEIGHT} from './../../style';

class ChartElement extends React.Component {
  render() {
    const {data, name, ratio, y, onClick, style} = this.props;
    const outputData = String(Math.round(data));

    return (
      <g style={{transform: 'translate(120px, calc(0px + ' + y + 'px))'}}>
        <text x="-10"
              y={(CHART_HEIGHT - 20) / 2 + 15}
              textAnchor="end"
        >{name}</text>
        <rect x="0"
              y={(CHART_HEIGHT - 20) / 2}
              style={{width: 'calc(calc(100% - 120px) * ' + (ratio) + ')',
                      height: '18.5px',
                      opacity: ratio < 0.3 ? 0.3 : ratio,
                      fill: MAIN_COLOR}}
        />
        <text x="5"
              y="15"
              y={(CHART_HEIGHT - 20) / 2 + 15}
              style={{fill: ratio > 0.5 ? 'white' : 'black',
                      opacity: radium.getState(this.state, 'chartElement', ':hover') ? 1 : 0}}
        >{outputData}</text>
        <rect key="chartElement"
              x="-120"
              y={(CHART_HEIGHT - 20) / 2}
              style={[style, {width: '100%',
                      height: CHART_HEIGHT + 'px',
                      opacity: '0',
                      ':hover': {}}]}
              onClick={onClick}
        />
      </g>
    );
  }
}

export default radium(ChartElement);
