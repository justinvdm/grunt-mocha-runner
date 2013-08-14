module.exports = function(grunt) {
  var path = require('path'),
      connect = require('connect'),
      tmp = require('tmp'),
      fs = require('fs');

  var linkInDir = function(srcpath, dirpath) {
    var destpath = path.join(dirpath, path.basename(srcpath));
    fs.symlinkSync(srcpath, destpath);
    return destpath;
  };

  var buildDir = function(dirname, rootpath, filepaths) {
    var dirpath = path.join(rootpath, dirname);
    fs.mkdirSync(dirpath);

    return grunt.file
      .expand(filepaths || [])
      .map(function(srcpath) { return linkInDir(srcpath, dirpath); });
  };

  var buildRunner = function(dirpath, data) {
    var jst = fs.readFileSync(
      path.join(__dirname, '..', 'runner.jst'),
      {encoding: 'utf8'});

    fs.writeFileSync(
      path.join(dirpath, 'index.html'),
      grunt.template.process(jst, {data: data}));
  };

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

    var data = this.data;
    var done = this.async();

    tmp.dir(function(err, dirpath) { 
      var bowerDir = path.resolve(__dirname, '..', 'bower_components');

      linkInDir(path.join(bowerDir, 'chai', 'chai.js'), dirpath);
      linkInDir(path.join(bowerDir, 'mocha', 'mocha.js'), dirpath);
      linkInDir(path.join(bowerDir, 'mocha', 'mocha.css'), dirpath);

      buildRunner(dirpath, {
       options: options,
       paths: {
         styles: buildDir('styles', dirpath, data.styles),
         src: buildDir('src', dirpath, data.src),
         spec: buildDir('spec', dirpath, data.spec)
       }
      });

      connect()
        .use(connect.static(dirpath))
        .listen(options.port, options.hostname)
        .on('listening', function() { done(); });
    });
  });
};
