module.exports = function(grunt) {
  grunt.registerMultiTask(
  'mochaRunner',
  'Serve a mocha browser test runner with the configured source and spec scripts.',
  function() {
    var options = this.options({
      title: 'Mocha Spec Runner',
      ui: 'bdd',
      port: 8000,
      hostname: 'localhost'
    });

    if (options.hostname === '*') { options.hostname = null; }
  });
};
