module.exports = function(grunt) {
  grunt.registerTask('compile', [
    'clean:dist',
    'webpack:framework',
    'less:framework',
    'less:template',
    'copy:framework',
    'copy:template'
  ]);
};