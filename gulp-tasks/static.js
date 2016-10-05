var process = require('process');
var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var React = require('react');
var renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var Provider = require('react-redux').Provider;

var ENV = Boolean(Number(process.env.NODE_ENV) || 0);

var staticRender = function() {
  var Wrapper = require('./../lib/components/radium/Wrapper').default;

  ['', 'relapse', 'short', 'long'].map(function(name) {
    return {
      location: '/simple-visualization/' + name,
      router: require('./../lib/routers/index').default,
      store: require('./../lib/routers/index').store,
      name: name === '' ? 'index' : name
    };
  }).forEach(function(component) {
    if(component.router) {
      match({routes: component.router, location: component.location}, function(error, redirextLocation, renderProps) {
        if(renderProps)
          gulp.src(ENV ? './views/page.pug' : './views/test.pug')
            .pipe(rename(component.name === 'index' ? 'index.html' : component.name + '/index.html'))
            .pipe(pug({
              locals: {
                markup: renderToStaticMarkup(
                  React.createElement(Wrapper, null,
                    React.createElement(Provider, {store: component.store}, React.createElement(RouterContext, renderProps))
                  )
                )
              }
            }))
            .pipe(gulp.dest(process.cwd()));
        else
          gulp.src(ENV ? './views/page.pug' : './views/test.pug')
            .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
            .pipe(pug({
              locals: {
                markup: renderToStaticMarkup(
                  React.createElement('div', null, 'not find')
                )
              }
            }))
            .pipe(gulp.dest(process.cwd()));
      });
      return;
    }
    gulp.src(ENV ? './views/page.pug' : './views/test.pug')
      .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
      .pipe(pug({
        locals: {
          markup: renderToStaticMarkup(
            React.createElement(Wrapper, null,
              React.createElement(Provider, {store: component.store}, React.createElement(component.component))
            )
          )
        }
      }))
      .pipe(gulp.dest(process.cwd()));
  });
};
gulp.task('static:render', staticRender);

module.exports = staticRender;
