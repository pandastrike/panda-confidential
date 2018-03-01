"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _amen = require("amen");

var _index = require("../../../src/index");

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var asymmetric;

asymmetric = (() => {
  var _ref = _asyncToGenerator(function* () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder(),
        _rec3 = new _powerAssertRecorder(),
        _rec4 = new _powerAssertRecorder(),
        _rec5 = new _powerAssertRecorder(),
        _rec6 = new _powerAssertRecorder(),
        _rec7 = new _powerAssertRecorder(),
        _rec8 = new _powerAssertRecorder(),
        _rec9 = new _powerAssertRecorder(),
        _rec10 = new _powerAssertRecorder();

    var A, B, cipher, decrypt, encrypt, key, key1, key2, keyPair, message, output, privateKey, publicKey;
    ({ keyPair, key, encrypt, decrypt } = (0, _index.confidential)());
    // Test Key Pair Generation
    A = ({ privateKey, publicKey } = yield keyPair.Encryption());
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(privateKey, "arguments/0/left") && _rec._capt(_rec._capt(key, "arguments/0/right/callee/object").isPrivate(_rec._capt(privateKey, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(privateKey && key.isPrivate(privateKey), \"must make private key\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 11,
      async: true
    }), "must make private key");
    (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(publicKey, "arguments/0/left") && _rec2._capt(_rec2._capt(key, "arguments/0/right/callee/object").isPublic(_rec2._capt(publicKey, "arguments/0/right/arguments/0")), "arguments/0/right"), "arguments/0"), {
      content: "assert(publicKey && key.isPublic(publicKey), \"must make public key\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 12,
      async: true
    }), "must make public key");
    (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(privateKey, "arguments/0/left/object/object").key, "arguments/0/left/object").length, "arguments/0/left") === _rec3._capt(_rec3._capt(_rec3._capt(_tweetnacl2.default, "arguments/0/right/object/object").box, "arguments/0/right/object").secretKeyLength, "arguments/0/right"), "arguments/0"), {
      content: "assert(privateKey.key.length === nacl.box.secretKeyLength, \"private key is improper length\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 13,
      async: true
    }), "private key is improper length");
    (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(publicKey, "arguments/0/left/object/object").key, "arguments/0/left/object").length, "arguments/0/left") === _rec4._capt(_rec4._capt(_rec4._capt(_tweetnacl2.default, "arguments/0/right/object/object").box, "arguments/0/right/object").publicKeyLength, "arguments/0/right"), "arguments/0"), {
      content: "assert(publicKey.key.length === nacl.box.publicKeyLength, \"public key is improper length\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 15,
      async: true
    }), "public key is improper length");
    // Test Encrypt - Decrypt Cycle
    B = yield keyPair.Encryption();
    message = "Hello World!";
    // Person A encrypts the message for person B.
    key1 = key.Shared(A.privateKey, B.publicKey);
    (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt(_rec5._capt(key1, "arguments/0/left/left") && _rec5._capt(_rec5._capt(key, "arguments/0/left/right/callee/object").isShared(_rec5._capt(key1, "arguments/0/left/right/arguments/0")), "arguments/0/left/right"), "arguments/0/left") && _rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(key1, "arguments/0/right/left/object/object").key, "arguments/0/right/left/object").length, "arguments/0/right/left") === _rec5._capt(_rec5._capt(_rec5._capt(_tweetnacl2.default, "arguments/0/right/right/object/object").box, "arguments/0/right/right/object").sharedKeyLength, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(key1 && key.isShared(key1) && key1.key.length === nacl.box.sharedKeyLength, \"failed to create shared key.\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 24,
      async: true
    }), "failed to create shared key.");
    cipher = yield encrypt(key1, message);
    (0, _powerAssert2.default)(_rec6._expr(_rec6._capt(_rec6._capt(cipher, "arguments/0/left") && _rec6._capt(_rec6._capt(message, "arguments/0/right/left") !== _rec6._capt(cipher, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(cipher && message !== cipher, \"failed to create a ciphertext\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 26,
      async: true
    }), "failed to create a ciphertext");
    // Person B gets the cipher and decrypts the message with counterpart.
    key2 = key.Shared(B.privateKey, A.publicKey);
    _powerAssert2.default.equal(_rec7._expr(_rec7._capt(_rec7._capt(key1, "arguments/0/callee/object").dump(), "arguments/0"), {
      content: "assert.equal(key1.dump(), key2.dump(), \"shared keys must be identical\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 30,
      async: true
    }), _rec8._expr(_rec8._capt(_rec8._capt(key2, "arguments/1/callee/object").dump(), "arguments/1"), {
      content: "assert.equal(key1.dump(), key2.dump(), \"shared keys must be identical\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 30,
      async: true
    }), "shared keys must be identical");
    output = decrypt(key2, cipher);
    return _powerAssert2.default.equal(_rec9._expr(_rec9._capt(message, "arguments/0"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 32,
      async: true
    }), _rec10._expr(_rec10._capt(output, "arguments/1"), {
      content: "assert.equal(message, output, \"failed to decrypt\")",
      filepath: "tests/regular/asymmetric-encryption.coffee",
      line: 32,
      async: true
    }), "failed to decrypt");
  });

  return function asymmetric() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = asymmetric;