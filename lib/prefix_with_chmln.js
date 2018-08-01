var through = require('through2');

module.exports = function() {
  return through.obj(function(chunk, enc, cb) {
    var file = chunk.clone();

    var string = file.contents.toString();
    string = string.replace(/keyframes\s(\w+)/g, 'keyframes chmln-$1'); // Prefix the 'definition' of the keyframe
    string = string.replace(/\.([a-zA-Z-]+)/g, '.chmln-$1'); // Prefix the classes
    string = string.replace(/-name: (\w+)/g, '-name: chmln-$1'); // Prefix the 'use' of the keyframe

    file.contents = new Buffer(string);
    cb(null, file);
  });
};
