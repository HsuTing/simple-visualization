'use strict';

export default num => {
  const length = String(parseInt(num, 10)).length;
  const count = Math.pow(10, length - 2);

  return Math.ceil(num / count) * count;
};
