module.exports = function(grunt) {

  grunt.config.set('less', {
    dev: {
      options: {
        sourceMapBasepath:'/'
      },
      files:  [{
        expand: false,
        src: ['<%= dirs.framework %>/assets/texty.less','<%= dirs.template %>/**/*.less'],
        dest: '.tmp/assets/public/css/dv.css',
        ext: '.css'
      }]
    },
    prod: {
      options: {
        sourceMapBasepath:'/',
        plugins: [
          new (require('less-plugin-clean-css'))(["compatibility=ie8",'advanced','sourceMapInlineSources'])
        ],
      },
      files:  [{
        expand: false,
        src: ['<%= dirs.framework %>/assets/texty.less','<%= dirs.template %>/**/*.less'],
        dest: '.tmp/assets/public/css/dv.css',
        ext: '.css'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
};
