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
var imageResize = require('gulp-image-resize');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var criticalobj = require('critical').stream;





gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', uncss({
            html: ['src/index.html', 'src/pizza.html', 'src/project-2048.html', 'src/project-mobile.html', 'src/project-webperf.html']
        })))
        .pipe(gulpIf('*.css', csso()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});
//todo: some background is red now!!! fix dis


// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src(['dist/*.html', '!dist/pizza.html'])
        .pipe(criticalobj({base: 'dist/', inline: true,
            css: ['dist/css/styles.min.css', 'dist/css/print.min.css'/*, 'dist/css/pizzastyle.min.css'*/]}))
        .pipe(gulp.dest('dist'));
});




gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('pizzeria', function(){
    return gulp.src('src/img/pizzeria.jpg')



        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
            optimizationLevel : 7
        })))
        .pipe(imageResize({ width: 400 }))
        .pipe(gulp.dest('dist/img'))
});


gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['useref', 'images'],
        'critical',
        'pizzeria',
        callback
    )
});

