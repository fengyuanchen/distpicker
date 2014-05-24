module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner: "/*!\n" +
                " * Distpicker v<%= pkg.version %>\n" +
                " * <%= pkg.homepage %>\n" +
                " *\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
                " * Released under the <%= pkg.license.type %> license\n" +
                " */\n",
        clean: {
            files: ["build/<%= pkg.version %>", "dist/"]
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: ["*.js", "src/<%= pkg.name %>.js"]
        },
        uglify: {
            dist: {
                files: {
                    "dist/<%= pkg.name %>.min.js": "src/<%= pkg.name %>.js",
                    "dist/<%= pkg.name %>.data.min.js": "src/<%= pkg.name %>.data.js"
                }
            }
        },
        usebanner: {
            options: {
                position: "top",
                banner: "<%= banner %>"
            },
            files: ["dist/*.js"]
        },
        copy: {
            dist: {
                expand: true,
                cwd: "src/",
                src: "*.js",
                dest: "dist/",
                filter: "isFile"
            },
            build: {
                expand: true,
                cwd: "dist/",
                src: "*.js",
                dest: "build/<%= pkg.version %>/",
                filter: "isFile"
            }
        },
        watch: {
            files: ["src/*.js"],
            tasks: "default"
        }
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["clean", "jshint", "uglify", "copy:dist", "usebanner", "copy:build"]);
};
