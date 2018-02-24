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

var publicKeyTest;

publicKeyTest = function (SDK) {
  return _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder(),
        _rec4 = new _powerAssertRecorder(),
        _rec5 = new _powerAssertRecorder(),
        _rec6 = new _powerAssertRecorder(),
        _rec7 = new _powerAssertRecorder(),
        _rec8 = new _powerAssertRecorder(),
        _rec9 = new _powerAssertRecorder();

    var A, Signature, message, output, privateKey, publicKey, signature, signedMessage;
    ({ Signature } = (0, _index2.default)(SDK));
    // Test Key Pair Generation
    ({ privateKey, publicKey } = yield Signature.generateKeyPair());
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(privateKey, "arguments/0"), {
      content: "assert(privateKey, \"failed to generate private key\")",
      filepath: "tests/signature.coffee",
      line: 10,
      async: true
    }), "failed to generate private key");
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(publicKey, "arguments/0"), {
      content: "assert(publicKey, \"failed to generate public key\")",
      filepath: "tests/signature.coffee",
      line: 11,
      async: true
    }), "failed to generate public key");
    (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec3._capt(privateKey, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 64, "arguments/0"), {
      content: "assert(Buffer.from(privateKey, \"base64\").length === 64, \"private key is improper length\")",
      filepath: "tests/signature.coffee",
      line: 12,
      async: true
    }), "private key is improper length");
    (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(Buffer, "arguments/0/left/object/callee/object").from(_rec4._capt(publicKey, "arguments/0/left/object/arguments/0"), "base64"), "arguments/0/left/object").length, "arguments/0/left") === 32, "arguments/0"), {
      content: "assert(Buffer.from(publicKey, \"base64\").length === 32, \"public key is improper length\")",
      filepath: "tests/signature.coffee",
      line: 14,
      async: true
    }), "public key is improper length");
    // Test Encrypt - Decrypt Cycle
    A = { privateKey, publicKey };
    message = "Hello World!";
    // Person A signs the message.
    signedMessage = Signature.sign(A.privateKey, message);
    (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt(signedMessage, "arguments/0/left") && _rec5._capt(_rec5._capt(signedMessage, "arguments/0/right/left") !== _rec5._capt(message, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(signedMessage && signedMessage !== message, \"failed to create a signed message\")",
      filepath: "tests/signature.coffee",
      line: 24,
      async: true
    }), "failed to create a signed message");
    // Person B uses A's public key to verify and open the message.
    output = Signature.open(A.publicKey, signedMessage);
    _powerAssert2.default.equal(_rec6._expr(_rec6._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to verify\")",
      filepath: "tests/signature.coffee",
      line: 29,
      async: true
    }), _rec7._expr(_rec7._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to verify\")",
      filepath: "tests/signature.coffee",
      line: 29,
      async: true
    }), "failed to verify");
    // Person A generates a detatched signature.
    signature = Signature.generate(A.privateKey, message);
    (0, _powerAssert2.default)(_rec8._expr(_rec8._capt(_rec8._capt(signature, "arguments/0/left") && _rec8._capt(_rec8._capt(signature, "arguments/0/right/left") !== _rec8._capt(message, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(signature && signature !== message, \"failed to create a signature message\")",
      filepath: "tests/signature.coffee",
      line: 33,
      async: true
    }), "failed to create a signature message");
    // Person B verifies the message.
    output = Signature.verify(A.publicKey, signature, message);
    return (0, _powerAssert2.default)(_rec9._expr(_rec9._capt(_rec9._capt(output, "arguments/0/left") === true, "arguments/0"), {
      content: "assert(output === true, \"failed to verify\")",
      filepath: "tests/signature.coffee",
      line: 38,
      async: true
    }), "failed to verify");
  });
};

exports.default = publicKeyTest;