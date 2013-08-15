describe("mochaRunner", function() {
  var http = require('http'),
      assert = require('assert'),
      path = require('path'),
      fs = require('fs');

  function get(url, done) {
    http.get(url, function(res) {
      var data = '';

      res
        .on('data', function(d) { data += d; })
        .on('end', function() { done(data); });
    });
  }

  function read() {
    return fs.readFileSync(path.resolve.apply(null, arguments));
  }

  it("should serve a runner page", function(done) {
    get("http://localhost:8000", function(res) {
      assert(res.match('<link rel="stylesheet" href="/styles/a.css">'));
      assert(res.match('<link rel="stylesheet" href="/styles/a.css">'));

      assert(res.match('<script src="/src/a.js"></script>'));
      assert(res.match('<script src="/src/b.js"></script>'));

      assert(res.match('<script src="/spec/a.test.js"></script>'));
      assert(res.match('<script src="/spec/b.test.js"></script>'));
        
      done();
    });
  });

  it("should serve the configured stylesheets", function(done) {
    var i = 2;

    get("http://localhost:8000/styles/a.css", function(res) {
      assert.equal(res, '/* a.css */\n');
      --i || done();
    });

    get("http://localhost:8000/styles/b.css", function(res) {
      assert.equal(res, '/* b.css */\n');
      --i || done();
    });
  });

  it("should serve the configured source scripts", function(done) {
    var i = 2;

    get("http://localhost:8000/src/a.js", function(res) {
      assert.equal(res, '// a.js\n');
      --i || done();
    });

    get("http://localhost:8000/src/b.js", function(res) {
      assert.equal(res, '// b.js\n');
      --i || done();
    });
  });

  it("should serve the configured spec scripts", function(done) {
    var i = 2;

    get("http://localhost:8000/spec/a.test.js", function(res) {
      assert.equal(res, '// a.test.js\n');
      --i || done();
    });

    get("http://localhost:8000/spec/b.test.js", function(res) {
      assert.equal(res, '// b.test.js\n');
      --i || done();
    });
  });

  it("should serve the test vendor scripts", function(done) {
    var bowerDir = path.resolve(__dirname, '..', '..', 'bower_components'),
        i = 3;

    get("http://localhost:8000/mocha.js", function(res) {
      assert.equal(res, read(bowerDir, 'mocha', 'mocha.js'));
      --i || done();
    });

    get("http://localhost:8000/mocha.css", function(res) {
      assert.equal(res, read(bowerDir, 'mocha', 'mocha.css'));
      --i || done();
    });

    get("http://localhost:8000/chai.js", function(res) {
      assert.equal(res, read(bowerDir, 'chai', 'chai.js'));
      --i || done();
    });
  });

  it("should allow the runner page title to be configurable", function(done) {
    get("http://localhost:8001", function(res) {
      assert(res.match('<title>Foo Bar</title>'));
      done();
    });
  });

  it("should allow the mocha ui to be configurable", function(done) {
    get("http://localhost:8001", function(res) {
      assert(res.match('mocha.setup\\("tdd"\\);'));
      done();
    });
  });
});
