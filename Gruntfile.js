module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        markdown: {
            posts: {
                files: ['_post/*'],
                dest: 'post',
                template: '_layout/post.html',
                options: {
                    gfm: true,
                    highlight: 'manual'
                }
            }
        },
        watch: {
          scripts: {
            files: '_post/*',
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
    grunt.registerTask('post', '', function () {
        var posts = [];
        grunt.file.recurse("_post", function (abspath, rootdir, subdir, filename) {
            if (grunt.file.isFile(abspath)) {
                var content = grunt.file.read(abspath);
                var firstLineEnd = content.indexOf('\n');
                var firstLine = content.substring(0, firstLineEnd).trim();
                if (firstLine.length == 0) {
                    console.error("没有内容：", filename);
                }
                var firstLineSegs = firstLine.split(' ');
                posts.push({
                    title: firstLineSegs[0],
                    date: firstLineSegs[1]
                });
            }
        });
        posts.forEach(function (post) {
            console.log(post.title, post.date);
        });
    });
};