"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _amen = require("amen");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Signature;

Signature = function ({ sign, verify, key, keyPair, nacl, isSignedMessage }) {
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

    var A, B, blob, message, output, privateKey, publicKey, signedMsg;
    // Test Key Pair Generation
    A = ({ privateKey, publicKey } = yield keyPair.Signature());
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(privateKey, "arguments/0/left") && _rec._capt(_rec._capt(key, "arguments/0/right/callee/object").isPrivateKey(_rec._capt(privateKey, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(privateKey && key.isPrivateKey(privateKey), \"must make private key\")",
      filepath: "tests/extended/signature.coffee",
      line: 7,
      async: true
    }), "must make private key");
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(publicKey, "arguments/0/left") && _rec2._capt(_rec2._capt(key, "arguments/0/right/callee/object").isPublicKey(_rec2._capt(publicKey, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(publicKey && key.isPublicKey(publicKey), \"must make public key\")",
      filepath: "tests/extended/signature.coffee",
      line: 8,
      async: true
    }), "must make public key");
    (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(privateKey, "arguments/0/left/object/object").key, "arguments/0/left/object").length, "arguments/0/left") === _rec3._capt(_rec3._capt(_rec3._capt(nacl, "arguments/0/right/object/object").sign, "arguments/0/right/object").secretKeyLength, "arguments/0/right"), "arguments/0"), {
      content: "assert(privateKey.key.length === nacl.sign.secretKeyLength, \"private key is improper length\")",
      filepath: "tests/extended/signature.coffee",
      line: 9,
      async: true
    }), "private key is improper length");
    (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(publicKey, "arguments/0/left/object/object").key, "arguments/0/left/object").length, "arguments/0/left") === _rec4._capt(_rec4._capt(_rec4._capt(nacl, "arguments/0/right/object/object").sign, "arguments/0/right/object").publicKeyLength, "arguments/0/right"), "arguments/0"), {
      content: "assert(publicKey.key.length === nacl.sign.publicKeyLength, \"public key is improper length\")",
      filepath: "tests/extended/signature.coffee",
      line: 11,
      async: true
    }), "public key is improper length");
    // Test Encrypt - Decrypt Cycle
    B = yield keyPair.Signature();
    message = "Hello World!";
    //# Case 1
    //###############################
    // Person A signs a message.
    signedMsg = sign(A.privateKey, A.publicKey, message);
    (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt(signedMsg, "arguments/0/left") && _rec5._capt(isSignedMessage(_rec5._capt(signedMsg, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(signedMsg && isSignedMessage(signedMsg), \"bad signature\")",
      filepath: "tests/extended/signature.coffee",
      line: 23,
      async: true
    }), "bad signature");
    (0, _powerAssert2.default)(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(signedMsg, "arguments/0/left/callee/object").dumpMessage(), "arguments/0/left") === _rec6._capt(message, "arguments/0/right"), "arguments/0"), {
      content: "assert(signedMsg.dumpMessage() === message, \"message must be the same\")",
      filepath: "tests/extended/signature.coffee",
      line: 24,
      async: true
    }), "message must be the same");
    // Person B uses A's public key to verify and open the message.
    output = verify(signedMsg);
    (0, _powerAssert2.default)(_rec7._expr(_rec7._capt(_rec7._capt(output, "arguments/0/left") === true, "arguments/0"), {
      content: "assert(output === true, \"failed to verify\")",
      filepath: "tests/extended/signature.coffee",
      line: 28,
      async: true
    }), "failed to verify");
    //# Case 2
    //###############################
    // Person A and B sign a message with key pairs.
    signedMsg = sign(A, message);
    signedMsg = sign(B, signedMsg);
    (0, _powerAssert2.default)(_rec8._expr(_rec8._capt(_rec8._capt(signedMsg, "arguments/0/left") && _rec8._capt(isSignedMessage(_rec8._capt(signedMsg, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(signedMsg && isSignedMessage(signedMsg), \"bad signature\")",
      filepath: "tests/extended/signature.coffee",
      line: 36,
      async: true
    }), "bad signature");
    (0, _powerAssert2.default)(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(signedMsg, "arguments/0/left/callee/object").dumpMessage(), "arguments/0/left") === _rec9._capt(message, "arguments/0/right"), "arguments/0"), {
      content: "assert(signedMsg.dumpMessage() === message, \"message must be the same\")",
      filepath: "tests/extended/signature.coffee",
      line: 37,
      async: true
    }), "message must be the same");
    // Person C verifies the message from both.
    output = verify(signedMsg);
    (0, _powerAssert2.default)(_rec10._expr(_rec10._capt(_rec10._capt(output, "arguments/0/left") === true, "arguments/0"), {
      content: "assert(output === true, \"failed to verify\")",
      filepath: "tests/extended/signature.coffee",
      line: 41,
      async: true
    }), "failed to verify");
    //# Case 3
    //###############################
    // Person D recieves a base64 encoded blob of the signed message and verifies.
    blob = signedMsg.dump();
    output = verify(blob);
    return (0, _powerAssert2.default)(_rec11._expr(_rec11._capt(_rec11._capt(output, "arguments/0/left") === true, "arguments/0"), {
      content: "assert(output === true, \"failed to verify\")",
      filepath: "tests/extended/signature.coffee",
      line: 48,
      async: true
    }), "failed to verify");
  });
};

exports.default = Signature;