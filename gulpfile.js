const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const exec = require('gulp-exec');


gulp.task('html', () => gulp.src('src/*.html')
    .pipe(browserSync.reload({stream: true})));

gulp.task('css', () => gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/animate.css/animate.css',
])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({stream: true})));

gulp.task('scss', () => gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true})));

gulp.task('script', () => gulp.src('src/js/*.js')
    .pipe(browserSync.reload({stream: true})));


gulp.task('clean', async () => exec(() => `(if exist build rmdir /Q /S build)`));

gulp.task('js', () => gulp.src('node_modules/slick-carousel/slick/slick.js')
    .pipe(concat('slick.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true})));

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('export', async () => {
    gulp.src('src/**/*.html').pipe(gulp.dest('build'));
    gulp.src('src/css/**/*.css').pipe(gulp.dest('build/css'));
    gulp.src('src/js/**/*.js').pipe(gulp.dest('build/js'));
    gulp.src('src/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
    gulp.src('src/img/**/*.*').pipe(gulp.dest('build/img'));
});

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/js/*.js', gulp.parallel('script'))
});

//
gulp.task('start', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));

gulp.task('build', gulp.series('clean', 'export'))
