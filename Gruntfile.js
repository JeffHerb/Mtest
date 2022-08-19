const sass = require('node-sass');

module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),
      
      sass: {
        dev: {
          options: { 
            sourceMap: true, 
            implementation: sass
          }, 

      
            files: {
                'dist/css/main.css': 'src/scss/main.scss',
            }
        }
      },

      

        copy: {
          main: {
            expand: true,
            cwd: 'src',
            src: '**/*.html',
            dest: 'dist/',
          },
        },

        

        clean: {
            dist: {
              src: ['./dist']
            },
            
        },

        connect: {
          server: {
            options: {
              middleware: function(connect, options, middlewares) {
                // inject a custom middleware into the array of default middlewares
                middlewares.unshift(function(req, res, next) {
                  if (req.url !== '/hello/world') return next();
       
                  res.end('Hello, world from port #' + options.port + '!');
                });
       
                return middlewares;
              },
            },
          },
        },

        watch: {
          options: {
            spawn: false,
            livereload: {
              host: 'localhost',
            }
          },
          scripts: {
            files: ['src/**/*.js'],
            tasks: [],
          },
          html: {
            files: ['**/*.html'],
            tasks: ['copy'],
            options: {
              spawn: false,
            },
          },
          css: {
            files: ['**/*.scss'],
            tasks: ['sass'],
            options: {
              spawn: false,
            },
          },
        },

    });


  
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
  
    grunt.registerTask('default', ['clean', 'copy', 'sass', 'connect', 'watch']);
  
  };