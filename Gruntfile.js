/**
 * PHP Coding Standards Fixer grunt plugin
 */
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    phpcsfixer: {
      app: {
        dir: ["php/src/Grunt/PhpCodingStandardsFixer/Sample.php", "php/src/Grunt/PhpCodingStandardsFixer/Sample"]
      },
      options: {
        bin: "vendor/bin/php-cs-fixer",
        usingCache: "no",
        quiet: true
      }
    }
  });

  grunt.loadTasks("tasks");
  grunt.registerTask("default", ["phpcsfixer"]);

};
