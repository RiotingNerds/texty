module.exports = function(grunt) {
  grunt.registerTask('compileProd', [
    'webpack:prod',
    'less:prod',
    'copy:template'
  ]);
};
