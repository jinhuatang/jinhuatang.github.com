﻿module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        markdown: {
            posts: {
                files: ['_posts/*'],
                dest: 'posts',
                template: '_layout/post.html',
                options: {
                    gfm: true,
                    highlight: 'manual'
                }
            }
        },
        watch: {
          scripts: {
            files: '_posts/*',
            tasks: ['markdown'],
            options: {
              interrupt: true
            }
          }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['markdown']);

};