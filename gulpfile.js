var gulp = require('gulp');
var gulpRequireTasks = require('gulp-require-tasks');
var renderPug = require('./../milk-cat').renderPug;

var ENV = Boolean(Number(process.env.NODE_ENV) || 0);

gulpRequireTasks({
  path: process.cwd() + '/../milk-cat/gulp-tasks'
});

gulp.task('render:html', function() {
  renderPug([{
    input: ENV ? './views/index.pug' : './views/test.pug',
    output: './index.html',
    option: {
      react: {
        content: './lib/static/index.js'
      }
    }
  }]);
});

gulp.task('default', [
  'render:html'
]);
