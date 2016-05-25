var browserSync = require('browser-sync'),
    replace = require('gulp-replace'),
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
    dist: 'dist/index.html',
    build: 'build',
    style: {
      dev: 'build/css/critical.css',
      prod: 'dist/css/critical.css'
    }
  }
};

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
    .pipe(gulp.dest(config.html.build));
});

gulp.task('html-watch', function () {
  gulp.watch([config.html.src, config.html.style.dev], ['html-inject-build']);
});

gulp.task('browser-sync', function () {
  var useHttps = process.env.SERVER === 'https';

  browserSync({
    server: config.server.baseDir,
    files: config.server.files,
    port: config.server.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    https: useHttps,
    open: false,
    ui: false
  });
});

gulp.task('serve', ['browser-sync']);
gulp.task('start', ['sass-build', 'sass-watch', 'html-inject-build', 'html-watch']);
gulp.task('dist', ['sass-dist', 'html-inject-dist']);
