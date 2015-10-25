var gulp = require('gulp');
var uglify=require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');


gulp.task('sass',function(){
   return sass('sass/')
       .on('error',function(err){
           console.error('Error!',err.message);
       }).pipe(gulp.dest('dist/css'));
});
gulp.task('less',function(){
   gulp.src('less/**.less')
    .pipe(less())
       .pipe(gulp.dest('dist/css'))
});

gulp.task('script',function(){
    gulp.src('js/*.js') //find src files
    .pipe(uglify()) //compress files
    .pipe(gulp.dest('dist/js'))// save compressed file
});

gulp.task('css',function(){
   //gulp.src('css/*.css')
   //    .pipe(minifyCss)
   //    .pipe(gulp.dest('dist/css'));
});

gulp.task('image',function(){
    gulp.src('images/*.*')
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('auto',function(){ //watch js changes
    gulp.watch('js/*.js',['script']);
    gulp.watch('css/*.css',['css']);
    gulp.watch('images/*.*',['images']);
    gulp.watch('less/**.less',['less']);
    gulp.watch('js/*.js',function(event){
        console.log(event);
        var paths = watchPath(event, '/', 'dist/')
        /*
         paths
         { srcPath: 'src/js/log.js',
         srcDir: 'src/js/',
         distPath: 'dist/js/log.js',
         distDir: 'dist/js/',
         srcFilename: 'log.js',
         distFilename: 'log.js' }
         */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
    })
});


gulp.task('log',function(){
        gutil.log('message');
        gutil.log(gutil.colors.red('error'));
        gutil.log(gutil.colors.green('message:')+"some");
});

gulp.task('default',['script','auto','css','image','log']);



