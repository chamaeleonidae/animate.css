var through = require('through2');

module.exports = function() {
  return through.obj(function(chunk, enc, cb) {
    var file = chunk.clone();

    var string = file.contents.toString();
    string = string.replace(/keyframes\s(\w+)/g, replacer('keyframes ')); // Prefix the 'definition' of the keyframe
    string = string.replace(/\.([a-zA-Z-]+)/g, replacer('.')); // Prefix the classes
    string = string.replace(/-name: (\w+)/g, replacer('-name: ')); // Prefix the 'use' of the keyframe

    file.contents = new Buffer(string);
    cb(null, file);
  });
};

function replacer(prefix) {
  return function(m1, p1) {
    return (
      prefix +
      'chmln-' +
      p1.replace(/([A-Z])/g, function(mm1, pp1) {
        return '_' + pp1.toLowerCase();
      })
    );
  };
}
