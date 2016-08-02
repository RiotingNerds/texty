module.exports = function(grunt) {
  grunt.registerTask('compileTemplate', [    
    //'webpack:template',
    'less:template',
    'copy:template'
  ]);
};