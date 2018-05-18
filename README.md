# grunt-php-cs-fixer

> Grunt plugin for running [PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer).

## Installation

1. Install grunt-php-cs-fixer
```
npm install grunt-php-cs-fixer --save-dev
```

2. [Install PHP Coding Standards Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

3. Include the task in your Gruntfile with a line like this
```
grunt.loadNpmTasks('grunt-php-cs-fixer');
```

## Usage Example

_To be included in your Grunt `initConfig`._

```js
phpcsfixer: {
	app: {
		dir: 'app' // or ['src/models', 'src/lib']
	},
	options: {
		bin: 'vendor/bin/php-cs-fixer',
		usingCache: "no",
		quiet: true
	}
}
```

__This task is a [multi task][] so any targets, files and options should be specified accordingly.__

[multi task]: http://gruntjs.com/creating-tasks#multi-tasks

## Target Properties

#### dir
Type: `String` || `Array`

_The file(s) or directory(s) to fix._

### Options

#### bin
Type: `String`  Default: `'php-cs-fixer'`

_The path to `php-cs-fixer`._  
_(For composer, use `vendor/bin/php-cs-fixer`)._

#### configfile
Type: `String` Default: `null`

_Path to php-cs-fixer config file._  

#### verbose
Type: `Boolean` Default: `false`

_Output full info including warnings and a list of changes._

#### quiet
Type: `Boolean` Default: `false`

_Output minimal info._

#### diff
Type: `Boolean` Default: `false`

_Show a diff for the proposed changes._

#### dryRun
Type: `Boolean` Default: `false`

_Don't effect the proposed changes (useful when combined with `--diff`)._

#### allowRisky
Type: `Boolean` Default: `false`

_Allows you to set whether risky rules may run._

#### usingCache
Type: `Boolean` Default: `no`

_Controls whether a local cache is used, accepted values are "yes" or "no"._

#### cacheFile
Type: `String` Default: `null`

_Specifies the cache file name and location._

#### rules
Type: `String` Default: `(all PSR rules)`

_Comma-separated string, or array of rules to use._  
_@see [https://github.com/FriendsOfPHP/PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)._
