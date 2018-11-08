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
            usingCache: false,
            rules: null,
            dryRun: false,
            diff: false,
            diffFormat: null,
            allowRisky: false,
            verbose: false,
            quiet: false,
            configfile: null,
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

        if (grunt.option("quiet") || config.quiet) {
            appends.push("--quiet");
        }

        if (grunt.option("verbose") || config.verbose) {
            appends.push("--verbose");
        }

        if (grunt.option("rules") || config.rules) {
            var rules = _.isString(config.rules) ? config.rules.split(",") : config.rules;
            appends.push("--rules=" + rules.join(","));
        }

        if (grunt.option("dryRun") || config.dryRun) {
            appends.push("--dry-run");
        }

        if (grunt.option("diff") || config.diff) {
            appends.push("--diff");
        }
        
        if (grunt.option('diffFormat') || config.diffFormat) {
            appends.push("--diff-format=" + config.diffFormat);
        }

        if (grunt.option("allowRisky") || config.allowRisky) {
            appends.push("--allow-risky yes");
        }

        if (grunt.option("usingCache") || config.usingCache) {
            appends.push("--using-cache " + config.usingCache);
        }

        if (grunt.option("configfile") || config.configfile) {
            appends.push("--config=" + config.configfile);
        }

        var bin = path.normalize(config.bin),
            append = appends.join(" "),
            cmds = [];

        if (paths.length) {
            cmds = _.map(paths, function(thePath) {
                return bin + " fix " + thePath + " " + append;
            });
        }

        if (grunt.option("configfile") || config.configfile) {
            cmds.push(bin + " fix " + append);
        }

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
     * Runs php-cs-fixer command with options
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
                    if (grunt.option("verbose") || config.verbose) {
                        var timeB = +(new Date());
                        var memB = process.memoryUsage().heapUsed;
                        grunt.log.writeln("Time [" + i + "]: " + ((timeB - timeA) / (1000)).toFixed(2) + "s, Memory: " + ((memB - memA) / (1024 * 1024)).toFixed(2) + "Mb");
                    }

                    if (stderr) {
                        grunt.log.write(stderr);
                    }

                    if (stdout) {
                        grunt.log.write(stdout);
                    }

                    // Error codes 16 and up represent issues with php-cs-fixer
                    if (err && err.code >= 16) {
                      callback(err)
                      return;
                    }

                    // Dry run should fail for all error codes
                    if (config.dryRun && err && err.code != 0) {
                        callback(err);
                        return;
                    }

                    callback();
                });
            };
        });

        async.parallel(runList, function(err) {

            if (err) {
                grunt.fatal(err);
                done();

                return;
            }

            var msg = config.dryRun ? "PHP files valid!" : "PHP files fixed!";

            grunt.log.ok(msg);
            done();

        });


    };

    return exports;
};
