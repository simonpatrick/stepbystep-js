# Gulp Quick start

## Install gulp 安装gulp

两种gulp的方式:

- 全局安装

```sh
 npm install gulp -g
```
 
- 项目开发依赖(devDependencies)安装:

```sh
npm install gulp --save-dev
```

## 创建gulpfile.js

```js
var gulp = require('gulp');
gulp.task('default',function(){
    console.log("default task for learning gulp notes");
})
```

以上代码创建一个gulp的默认任务,运行gulp

```sh
gulp
```
结果如下:

```sh
[21:09:09] Starting 'default'...
default task for learning gulp notes
[21:09:09] Finished 'default' after 106 μs
```

默认任务被运行,如果是不是执行gulp默认任务的话,需要运行如下命令
```sh
 gulp <task> <otherTasks> 
 ```

## What's Next?

以下需要学习以下任务:
- src
- watch
- dest
- cli

