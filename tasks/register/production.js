module.exports = function (grunt) {
  grunt.registerTask('prod', ['clean:dist','buildProd']);
};
