var debug = require('debug')('metalsmith-rewrite');
var extend = require('extend');
var path = require('path');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Metalsmith plugin that adds relativity path metadata to files
 *
 * @param {Object|Array} options
 *   @property {String} 
 * @return {Function}
 */

function plugin(options) {
  options = extend({
    depth: 0
  }, options)

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var dir = path.dirname(file);

      debug('Adding relativity to metadata: ' + file)

      if (dir === '.') {
        data.relativity = depth(options.depth);
      } else {
        var parts = dir.split('/');
        data.relativity = depth(parts.length + options.depth);
      }
    });

    done();
  };

  function depth(d) {
    if (d === 0) {
      return './';
    } else {
      var s = '';
      for (var i = 0; i < d; i++) s += '../';
      return s;
    }

  }
}


/**
 * Verify that expected keys are found in data 
 *
 * @param {String} string
 * @param {Object} data
 * @return {Boolean}
 */

function parsePath(filename) {
  var parts = {};
  parts.dir = path.dirname(filename);
  parts.ext = path.extname(filename);
  parts.name = path.basename(filename, parts.ext);
  parts.base = parts.name + parts.ext;
  return parts;
}
