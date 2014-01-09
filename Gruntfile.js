module.exports = function (grunt) {
	
	"use strict";
	
	var pkg = grunt.file.readJSON("package.json"),
		key;
	
	grunt.initConfig({
		pkg: pkg,
		jshint: {
			files: [
				"Gruntfile.js",
				"jquery.<%= pkg.name %>.js"
			]
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> | (c) 2014 <%= pkg.author %> */\n"
			},
			build: {
				files: {
					"jquery.<%= pkg.name %>.min.js": "jquery.<%= pkg.name %>.js"
				}
			}
		},
		watch: {
			files: [
				"jquery.<%= pkg.name %>.js"
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

	grunt.registerTask("default", ["jshint", "uglify"]);
};