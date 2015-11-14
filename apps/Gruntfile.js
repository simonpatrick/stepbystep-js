'use strict'
module.exports = function(grunt){
  grunt.registerTask('default',function(){
    grunt.log.write('Hello World!');
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify:{
      options:{
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build:{
        src: '<%= pkg.name %>/js',
        dest: 'build/<%= pkg.name %>/js'
      }
    }
});
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);

}
