module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist'],
      build: ['build/<%= pkg.version %>.<%= grunt.template.today("yyyymmdd") %>'],
      release: ['releases/<%= pkg.version %>'],
      site: ['_gh_pages']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['*.js', 'src/*.js']
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: [/*'*.js', */'src/*.js']
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js',
          'dist/<%= pkg.name %>.data.min.js': 'src/<%= pkg.name %>.data.js'
        }
      },
      site: {
        src: 'docs/js/docs.js',
        dest: '_gh_pages/js/docs.js'
      }
    },

    replace: {
      dist: {
        options: {
          prefix: '@',
          patterns: [{
            match: 'VERSION',
            replacement: '<%= pkg.version %>'
          }, {
            match: 'DATE',
            replacement: new Date().toISOString()
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/*.js',
          dest: 'dist/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '_gh_pages/index.html': 'docs/index.html'
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: 'src/*.js',
        dest: 'dist'
      },
      build: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: 'build/<%= pkg.version %>.<%= grunt.template.today("yyyymmdd") %>'
      },
      release: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: 'releases/<%= pkg.version %>'
      },
      docs: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: 'docs/js/'
      },
      site: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: '_gh_pages/js/'
      },
      html: {
        expand: true,
        flatten: true,
        src: 'docs/*.html',
        dest: '_gh_pages'
      }
    },

    watch: {
      files: [
        'src/<%= pkg.name %>.js'
      ],
      tasks: 'jshint'
    }
  });

  // Loading dependencies
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('site', ['clean:site', 'uglify:site', 'copy:site', 'copy:html', 'htmlmin']);

  grunt.registerTask('default', ['clean', 'jshint', 'jscs', 'uglify:dist', 'copy:dist', 'replace', 'copy:build', 'copy:release', 'copy:docs']);
};
