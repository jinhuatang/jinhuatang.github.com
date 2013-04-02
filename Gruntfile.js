module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        markdown: {
            post: {
                files: ['_post/*'],
                dest: 'post',
                template: '_layout/post.html',
                options: {
                    gfm: true,
                    highlight: 'manual'
                }
            },
            posts: {
                files: ['posts.md'],
                dest: '.',
                template: '_layout/posts.html',
                options: {
                    gfm: true,
                    highlight: 'manual'
                }
            }
        },
        watch: {
            scripts: {
                files: '_post/*',
                tasks: ['default'],
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
    grunt.registerTask('posts', '', function () {
        var posts = [];
        grunt.file.recurse("_post", function (abspath, rootdir, subdir, filename) {
            if (grunt.file.isFile(abspath)) {
                var content = grunt.file.read(abspath);
                var firstLineEnd = content.indexOf('\n');
                var firstLine = content.substring(0, firstLineEnd).trim();
                if (firstLine.length == 0) {
                    grunt.log.error("没有内容：", filename);
                    return;
                }
                var firstLineSegs = firstLine.split(' ');
                var title = firstLineSegs[0];
                var date = firstLineSegs[1];
                if (title) {
                    title = title.trim();
                }
                if (date) {
                    date = date.trim();
                }
                if (!title) {
                    grunt.log.error("没有标题：", filename);
                    return;
                }
                if (!date) {
                    grunt.log.error("没有注明时间：", filename);
                    return;
                }
                url = filename.replace(/\.md$/, '.html');
                var postInfo = {
                    title: title,
                    date: date,
                    url: url
                };
                if (posts.length == 0) {
                    posts.push(postInfo);
                }
                else {
                    var hasSome = posts.some(function (post, index) {
                        if (post.date <= date) {
                            posts.splice(index, 0, postInfo);
                            return true;
                        }
                    });
                    if (hasSome == false) {
                        posts.push(postInfo);
                    }
                }
            }
        });
        var postMd = '';
        posts.forEach(function (post) {
            postMd += grunt.template.process('* [<%= title%> <%= date%>](post/<%= url%>)\n', { data: post })
        });
        grunt.file.write('posts.md', postMd);
    });

    grunt.registerTask('default', ['posts', 'markdown']);
};