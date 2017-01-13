'use strict';

var webpackConfig = require('./webpack.config');

delete webpackConfig.entry;
delete webpackConfig.externals;
delete webpackConfig.plugins;
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      'test/index.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/blob-util/dist/blob-util.min.js',
      'bower_components/blueimp-load-image/js/load-image.all.min.js',
      'src/*.js',
      'test/*.js',
      {
        pattern: 'test/*.{jpg,png}',
        watched: false,
        included: false
      }
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    frameworks: ['jasmine', 'angular-filesort'],
        angularFilesort: {
          whitelist: [
            'src/*.js'
          ]
     }
    singleRun: true,
    webpack: webpackConfig
  });
};
