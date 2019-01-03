"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyPair = exports.KeyPair = void 0;

var _pandaParchment = require("panda-parchment");

var _utils = require("../utils");

var KeyPair, isKeyPair;
exports.isKeyPair = isKeyPair;
exports.KeyPair = KeyPair;
exports.KeyPair = KeyPair = class KeyPair {
  constructor({
    privateKey,
    publicKey
  }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  encode() {
    return (0, _utils.encode)({
      privateKey: this.privateKey.encode(),
      publicKey: this.publicKey.encode()
    });
  }

};
exports.isKeyPair = isKeyPair = (0, _pandaParchment.isKind)(KeyPair);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleS1wYWlycy9rZXktcGFpci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQURBLElBQUEsT0FBQSxFQUFBLFNBQUE7OztBQUdNLGtCQUFBLE9BQUEsR0FBTixNQUFBLE9BQUEsQ0FBQTtBQUNFLEVBQUEsV0FBYSxDQUFDO0FBQUEsSUFBQSxVQUFBO0FBQUQsSUFBQTtBQUFDLEdBQUQsRUFBQTtBQUFFLFNBQUMsVUFBRCxHQUFDLFVBQUQ7QUFBYSxTQUFDLFNBQUQsR0FBQyxTQUFEO0FBQWY7O0FBQ2IsRUFBQSxNQUFRLEdBQUE7V0FDTixtQkFDRTtBQUFBLE1BQUEsVUFBQSxFQUFZLEtBQUMsVUFBRCxDQUFaLE1BQVksRUFBWjtBQUNBLE1BQUEsU0FBQSxFQUFXLEtBQUMsU0FBRCxDQUFBLE1BQUE7QUFEWCxLQURGLEM7QUFETTs7QUFGVixDQUFNO0FBT04sb0JBQUEsU0FBQSxHQUFZLDRCQUFBLE9BQUEsQ0FBWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNLaW5kfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7ZW5jb2RlfSBmcm9tIFwiLi4vdXRpbHNcIlxuXG5jbGFzcyBLZXlQYWlyXG4gIGNvbnN0cnVjdG9yOiAoe0Bwcml2YXRlS2V5LCBAcHVibGljS2V5fSkgLT5cbiAgZW5jb2RlOiAtPlxuICAgIGVuY29kZVxuICAgICAgcHJpdmF0ZUtleTogQHByaXZhdGVLZXkuZW5jb2RlKClcbiAgICAgIHB1YmxpY0tleTogQHB1YmxpY0tleS5lbmNvZGUoKVxuXG5pc0tleVBhaXIgPSBpc0tpbmQgS2V5UGFpclxuXG5leHBvcnQge0tleVBhaXIsIGlzS2V5UGFpcn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=key-pairs/key-pair.coffee