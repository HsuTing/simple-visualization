var gulp = require('gulp');
var renderPug = require('tools-manager').renderPug;

var router = require('./../lib/routers/index.js');

var renderConfig = function(isTest) {
  return ['', 'relapse', 'short', 'long'].map(function(location) {
    return {
      input: isTest ? './views/test.pug' : './views/index.pug',
      output: location === '' ? './index.html' : './' + location + '/index.html',
      option: {
        reactRouter: {
          key: 'content',
          component: router.default,
          store: router.store,
          location: '/simple-visualization/' + location + '/'
        }
      }
    };
  });
};

gulp.task('render:html', function() {
  console.log('render html');
  renderPug(renderConfig(true));
});

gulp.task('render:prod', function() {
  console.log('render html');
  renderPug(renderConfig(false));
});
