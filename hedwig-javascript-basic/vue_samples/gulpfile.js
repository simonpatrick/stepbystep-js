var gulp = require('gulp');
var uglify = require('gulp-uglify');
//var minifyCSS = require('gulp-minify-css');
var concat=require('gulp-concat');

gulp.task('js',function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('auto', function () {
    gulp.watch('js/*js', ['js']);
    //gulp.watch('css/*.css', ['css'])
    //gulp.watch('less/*.less', ['less'])
    //gulp.watch('images/*.*', ['images'])
    //gulp.watch('fonts/*.*', ['fonts'])

});

gulp.task('default',['js','auto']);


