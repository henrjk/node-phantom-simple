module.exports = function() {
  var stderrData = [];

  var prevWrite = process.stderr.write;

  process.stderr.write = (function(write) {
    return function(string, encoding, fd) {
      write.apply(process.stderr, arguments);
      stderrData.push(string);
    };
  })(process.stderr.write);

  return {
    getData: function() {
      return stderrData;
    },
    unwatch: function() {
      process.stderr.write = prevWrite;
      stderrData = [];
    }
  };
}();


