"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _amen = require("amen");

var _index = require("../../src/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var asymmetric;

asymmetric = function (SDK) {
  return _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder(),
        _rec4 = new _powerAssertRecorder(),
        _rec5 = new _powerAssertRecorder(),
        _rec6 = new _powerAssertRecorder(),
        _rec7 = new _powerAssertRecorder();

    var A, B, KeyPair, cipher, decrypt, encrypt, message, output, privateKey, publicKey;
    ({ KeyPair, encrypt, decrypt } = (0, _index2.default)(SDK));
    // Test Key Pair Generation
    ({ privateKey, publicKey } = yield KeyPair.generate("encrypt"));
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(privateKey, "arguments/0"), {
      content: "assert(privateKey, \"failed to generate private key\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 10,
      async: true
    }), "failed to generate private key");
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(publicKey, "arguments/0"), {
      content: "assert(publicKey, \"failed to generate public key\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 11,
      async: true
    }), "failed to generate public key");
    (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec3._capt(_rec3._capt(privateKey, "arguments/0/left/object/arguments/0/object").key, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(privateKey.key, \"base64\").length === 32, \"private key is improper length\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 12,
      async: true
    }), "private key is improper length");
    (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec4._capt(_rec4._capt(publicKey, "arguments/0/left/object/arguments/0/object").key, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(publicKey.key, \"base64\").length === 32, \"public key is improper length\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 14,
      async: true
    }), "public key is improper length");
    // Test Encrypt - Decrypt Cycle
    A = { privateKey, publicKey };
    B = yield KeyPair.generate("encrypt");
    message = "Hello World!";
    // Person A encrypts the message for person B.
    cipher = yield encrypt(A.privateKey, B.publicKey, message);
    (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt(cipher, "arguments/0/left") && _rec5._capt(_rec5._capt(message, "arguments/0/right/left") !== _rec5._capt(cipher, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(cipher && message !== cipher, \"failed to create a ciphertext\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 25,
      async: true
    }), "failed to create a ciphertext");
    // Person B gets the cipher and decrypts the message.
    output = yield decrypt(B.privateKey, A.publicKey, cipher);
    return _powerAssert2.default.equal(_rec6._expr(_rec6._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 29,
      async: true
    }), _rec7._expr(_rec7._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/asymmetric-encryption.coffee",
      line: 29,
      async: true
    }), "failed to decrypt");
  });
};

exports.default = asymmetric;