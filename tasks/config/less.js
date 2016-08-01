module.exports = function(grunt) {

  grunt.config.set('less', {
    dev: {
      options: {        
        
      },
      files:  [{
        expand: true,
        src: ['framework/**/*.less','templates/**/*.less'],
        dest: '.tmp/css',
        ext: '.css'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
};