var rewrite = require('../index.js');
var test = require('tape');

var Metalsmith = require('metalsmith');

function plugtest(options, fn) {
  Metalsmith('test/fixtures')
    .source('.')
    .destination('tmp')
    .use(rewrite(options)).build(function(err, files) {
      if(err) return console.log('err: ', err);
      fn(err, files);
    });
}

test('should add relativity key relative to source directory', function(t) {
  t.plan(2);
  plugtest({ }, function(err, files) {
    t.equal(files['d.html'].relativity, './');
    t.equal(files['p/b.js'].relativity, '../');
  });
})

test('should add relativity key modified by depth options', function(t) {
  t.plan(2);
  plugtest({ 
    depth: 1
  }, function(err, files) {
    t.equal(files['d.html'].relativity, '../');
    t.equal(files['p/b.js'].relativity, '../../');
  });
})