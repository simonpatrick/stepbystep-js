/**
 * Created by patrick on 15/9/27.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var sass = require('gulp-ruby-sass');
var gutil=require('gulp-util');

gulp.task('default',
    ['script', 'auto', 'less', 'sass', 'css', 'message','images']);

gulp.task('sass', function () {
    return sass('sass/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        }).pipe(gulp.dest('dist/csss'))
})

gulp.task('message',function(){
    gutil.log('output message .......');
    gutil.log(gutil.colors.red('error'));
    gutil.log(gutil.colors.green('message:')+"good");
})
gulp.task('script', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function () {
    // 1. 找到图片
    gulp.src('images/*.*')
        // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});
//todo: watch path.....
gulp.task('auto', function () {
    gulp.watch('js/*js', ['script']);
    gulp.watch('css/*.css', ['css'])
    gulp.watch('less/*.less', ['less'])
    gulp.watch('images/*.*', ['images'])
    gulp.watch('fonts/*.*', ['fonts'])

});