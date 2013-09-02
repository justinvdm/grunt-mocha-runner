describe("mochaRunner", function() {
  var http = require('http'),
      path = require('path'),
      fs = require('fs'),
      expect = require('chai').expect;

  function get(url, done) {
    http.get(url, function(res) {
      var data = '';

      res
        .on('data', function(d) { data += d; })
        .on('end', function() { done(data); });
    });
  }

  function read() {
    return fs.readFileSync(
      path.resolve.apply(null, arguments),
      {encoding: 'utf8'});
  }

  it("should serve a runner page", function(done) {
    get("http://localhost:8000", function(res) {
      expect(res).to.include('<script src="/chai.js"></script>');
      expect(res).to.include('<script src="/mocha.js"></script>');
      expect(res).to.include('<link rel="stylesheet" href="/mocha.css">');

      //console.log(res);

      expect(res).to.include(
        '<link rel="stylesheet" href="/grunt-mocha-runner/test/fixtures/styles/a.css">');
      expect(res).to.include(
        '<link rel="stylesheet" href="/grunt-mocha-runner/test/fixtures/styles/b.css">');

      expect(res).to.include(
        '<script src="/grunt-mocha-runner/test/fixtures/src/a.js"></script>');
      expect(res).to.include(
        '<script src="/grunt-mocha-runner/test/fixtures/src/b.js"></script>');

      expect(res).to.include(
        '<script src="/grunt-mocha-runner/test/fixtures/spec/a.test.js"></script>');
      expect(res).to.include(
        '<script src="/grunt-mocha-runner/test/fixtures/spec/b.test.js"></script>');

      done();
    });
  });

  it("should serve the configured stylesheets", function(done) {
    var i = 2;

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/styles/a.css",
    function(res) {
      expect(res).to.equal('/* a.css */\n');
      --i || done();
    });

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/styles/b.css",
    function(res) {
      expect(res).to.equal('/* b.css */\n');
      --i || done();
    });
  });

  it("should serve the configured source scripts", function(done) {
    var i = 4;

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/src/a.js",
    function(res) {
      expect(res).to.equal('// a.js\n');
      --i || done();
    });

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/src/b.js",
    function(res) {
      expect(res).to.equal('// b.js\n');
      --i || done();
    });

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/spec/a.test.js",
    function(res) {
      expect(res).to.equal('// a.test.js\n');
      --i || done();
    });

    get("http://localhost:8000/grunt-mocha-runner/test/fixtures/spec/b.test.js",
    function(res) {
      expect(res).to.equal('// b.test.js\n');
      --i || done();
    });
  });

  it("should serve the test vendor scripts", function(done) {
    var modulesDir = path.resolve(__dirname, '..', '..', 'node_modules'),
        i = 3;

    get("http://localhost:8000/mocha.js", function(res) {
      expect(res).to.equal(read(modulesDir, 'mocha', 'mocha.js'));
      --i || done();
    });

    get("http://localhost:8000/mocha.css", function(res) {
      expect(res).to.equal(read(modulesDir, 'mocha', 'mocha.css'));
      --i || done();
    });

    get("http://localhost:8000/chai.js", function(res) {
      expect(res).to.equal(read(modulesDir, 'chai', 'chai.js'));
      --i || done();
    });
  });

  it("should allow the runner page title to be configurable", function(done) {
    get("http://localhost:8001", function(res) {
      expect(res).to.include('<title>Foo Bar</title>');
      done();
    });
  });

  it("should allow the mocha ui to be configurable", function(done) {
    get("http://localhost:8001", function(res) {
      expect(res).to.include('mocha.setup("tdd");');
      done();
    });
  });
});
