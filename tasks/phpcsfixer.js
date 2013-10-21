/*
 * Grunt PHP Coding Standard Fixer
 * https://github.com/openxo/grunt-php-cs-fixer
 *
 * Copyright (c) 2013 openXO Ltd.
 * http://www.openxo.com
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    var phpcsfixer = require('./lib/phpcsfixer').init(grunt);

    grunt.registerMultiTask('phpcsfixer', 'Fix PHP coding standards', function() {
        phpcsfixer.setup(this);
        phpcsfixer.run();
    });

};
