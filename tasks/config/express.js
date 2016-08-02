module.exports = function(grunt) {

  grunt.config.set('express', {
    app: {
      options: {
        script: '<%= dirs.root %>/app.js',
        node_env: 'development'
      }
    },
    build: {
      options: {
        script: '<%= dirs.root %>/app.js',
        node_env: 'production'
      }
    }
  });
  grunt.loadNpmTasks('grunt-express-server');
};