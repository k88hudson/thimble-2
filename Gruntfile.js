module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        src: 'src/**/*.less',
        dest: 'dist/main.css',
        options: {
          dumpLineNumbers: 'comments'
        }
      },
      production: {
        src: 'src/**/*.less',
        dest: 'dist/main.css',
        options: {
          yuicompress: true
        }
      }
    },
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less:development'],
        options: { nospawn: true }
      },
      node: {
        files: [
          'app.js',
          'routes/**/*.js',
          'lib/*.js',
          'controllers/**/*.js',
          'models/**/*.js'
        ],
        tasks: ['develop'],
        options: { nospawn: true }
      },
      requirejs: {
        files: [
          'src/**/*.js'
        ],
        tasks: ['copy'],
        options: { nospawn: true }
      },
      jade: {
        files: ['src/**/*.jade'],
        tasks: ['jade:compileJSTemplates']
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: './src',
        src:'**/*.js',
        dest: 'dist'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        'routes/**/*.js',
        'src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jade: {
      compileJSTemplates: {
        options: {
          amd: true,
          client: true,
          compileDebug: false
        },
        files: {
          'dist/templates.js': ['src/**/*.jade']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './bower_components',
          mainConfigFile: './src/main.js',
          include: ['main'],
          paths: {
            'templates': '../dist/templates'
          },
          out: './dist/main.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', [
    'less:development',
    'jade:compileJSTemplates',
    'jshint',
    'copy',
    'develop',
    'watch'
  ]);

  grunt.registerTask('heroku', [
    'jade:compileJSTemplates',
    'less:production',
    'requirejs'
  ]);
};
