module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    prod: {
      src: ['.tmp/css/**/*.css'],
      dest: '.tmp/css/production.min.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
