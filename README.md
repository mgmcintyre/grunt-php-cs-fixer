# Grunt plugin for PHP Coding Standards Fixer `grunt-php-cs-fixer`

> Grunt plugin for running [PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer).

## Installation

1. Install grunt-php-cs-fixer
```shell
npm install grunt-php-cs-fixer --save-dev
```

2. [Install PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer)

3. Include the task in your Gruntfile with a line like this:
```js
grunt.loadNpmTasks('grunt-php-cs-fixer');
```

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._

[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


## Usage Example

```js
phpcsfixer: {
	app: {
		dir: 'app'
	},
	options: {
		bin: 'vendor/bin/php-cs-fixer',
		ignoreExitCode: true,
		level: 'all',
		quiet: true
	}
},
```

## Target Properties

#### dir
Type: `String`

The file or directory to fix

###Options

#### bin
Type: `String`  Default: `'php-cs-fixer'`

The path to `php-cs-fixer`.
Note is installed using composer, this will need to be `vendor/bin/php-cs-fixer`.

#### ignoreExitCode
Type: `Boolean` Default: `false`

Don't fail even if we get a non-zero return.

#### verbose
Type: `Boolean` Default: `false`

Output full info including warnings and a list of changes.

#### diff
Type: `Boolean` Default: `false`

Show a diff for the proposed changes.

#### dryRun
Type: `Boolean` Default: `false`

Don't affect the proposed changes (useful when combined with `--verbose` and `--diff`).

#### level
Type: `String` Default: `all`

Chooses preset list of fixers, options are `psr0`, `psr1`, `psr2`, `all`.

#### fixers
Type: `String` Default: `null`

Limit the fixers used.
@see [https://github.com/fabpot/PHP-CS-Fixer](https://github.com/fabpot/PHP-CS-Fixer).
