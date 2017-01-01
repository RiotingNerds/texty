module.exports = function(grunt) {
  grunt.registerTask('compileDev', [
    'webpack:dev',
    'less:dev',
    'copy:template'
  ]);
};
