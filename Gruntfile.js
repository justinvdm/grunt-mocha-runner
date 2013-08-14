module.exports = function(grunt) {
  grunt.initConfig({
    mochaRunner: {
      defaults: {
        src: ['test/fixtures/defaults/src/*.js'],
        spec: ['test/fixtures/defaults/spec/*.js'],
        styles: ['test/fixtures/defaults/styles/*.css']
      }
    }
  });

  // Load the plugin's tasks
  grunt.loadTasks('tasks');

  // Run the plugin's tasks, then test the result
  grunt.registerTask('test', ['mochaRunner']);

  grunt.registerTask('default', ['test']);
};
