var through = require('through2');

module.exports = function() {
  return through.obj(function(chunk, enc, cb) {
    var file = chunk.clone();

    var string = file.contents.toString();
    string = string.replace(/100%/g, '33%'); // Only move by 1/3 of the width or height

    file.contents = new Buffer(string);
    cb(null, file);
  });
};
