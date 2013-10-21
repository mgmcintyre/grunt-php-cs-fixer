/**
 * PHP Coding Standards Fixer grunt plugin
 */
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    phpcsfixer: {
      app: {
        dir: 'php'
      },
      options: {
        bin: 'vendor/bin/php-cs-fixer',
        ignoreExitCode: true,
        level: 'all',
        quiet: true
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['phpcsfixer']);

};