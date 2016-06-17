/* eslint-disable */
var webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    gulp = require('gulp'),
    fs = require('fs');

var config = {
  server: {
    files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css'],
    port: process.env.PORT || 3000,
    baseDir: 'build'
  },
  scss: {
    watch: 'src/css/**/*.scss',
    src: ['src/css/app.scss', 'src/css/critical.scss'],
    build: 'build/css',
    dist: 'dist/css'
  },
  html: {
    src: 'src/index.html',
    dist: 'dist',
    build: 'build',
    style: {
      dev: 'build/css/critical.css',
      prod: 'dist/css/critical.css'
    },
    minOptions: {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }
  }
};

var compiler = webpack(webpackConfig);

gulp.task('serve', function () {
  var useHttps = process.env.SERVER === 'https';

  browserSync({
    files: config.server.files,
    port: config.server.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    https: useHttps,
    open: false,
    ui: false,
    server: {
      baseDir: config.server.baseDir,
      middleware: [
        webpackDevMiddleware(compiler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(compiler)
      ]
    }
  });
});

gulp.task('sass-build', function () {
  return gulp.src(config.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.scss.build));
});

gulp.task('sass-watch', function () {
  gulp.watch(config.scss.watch, ['sass-build']);
});

gulp.task('sass-dist', function () {
  return gulp.src(config.scss.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(config.scss.dist));
});

gulp.task('html-inject-build', ['sass-build'], function () {
  return gulp.src(config.html.src)
    .pipe(replace('<!-- inject:critical.css -->', '<style>' + fs.readFileSync(config.html.style.dev, 'utf8') + '</style>'))
    .pipe(gulp.dest(config.html.build));
});

gulp.task('html-inject-dist', ['sass-dist'], function () {
  return gulp.src(config.html.src)
    .pipe(replace('<!-- inject:critical.css -->', '<style>' + fs.readFileSync(config.html.style.prod, 'utf8') + '</style>'))
    .pipe(htmlmin(config.html.minOptions))
    .pipe(gulp.dest(config.html.dist));
});

gulp.task('html-watch', function () {
  gulp.watch([config.html.src, config.html.style.dev], ['html-inject-build']);
});

gulp.task('start', ['sass-watch', 'html-inject-build', 'html-watch']);
gulp.task('dist', ['html-inject-dist']);
