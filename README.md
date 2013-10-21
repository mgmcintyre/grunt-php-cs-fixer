# grunt-php-cs-fixer

> Grunt plugin for running [PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer).

## Installation

1. Install grunt-php-cs-fixer
```
npm install grunt-php-cs-fixer --save-dev
```

2. [Install PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer)

3. Include the task in your Gruntfile with a line like this
```
grunt.loadNpmTasks('grunt-php-cs-fixer');
```

## Usage Example

_To be included in your Grunt `initConfig`._

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

__This task is a [multi task][] so any targets, files and options should be specified accordingly.__

[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks

## Target Properties

#### dir
Type: `String`

_The file or directory to fix._

###Options

#### bin
Type: `String`  Default: `'php-cs-fixer'`

_The path to `php-cs-fixer`._
_Note is installed using composer, this will need to be `vendor/bin/php-cs-fixer`._

#### ignoreExitCode
Type: `Boolean` Default: `false`

_Don't fail even if we get a non-zero return._

#### verbose
Type: `Boolean` Default: `false`

_Output full info including warnings and a list of changes._

#### diff
Type: `Boolean` Default: `false`

_Show a diff for the proposed changes._

#### dryRun
Type: `Boolean` Default: `false`

_Don't affect the proposed changes (useful when combined with `--verbose` and `--diff`)._

#### level
Type: `String` Default: `all`

_Chooses preset list of fixers, options are `psr0`, `psr1`, `psr2`, `all`._

#### fixers
Type: `String` Default: `null`

_Limit the fixers used._
_@see [https://github.com/fabpot/PHP-CS-Fixer](https://github.com/fabpot/PHP-CS-Fixer)._
