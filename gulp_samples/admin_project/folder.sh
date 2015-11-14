#! /bin/sh
npm init
mkdir -p src/css  src/js src/less src/sass src/font src/images src/sass
mkdir -p dist
npm install gulp-uglify gulp-watch-path stream-combiner2 gulp-sourcemaps gulp-minify-css gulp-autoprefixer gulp-less gulp-ruby-sass gulp-imagemin gulp-util --save-dev
