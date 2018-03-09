"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confidential = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _keys = require("./keys");

var _keyPairs = require("./key-pairs");

var _signedMessage = require("./signed-message");

var _encrypt = require("./encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

var _decrypt = require("./decrypt");

var _decrypt2 = _interopRequireDefault(_decrypt);

var _sign = require("./sign");

var _sign2 = _interopRequireDefault(_sign);

var _verify = require("./verify");

var _verify2 = _interopRequireDefault(_verify);

var _hash = require("./hash");

var _hash2 = _interopRequireDefault(_hash);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confidential;

exports.confidential = confidential = function () {
  var c;
  c = {
    randomBytes: _tweetnacl2.default.randomBytes
  };
  // Key types.  Symmetric key generation requires randomBytes.
  c.key = {
    private: _keys.privateKey,
    public: _keys.publicKey,
    shared: _keys.sharedKey,
    symmetric: (0, _keys.symmetricKey)(c.randomBytes),
    isPrivate: _keys.isPrivateKey,
    isPublic: _keys.isPublicKey,
    isShared: _keys.isSharedKey,
    isSymmetric: _keys.isSymmetricKey,
    equal: _keys.equal
  };
  // Key pair types.  Pair generation requires randomBytes
  c.keyPair = {
    encryption: (0, _keyPairs.encryptionKeyPair)(c.randomBytes),
    signature: (0, _keyPairs.signatureKeyPair)(c.randomBytes),
    isEncryption: _keyPairs.isEncryptionKeyPair,
    isSignature: _keyPairs.isSignatureKeyPair
  };
  // Signed message type.
  c.signedMessage = _signedMessage.signedMessage;
  c.isSignedMessage = _signedMessage.isSignedMessage;
  // Main functions, 3 pairs of opposing operations.
  // encrypt needs randomBytes for nonce generation
  c.encrypt = (0, _encrypt2.default)(c.randomBytes);
  c.decrypt = _decrypt2.default;
  c.sign = _sign2.default;
  c.verify = _verify2.default;
  c.encode = _utils.encode;
  c.decode = _utils.decode;
  // Helper functions
  c.nacl = _tweetnacl2.default; // Base methods directly use tweetnacl.
  c.hash = _hash2.default; // wrapper around tweetnacl's SHA-512 hash
  c.isData = _utils.isData; // Is Uint8Array or Node.js buffer?
  return c;
};

exports.confidential = confidential;