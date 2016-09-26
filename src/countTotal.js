'use strict';

export default array => {
  return array.reduce((a, b) => {
    return a + b;
  }, 0);
};
