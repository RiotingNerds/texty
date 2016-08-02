module.exports = function(grunt) {

  grunt.config.set('less', {
    template: {
      options: {        
        sourceMapBasepath:'/'
      },
      files:  [{
        expand: false,
        src: ['<%= dirs.template %>/assets/*.less'],
        dest: '.tmp/assets/public/css/template.css',
        ext: '.css'
      }]
    },
    framework: {
      options: {        
        
      },
      files:  [{
        expand: false,
        src: ['<%= dirs.framework %>/assets/texty.less'],
        dest: '.tmp/assets/admin/css/admin.css',
        ext: '.css'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
};