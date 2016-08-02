module.exports = function(grunt) {
  grunt.config.set('copy', {
    framework: {
      files: [{
        expand: true,
        cwd: '<%= dirs.framework %>/assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/assets/admin'
      }]
    },
    template: {
      files: [{
        expand: true,
        cwd: '<%= dirs.template %>/assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/assets/public'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};