"use strict";

require("source-map-support/register");

var _commandLineArgs = require("command-line-args");

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _context = require("./context");

var _context2 = _interopRequireDefault(_context);

var _key = require("./key");

var _key2 = _interopRequireDefault(_key);

var _tests = require("./tests");

var _tests2 = _interopRequireDefault(_tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var options;

// This grabs CLI arugments to allow the developer to configure the AWS context.
options = (0, _commandLineArgs2.default)([{
  name: "profile",
  alias: "p",
  type: String
}, {
  name: "region",
  alias: "r",
  type: String
}]);

_asyncToGenerator(function* () {
  var SDK, Sundog, e;
  try {
    console.error("Establishing AWS context...");
    ({ Sundog, SDK } = (0, _context2.default)(options));
    yield (0, _key2.default)(Sundog);
  } catch (error) {
    e = error;
    console.error("Failed to establish AWS SDK context.", e);
    process.exit();
  }
  return yield (0, _tests2.default)(SDK);
})();