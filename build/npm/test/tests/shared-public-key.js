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

var sharedKeyTest;

sharedKeyTest = function (SDK) {
  return _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder(),
        _rec4 = new _powerAssertRecorder(),
        _rec5 = new _powerAssertRecorder(),
        _rec6 = new _powerAssertRecorder(),
        _rec7 = new _powerAssertRecorder(),
        _rec8 = new _powerAssertRecorder(),
        _rec9 = new _powerAssertRecorder(),
        _rec10 = new _powerAssertRecorder(),
        _rec11 = new _powerAssertRecorder();

    var A, B, SharedPublicKey, cipher, message, output, privateKey, publicKey;
    ({ SharedPublicKey } = (0, _index2.default)(SDK));
    // Test key pair generation on Shared API
    ({ privateKey, publicKey } = yield SharedPublicKey.generateKeyPair());
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(privateKey, "arguments/0"), {
      content: "assert(privateKey, \"failed to generate private key\")",
      filepath: "tests/shared-public-key.coffee",
      line: 10,
      async: true
    }), "failed to generate private key");
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(publicKey, "arguments/0"), {
      content: "assert(publicKey, \"failed to generate public key\")",
      filepath: "tests/shared-public-key.coffee",
      line: 11,
      async: true
    }), "failed to generate public key");
    (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec3._capt(privateKey, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(privateKey, \"base64\").length === 32, \"private key is improper length\")",
      filepath: "tests/shared-public-key.coffee",
      line: 12,
      async: true
    }), "private key is improper length");
    (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec4._capt(publicKey, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(publicKey, \"base64\").length === 32, \"public key is improper length\")",
      filepath: "tests/shared-public-key.coffee",
      line: 14,
      async: true
    }), "public key is improper length");
    // Test shared key generation
    A = { privateKey, publicKey };
    B = yield SharedPublicKey.generateKeyPair();
    A.sharedKey = SharedPublicKey.generateKey(B.publicKey, A.privateKey);
    (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt(A, "arguments/0/object").sharedKey, "arguments/0"), {
      content: "assert(A.sharedKey, \"failed to generate shared key\")",
      filepath: "tests/shared-public-key.coffee",
      line: 22,
      async: true
    }), "failed to generate shared key");
    (0, _powerAssert2.default)(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(_rec6._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec6._capt(_rec6._capt(A, "arguments/0/left/object/arguments/0/object").sharedKey, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(A.sharedKey, \"base64\").length === 32, \"shared key is improper length\")",
      filepath: "tests/shared-public-key.coffee",
      line: 23,
      async: true
    }), "shared key is improper length");
    B.sharedKey = SharedPublicKey.generateKey(A.publicKey, B.privateKey);
    _powerAssert2.default.equal(_rec7._expr(_rec7._capt(_rec7._capt(A, "arguments/0/object").sharedKey, "arguments/0"), {
      content: "assert.equal(A.sharedKey, B.sharedKey, \"shared keys are not identical\")",
      filepath: "tests/shared-public-key.coffee",
      line: 27,
      async: true
    }), _rec8._expr(_rec8._capt(_rec8._capt(B, "arguments/1/object").sharedKey, "arguments/1"), {
      content: "assert.equal(A.sharedKey, B.sharedKey, \"shared keys are not identical\")",
      filepath: "tests/shared-public-key.coffee",
      line: 27,
      async: true
    }), "shared keys are not identical");
    // Test Encrypt - Decrypt Cycle
    message = "Hello World!";
    // Person A encrypts the message for person B.
    cipher = yield SharedPublicKey.encrypt(A.sharedKey, message);
    (0, _powerAssert2.default)(_rec9._expr(_rec9._capt(_rec9._capt(cipher, "arguments/0/left") && _rec9._capt(_rec9._capt(message, "arguments/0/right/left") !== _rec9._capt(cipher, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(cipher && message !== cipher, \"failed to create a ciphertext\")",
      filepath: "tests/shared-public-key.coffee",
      line: 35,
      async: true
    }), "failed to create a ciphertext");
    // Person B gets the cipher and decrypts the message.
    output = SharedPublicKey.decrypt(B.sharedKey, cipher);
    return _powerAssert2.default.equal(_rec10._expr(_rec10._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/shared-public-key.coffee",
      line: 39,
      async: true
    }), _rec11._expr(_rec11._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/shared-public-key.coffee",
      line: 39,
      async: true
    }), "failed to decrypt");
  });
};

exports.default = sharedKeyTest;