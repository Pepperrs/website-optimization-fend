// source https://css-tricks.com/gulp-for-beginners/
//
var gulp = require('gulp');

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});



gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});


gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['useref', 'images'],
        callback
    )
})