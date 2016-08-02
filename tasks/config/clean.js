module.exports = function(grunt) {
  grunt.config.set('clean', {
    dist: ['.tmp','www'],
    build: ['www']
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
};
