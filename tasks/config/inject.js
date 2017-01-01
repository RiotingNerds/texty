module.exports = function(grunt) {

  grunt.config.set('injector', {
    framework: {
      options: {
        template:'<%= dirs.framework %>/templates/shop/layout/main.ejs',
        relative:false,
        destFile: '<%= dirs.framework %>/templates/shop/layout/main.ejs',
        ignorePath: [
          'www',
        ]
      },
      files: [{
        expand: true,
        flatten:true,
        src: ['www/assets/**/*.js','www/assets/**/*.css'],
      }]
    },
    frameworkBower: {
      options: {
        template:'<%= dirs.framework %>/templates/shop/layout/main.ejs',
        relative:false,
        ignorePath: [
          '<%= dirs.root %>/www'
        ],
        bowerPrefix:"bower:"
      },
      files: [{
        expand: true,
        cwd:'<%= dirs.root %>/www/',
        src: ['assets/admin/js/**/*.js','assets/admin/css/**/*.css'],
        dest: '<%= dirs.framework %>/templates/shop/layout/main.ejs'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-injector');
};
