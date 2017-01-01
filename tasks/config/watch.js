module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {

      // Assets to watch:
      files: ['app/templates/**/*','app/assets/**/*.less'],

      // When assets are changed:
      tasks: ['clean','compileDev','copy:build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
