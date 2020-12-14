let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
  del.sync('build')
})

gulp.task('scss', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/animate.css/animate.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('src/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('src/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "src/"
      }
  });
});

gulp.task('export', function(){
  let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));

  let BuildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css'));

  let BuildJs = gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'));
    
  let BuildFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));

  let BuildImg = gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img'));   
});

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('start', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch'));