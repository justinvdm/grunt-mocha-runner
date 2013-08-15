# grunt-mocha-runner

Serve a mocha runner page with the source and spec script paths configured in your Gruntfile.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mocha-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mocha-runner');
```

## The "mochaRunner" task

### Overview
In your project's Gruntfile, add a section named `mochaRunner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mochaRunner: {
    all: {
      src: ['src/*.js'],
      spec: ['test/spec/*.js'],
      styles: ['styles/*.css']
    },
  },
})
```

### Options

#### port
Type: `Integer`
Default value: `8000`

The port on which to serve the test runner. 

#### hostname
Type: `String`
Default: `'localhost'`

The hostname on which to serve the test runner. 

Setting it to `'*'` will make the it accessible from anywhere.

#### title
Type: `String`
Default: `'Mocha Spec Runner'`

The title of the test runner page.

#### ui
Type: `String`
Default: `'bdd'`

The mocha ui type to use with `mocha.setup()`.
