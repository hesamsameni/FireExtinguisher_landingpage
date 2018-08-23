const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    browserify = require('gulp-browserify'),
    path = require('path');


const SASS_INCLUDE_PATHS = [
    path.join(__dirname, 'dist/bower_components/foundation-sites/scss'),
    path.join(__dirname, 'dist/bower_components/font-awesome/web-fonts-with-css/scss/'),
    path.join(__dirname, 'dist/bower_components/owl.carousel/src/scss/'),
    path.join(__dirname, 'dist/bower_components/plyr/src/sass/')
];

var onError = function(error) {
    console.log(error);
};

gulp.task('scss', function() {
    gulp.src(['resources/scss/**/*.scss'])
        .pipe(sass({
            includePaths: SASS_INCLUDE_PATHS
        }).on('error', sass.logError))
        .pipe(gulp.dest('resources/css'))
});

gulp.task('css', function() {
    gulp.src(['resources/css/**/*.css'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(autoprefixer())
        .pipe(cssnano({
            zindex: false,
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    gulp.src(['resources/js/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(browserify({
            debug: false,
            transform: [
                'babelify',
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch(['resources/scss/**/*.scss', 'dist/bower_components/**/*.scss'], ['scss']);
    gulp.watch('resources/css/**/*.css', ['css']);
    gulp.watch(['resources/js/*.js'], ['js']);
});

gulp.task('default', ['scss', 'css', 'js', 'watch']);