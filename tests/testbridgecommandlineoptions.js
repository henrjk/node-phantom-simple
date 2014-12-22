var phantom = require('../node-phantom-simple');
var watch_stderr = require('./libs/watch-stderr');

module.exports = {

  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    watch_stderr.unwatch();
    callback();
  },
  testBridgeCommandLineOptionsBad: function (test) {
    phantom.create(function (err, ph) {
      test.strictEqual(ph, undefined, "no phantom returned");
      test.strictEqual(err, "Phantom exited with code: 7", "exit code 7");
      var data = watch_stderr.getData();
      test.strictEqual(data.length, 1 , "1 line stderr");
      test.strictEqual(
        data[0].replace(/\n|\r/g, ""),  
        "phantom stderr: phantomjs <full-path>/bridge.js ['help' | 'port' <number>]",
        "usage information given when invoked with bad arguments"
      );
      test.done();
    }, {
      bridgeParameters: {
        one: 'nonsense',
        two: 'nonsense2',
        three: 'nonsense3'}
    });
  },
  testBridgeCommandLineOptionsPort: function (test) {
    phantom.create(function (err, ph) {
      test.strictEqual(err, null, "no error (null)");
      test.ok(ph, "phantom returned");
      var data = watch_stderr.getData();
      test.strictEqual(data.length, 0, "no lines on stderr");
      ph.exit();
      test.done();
    }, {
      bridgeParameters: {
        port: '8765',
      }
    });
  }
};

