#!/usr/bin/env bash

# install gulp
npm install gulp -g

# init project
npm init

# install require-dir
npm install require-dir

# Folder structure

>
├── app
│   ├── _assets
│   ├── _data
│   ├── _drafts
│   ├── _includes
│   ├── _layouts
│   ├── _plugins
│   ├── _posts
│   └── index.html
├── gulp
│   └── tasks
├── gulpfile.js
├── node_modules
│   └── require-dir
└── package.json


# set default task

npm install --save-dev browser-sync

# install minify css
npm install gulp-minify-css --save-dev

# install uglify to compress js
npm install gulp-less --save-dev

# install file-watch
npm install gulp-watch --save-dev

