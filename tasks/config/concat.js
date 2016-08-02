module.exports = function(grunt) {

  grunt.config.set('concat', {
    css: {
      src: ['.tmp/css'],
      dest: 'www/css/production.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
