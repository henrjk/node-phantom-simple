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
  testBridgeCommandLineOptions: function (test) {
    debugger;
    phantom.create(function (err, ph) {
      test.strictEqual(ph, undefined, "no phantom returned");
      test.strictEqual(err, "Phantom exited with code: 7", "exit code 7");
      var data = watch_stderr.getData();
      test.strictEqual(data.length, 1 , "1 line stderr");
      test.strictEqual(
        data[0].replace(/\n|\r/g, ""),  
        "phantom stderr: phantomjs <full-path>/bridge.js ['help' | 'port' <number>]",
        "usage information given with wrong arguments"
      );

      test.done();

    }, {
      /*
      parameters: {
        "remote-debugger-port": 9000
      },*/
      bridgeParameters: {
        one: 'nonsense',
        two: 'nonsense2',
        three: 'nonsense3'}});

    }
};

