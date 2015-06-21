module.exports = function(grunt){
    grunt.initConfig({
       jshint:{},
       concat:{},
       uglify:{},
       watch:{},
       cssmin:{
           minify:{
               expand:true,
               cwd:'css/',
               src:['*.css','!*.min.css'],
               dest:'css/',
               ext:'.min.css'
           },
           combine:{
               files:{
                   'css/out.min.css':['css/part1.min.css','css/part2.min.css']
               }
           }
       }
    });
    //load modules from npm
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //registerTask 定义一个任务
    grunt.registerTask('default',function(){
        console.log("this is hello task")
    });
   // grunt.registerTask('check','jshint');

};