"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regular = require("./regular");

var _regular2 = _interopRequireDefault(_regular);

var _extended = require("./extended");

var _extended2 = _interopRequireDefault(_extended);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Tests;

Tests = (() => {
  var _ref = _asyncToGenerator(function* (SDK) {
    yield (0, _regular2.default)();
    if (SDK) {
      return yield (0, _extended2.default)(SDK);
    }
  });

  return function Tests(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = Tests;