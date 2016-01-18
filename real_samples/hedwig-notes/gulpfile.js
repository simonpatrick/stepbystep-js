/**
 * Created by patrick on 16/1/17.
 */

// var requireDir= require('require-dir');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css')

//requireDir('./gulp/tasks',{recurse: true});

gulp.task('default',function(){
   console.log('Hello Gulp.js');
});

gulp.task('minifyCss',function(){
    return gulp.src('wikilike/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest("wikilike/dist/asset/css"));
})


var uglify = require('gulp-uglify');

gulp.task('compress', function() {
    return gulp.src('wikilike/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('wikilike/dist/assets/js'));
});


var watch = require('gulp-watch');

gulp.task('less', function() {
    return gulp.src('wikilike/less/*.less')
        .pipe(watch('wikilike/less/*.less'))
        .pipe(less())
        .pipe(gulp.dest('wikilike/css'));
});