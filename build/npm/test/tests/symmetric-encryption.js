"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _index = require("../../src/index");

var _index2 = _interopRequireDefault(_index);

var _keyName = require("../key-name");

var _keyName2 = _interopRequireDefault(_keyName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var symmetric;

symmetric = function (SDK) {
  return _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder();

    var KMSKey, cipher, decrypt, encrypt, key, message, output;
    // Setup for encryption
    ({ encrypt, decrypt, KMSKey } = (0, _index2.default)(SDK));
    key = new KMSKey(_keyName2.default);
    message = "Hello World!";
    // Person A symmetrically encrypts their data.
    cipher = yield encrypt(key, message);
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(cipher, "arguments/0/left") && _rec._capt(_rec._capt(message, "arguments/0/right/left") !== _rec._capt(cipher, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(cipher && message !== cipher, \"must create a ciphertext\")",
      filepath: "tests/symmetric-encryption.coffee",
      line: 13,
      async: true
    }), "must create a ciphertext");
    output = yield decrypt(key, cipher);
    return _powerAssert2.default.equal(_rec2._expr(_rec2._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/symmetric-encryption.coffee",
      line: 15,
      async: true
    }), _rec3._expr(_rec3._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/symmetric-encryption.coffee",
      line: 15,
      async: true
    }), "failed to decrypt");
  });
};

exports.default = symmetric;