module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {

      // Assets to watch:
      files: ['framework/react_components/**/*','framework/assets/**/*.less','templates/**/*'],

      // When assets are changed:
      tasks: ['compile']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
