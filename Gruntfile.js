module.exports = function (grunt) {
	
	"use strict";
	
	var pkg = grunt.file.readJSON("package.json"),
		key;
	
	grunt.initConfig({
		pkg: pkg,
		jshint: {
			files: [
				"Gruntfile.js",
				"jquery.<%= pkg.name %>.js",
				"jquery.<%= pkg.name %>.data.js"
			]
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> | (c) 2014 <%= pkg.author %> */\n"
			},
			build: {
				files: {
					"dist/jquery.<%= pkg.name %>.data.min.js": "jquery.<%= pkg.name %>.data.js",
					"dist/jquery.<%= pkg.name %>.min.js": "jquery.<%= pkg.name %>.js",
				}
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: "dist/",
				src: "*.js",
				dest: "build/<%= pkg.version %>/",
				flatten: true,
				filter: "isFile"
			},
		},
		watch: {
			files: [
				"jquery.*.js"
			],
			tasks: "default"
		},
	});

	// Loading dependencies
	for (key in pkg.devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) {
			grunt.loadNpmTasks(key);
		}
	}

	grunt.registerTask("default", ["jshint", "uglify", "copy"]);
};