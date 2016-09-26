'use strict';

import fs from 'fs';
import * as dsv from 'd3-dsv';

fs.readFile('./../public/data.csv', 'utf8', (err, data) => {
  if(err)
    throw new Error(err);

  fs.writeFile('./../src/data.js', 'export default const data = ' + JSON.stringify(dsv.csvParse(data)) + ';', err => {
    if(err)
      throw new Error(err);
    console.log('make data.js');
  });
});
