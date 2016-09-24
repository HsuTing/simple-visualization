var gulp = require('gulp');
var renderPug = require('./../../milk-cat').renderPug;

var renderConfig = function(isTest) {
  return [{
    input: isTest ? './views/test.pug' : './views/index.pug',
    output: './index.html',
    option: {
      reactRouter: {
        key: 'content',
        component: './lib/routers/index.js',
        location: '/'
      }
    }
  }];
};

gulp.task('render:html', function() {
  console.log('render html');
  renderPug(renderConfig(true));
});

gulp.task('render:prod', function() {
  console.log('render html');
  renderPug(renderConfig(false));
});
