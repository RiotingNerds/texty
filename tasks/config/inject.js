module.exports = function(grunt) {

  grunt.config.set('injector', {
    framework: {
      options: {
        relative:false,
        destFile: '<%= dirs.framework %>/views/layout/main.ejs',
        ignorePath: [
          '<%= dirs.root %>/www',          
        ]
      },
      files: [{
        expand: true,
        flatten: true,
        src: ['<%= dirs.root %>/www/assets/admin/js/**/*.js','<%= dirs.root %>/www/assets/admin/css/**/*.css'],
        dest: '<%= dirs.framework %>/views/layout/main.ejs'
      }]
    },
    frameworkBower: {
      options: {
        template:'<%= dirs.framework %>/views/layout/main.ejs',
        relative:false,
        ignorePath: [
          '<%= dirs.root %>/www'
        ],
        bowerPrefix:"bower:"
      },
      files: [{
        expand: false,
        src: ['<%= dirs.root %>/www/assets/admin/js/**/*.js','<%= dirs.root %>/www/assets/admin/css/**/*.css'],
        dest: '<%= dirs.framework %>/views/layout/main.ejs'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-injector');
};