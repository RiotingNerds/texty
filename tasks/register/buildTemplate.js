module.exports = function(grunt) {
  grunt.registerTask('buildTemplate', [
    'compileTemplate',
    'clean:build',
    'copy:build',
    'injector:framework'
  ]);
};