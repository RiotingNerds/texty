module.exports = function(grunt) {
  grunt.registerTask('buildProd', [
    'compileProd',
    'clean:build',
    'copy:build',
    'injector:framework'
  ]);
};
