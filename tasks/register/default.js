module.exports = function (grunt) {
  grunt.registerTask('default', ['clean:dist','build', 'browserSync', 'watch']);
};
