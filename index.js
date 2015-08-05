var debug = require('debug')('metalsmith-relativity');
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
 *   @property {Number} depth starting depth of prefix
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
 * parse filepath for dir, ext, and name of file.
 *
 * @param {String} filename
 * @return {Object}
 */

function parsePath(filename) {
  var parts = {};
  parts.dir = path.dirname(filename);
  parts.ext = path.extname(filename);
  parts.name = path.basename(filename, parts.ext);
  parts.base = parts.name + parts.ext;
  return parts;
}
