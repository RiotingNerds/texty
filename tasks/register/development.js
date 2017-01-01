module.exports = function (grunt) {
  grunt.registerTask('dev', ['clean:dist','buildDev','browserSync', 'watch']);
};
