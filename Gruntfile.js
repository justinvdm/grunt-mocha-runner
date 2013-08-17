module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin's tasks
  grunt.loadTasks('tasks');

  grunt.initConfig({
    jshint: {
        options: {jshintrc: '.jshintrc'},
        all: ['Gruntfile.js', 'tasks/*.js', 'test/tasks/*.test.js']
    },
    // the plugin's task to be run, then tested
    mochaRunner: {
      defaults: {
        src: ['test/fixtures/src/*.js'],
        spec: ['test/fixtures/spec/*.js'],
        styles: ['test/fixtures/styles/*.css']
      },
      custom: {
        options: {
          port: 8001,
          title: "Foo Bar",
          ui: "tdd"
        },
        src: ['<%= mochaRunner.defaults.src =>'],
        spec: ['<%= mochaRunner.defaults.spec =>'],
        styles: ['<%= mochaRunner.defaults.styles =>'],
      }
    },
    // an external plugin we use to run our tests
    mochaTest: {
      test: {src: ['test/tasks/mochaRunner.test.js']}
    }
  });

  // Run the plugin's tasks, then test the result
  grunt.registerTask('test', [
    'mochaRunner',
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);
};
