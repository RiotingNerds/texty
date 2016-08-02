module.exports = function(grunt) {
  grunt.registerTask('compile', [
    'webpack:framework',
    'less:framework',   
    'copy:framework'
  ]);
};