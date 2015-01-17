/*
 * Grunt PHP Coding Standard Fixer
 * https://github.com/mgmcintyre/grunt-php-cs-fixer
 *
 * Licensed under the MIT license.
 */
'use strict';

// External libs.
var path = require("path"),
    exec = require("child_process").exec,
    async = require("async"),
    _ = require("underscore");

exports.init = function(grunt) {

    var exports  = {},
        defaults = {
            // Default options
            bin: "php-cs-fixer",
            level: null,
            fixers: null,
            dryRun: false,
            diff: false,
            verbose: false,
            quiet: false,
            ignoreExitCode: false,
            maxBuffer: 200*1024
        },
        cmds = null,
        done = null,
        config = {};

    /**
     * Builds phpunit command
     *
     * @return string
     */
    var buildCommands = function(paths) {

        var appends = [];

        if (grunt.option("verbose") || config.verbose) {
            appends.push("--verbose");
        }

        if (grunt.option("level") || config.level) {
            appends.push("--level=" + config.level);
        }

        if (grunt.option("fixers") || config.fixers) {
            var fixers = _.isString(config.fixers) ? config.fixers.split(",") : config.fixers;
            appends.push("--fixers=" + fixers.join(","));
        }

        if (grunt.option("dryRun") || config.dryRun) {
            appends.push("--dry-run");
        }

        if (grunt.option("diff") || config.diff) {
            appends.push("--diff");
        }

        if (grunt.option("framework") || config.framework) {
            appends.push("--config=" + config.framework);
        }

        var bin = path.normalize(config.bin),
            append = appends.join(" ");

        var cmds = _.map(paths, function(thePath) {
            return bin + " fix " + thePath + " " + append;
        });

        return cmds;
    };

    /**
     * Setup task before running it
     *
     * @param Object runner
     */
    exports.setup = function(runner) {

        var paths = _.isString(runner.data.dir) ? [runner.data.dir] : runner.data.dir;

        var pathList = _.map(paths, function(thePath) {
          return path.normalize(thePath);
        });

        config = runner.options(defaults);
        cmds = buildCommands(pathList);

        var logLine = "Running php-cs-fixer (target: " + runner.target.cyan + ") in "
            + "[" + pathList.join(", ").cyan + "]";

        grunt.log.writeln(logLine);

        _.each(cmds, function(cmd, i) {
            grunt.verbose.writeln("Exec [" + i + "]: " + cmd);
        });

        done = runner.async();
    };

    /**
     * Runs phpunit command with options
     *
     */
    exports.run = function() {
        var cmdOptions = {
            maxBuffer: config.maxBuffer
        };

        var timeA = +(new Date());
        var memA = process.memoryUsage().heapUsed;
        grunt.log.writeln();

        var runList = _.map(cmds, function(cmd, i) {
            return function(callback) {
                exec(cmd, cmdOptions, function(err, stdout, stderr) {

                    var timeB = +(new Date());
                    var memB = process.memoryUsage().heapUsed;
                    grunt.log.writeln("Time [" + i + "]: " + ((timeB - timeA) / (1000)).toFixed(2) + "s, Memory: " + ((memB - memA) / (1024 * 1024)).toFixed(2) + "Mb");

                    if (stdout && (grunt.option("verbose") || config.verbose)) {
                        grunt.log.write(stdout);
                    }

                    if (stderr && (!config.ignoreExitCode || (grunt.option("verbose") || config.verbose))) {
                        callback(stderr, null);
                        return;
                    }

                    if (err && config.dryRun) {
                        callback(err, null);
                        return;
                    }

                    callback(null, true);
                });
            };
        });

        async.parallel(runList, function(err, result) {

            if (err) {
                grunt.fatal(err);
                done();

                return;
            }

            var msg = config.dryRun ? "PHP files valid!" : "PHP files fixed!";
            grunt.log.ok(msg);
            done();

            return;

        });


    };

    return exports;
};
