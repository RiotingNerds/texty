module.exports = function (grunt) {
  grunt.config.set('browserSync', {
    dev: {
      bsFiles: {
        src: ['www/**/*.*']
      },
      options: {
        // When your app also uses web sockets
        // NOTE: requires 2.8.1 or above
        proxy: "localhost:1337",
        watchTask: true,
        open: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
};