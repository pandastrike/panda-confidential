"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _keyName = require("../../key-name");

var _keyName2 = _interopRequireDefault(_keyName);

var _kmsKey = require("./kms-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var symmetric;

symmetric = function ({ encrypt, decrypt }) {
  return _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder(),
        _rec4 = new _powerAssertRecorder();

    var cipher, keyID, message, output;
    // Create our custom key class to pass into Confidential.
    keyID = (0, _kmsKey.kmsKeyID)(_keyName2.default);
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(keyID, "arguments/0/left") && _rec._capt((0, _kmsKey.isKMSKeyID)(_rec._capt(keyID, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(keyID && isKMSKeyID(keyID), \"bad key\")",
      filepath: "tests/extended/symmetric-encryption-kms.coffee",
      line: 9,
      async: true
    }), "bad key");
    // Person A symmetrically encrypts their data.
    message = "Hello World!";
    cipher = yield encrypt(keyID, message);
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(cipher, "arguments/0/left") && _rec2._capt(_rec2._capt(message, "arguments/0/right/left") !== _rec2._capt(cipher, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(cipher && message !== cipher, \"must create a ciphertext\")",
      filepath: "tests/extended/symmetric-encryption-kms.coffee",
      line: 14,
      async: true
    }), "must create a ciphertext");
    // Person A later decrypts that ciphertext.
    output = yield decrypt(keyID, cipher);
    return _powerAssert2.default.equal(_rec3._expr(_rec3._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/extended/symmetric-encryption-kms.coffee",
      line: 18,
      async: true
    }), _rec4._expr(_rec4._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/extended/symmetric-encryption-kms.coffee",
      line: 18,
      async: true
    }), "failed to decrypt");
  });
};

exports.default = symmetric;