module.exports = function (grunt) {
    var _ = require('underscore');
    var fs = require('fs');
    var walk = require('./modules/walk.js');
    var lessCombiner = require('./modules/less-combiner.js');

    var outputs = {
        less: './build/style.less',
        hoganHeader: './build/hoganheader.js',
        hoganBody: './build/hoganbody.js',
        templates: './build/templates.js'
    };

    (function makeSureWeHaveRequiredFoldersCreated() {
        if (!fs.existsSync('./build')) {
            fs.mkdirSync('./build');
        }
        if (!fs.existsSync('./log')) {
            fs.mkdirSync('./log');
        }
    })();

    lessCombiner.combine({
        paths: ['./less/', './features/'],
        outputFileName: outputs.less
    });

    (function createHoganHeader(outputFileName) {
        fs.writeFileSync(outputFileName, 'var Hogan = require("hogan.js");');
    })(outputs.hoganHeader);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    yuicompress: false,
                    ieCompat: true
                },
                files: {
                    './public/css/style.css': outputs.less
                }
            },
            production: {
                options: {
                    yuicompress: true,
                    ieCompat: true
                },
                files: {
                    './public/css/style.min.css': outputs.less
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: (function () {
                    var files = walk.match('./features', /(\.min)|(\.html)$/gi) || [];
                    return _.reduce(files, function (memo, file) {
                        memo[file.replace('.html', '.min.html')] = file;
                        return memo;
                    }, {});
                })()
            }
        },
        hogan: {
            publish: {
                options: {
                    prettify: false,
                    commonJsWrapper: true,
                    defaultName: function (file) {
                        return file
                            .replace('./features/', '')
                            .replace('/views/', '/')
                            .replace('.min.html', '')
                            .toLowerCase();
                    }
                },
                files: (function () {
                    var obj = {};
                    obj[outputs.hoganBody] = ['./features/**/*.min.html'];
                    return obj;
                })()
            }
        },
        concat: {
            options: {
                separator: '; '
            },
            templates: {
                src: [outputs.hoganHeader, outputs.hoganBody],
                dest: outputs.templates
            }
        },
        browserify: {
            production: {
                src: ['./features/**/app.startup.js'],
                dest: './public/js/script.js'
            }
        },
        uglify: {
            production: {
                files: {
                    './public/js/script.min.js': ['./public/js/script.js']
                }
            }
        },
        forever: {
            options: {
                index: 'index.js',
                command: 'node',
                logDir: 'log',
                errFile: 'forever-err.log',
                logFile: 'forever-log.log'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-hogan');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-forever');

    grunt.registerTask('build', ['less', 'htmlmin', 'hogan', 'concat', 'browserify', 'uglify']);
    grunt.registerTask('run', ['forever:start']);

    grunt.registerTask('default', 'Build and Run', function () {
        grunt.task.run(['build', 'run']);
    });

    /*
     How-to:
     -------------------
     To run grunt tasks go to '../web/node/' folder using command prompt, type 'grunt' and press Enter.
     It will run 'default' task that executes 'build' and 'run' tasks sequentially.
     If you want to run a specific task use following pattern 'grunt <task_name>' from command prompt.
     */
};