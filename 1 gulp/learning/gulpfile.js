var gulp = require('gulp');
var sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');
var del = require('delete');

sass.compiler = require('node-sass');

var paths = {
  styles: {
    src: 'src/css/**/*.scss',
    dest: 'output/styles/'
  },
  scripts: {
    src: [
      'src/js/index.js',
      'src/js/util/index.js',
      'src/js/util/array.js',
      'src/js/util/string.js',
      'src/js/canvas/Texture.js',
    ],
    dest: 'output/scripts/'
  }
};

function clean () {
  return del(['output']);
}

function styles () {
  console.log('tast: styles')
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bin.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cssmin())
    .pipe(rename({
      basename: 'bin',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts () {
  console.log('tast: scripts')
  return gulp.src(paths.scripts.src, {sourcemaps: true})
    .pipe(babel())
    .pipe(concat('bin.js'))
    // 输出一个未压缩过的版本
    .pipe(gulp.dest(paths.scripts.dest))
    // 输出一个压缩过的并且重命名 .min.js 的文件
    .pipe(uglify())
    .pipe(rename({
      basename: 'bin',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch () {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);

  return Promise.resolve()
}

var build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.watch = watch;
exports.build = build;

exports.default = build;