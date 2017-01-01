module.exports = function(grunt) {
  grunt.registerTask('buildDev', [
    'compileDev',
    'clean:build',
    'copy:build',
    'injector:framework',
  ]);
};
