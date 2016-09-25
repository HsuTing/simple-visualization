'use strict';

import React from 'react';
import {StyleRoot} from 'radium';

import Link from './radium/link';
import {MAIN_COLOR, SECOND_COLOR} from './../style';

export default class Root extends React.Component {
  render() {
    const list = [
      {name: '新發中風住院', link: '/simple-visualization/'},
      {name: '復發中風住院', link: '/simple-visualization/relapse/'},
      {name: '出院短期', link: '/simple-visualization/short/'},
      {name: '出院長期', link: '/simple-visualization/long/'}
    ];

    return (
      <StyleRoot style={{width: '100%',
                         color: 'white',
                          background: MAIN_COLOR}}
      >
        {list.map((button, index) => {
          const isClicked = this.props.location.pathname === button.link;

          return (
            <Link key={index}
                  to={button.link}
                  style={{display: 'inline-block',
                          width: '25%',
                          height: '50px',
                          lineHeight: '50px',
                          textAlign: 'center',
                          opacity: isClicked ? '1' : '0.65',
                          borderBottom: isClicked ? '3px solid ' + SECOND_COLOR : '0px',
                          ':hover': {
                            opacity: '1'
                          }}}
            >{button.name}</Link>
          );
        })}
      </StyleRoot>
    );
  }
}
