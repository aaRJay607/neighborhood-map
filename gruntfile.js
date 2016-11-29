module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: '*.js',
          dest: 'dist/js',
          // ext: '.min.js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: '*.css',
          dest: 'dist/css',
          // ext: '.min.css'
        }]
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                               // Dictionary of files
          'dist/index.html': 'src/index.html'   // 'destination': 'source'
        }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['uglify','cssmin','htmlmin']);
};
