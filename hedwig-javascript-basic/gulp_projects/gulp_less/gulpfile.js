/**
 * Created by patrick on 15/10/11.
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins');

gulp.task('default', ['watch']);

gulp.task('jsConcat', function () {
    return gulp.src('assets/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshinit-stylish'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('app.min.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('less2css', function () {
    return gulp.src('assets/css/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            casecade:false
        }))
        .pipe(plguins.cssmin())
        .pipe(gulp.dest('public/css')).on('error',gulp.log);
});

gulp.task('watch',function(){
    gulp.watch('assets/js/*.js',['jsConcat']);
    gulp.watch('assets/css/*.less',['less2css']);
});