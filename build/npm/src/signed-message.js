"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignedMessage = exports.signedMessage = void 0;

var _pandaGenerics = require("panda-generics");

var _pandaParchment = require("panda-parchment");

var _utils = require("./utils");

// Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
var SignedMessage, get, isSignedMessage, signedMessage;
exports.signedMessage = signedMessage;
exports.isSignedMessage = isSignedMessage;
SignedMessage = class SignedMessage {
  constructor({
    message: message1,
    encoding: encoding1,
    publicKeys: publicKeys1,
    signatures: signatures1
  }) {
    this.message = message1;
    this.encoding = encoding1;
    this.publicKeys = publicKeys1;
    this.signatures = signatures1;
  }

  encode() {
    var key, sig;
    return (0, _utils.encode)({
      message: (0, _utils.encode)("base64", this.message),
      encoding: this.encoding,
      publicKeys: function () {
        var i, len, ref, results;
        ref = this.publicKeys;
        results = [];

        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          results.push((0, _utils.encode)("base64", key));
        }

        return results;
      }.call(this),
      signatures: function () {
        var i, len, ref, results;
        ref = this.signatures;
        results = [];

        for (i = 0, len = ref.length; i < len; i++) {
          sig = ref[i];
          results.push((0, _utils.encode)("base64", sig));
        }

        return results;
      }.call(this)
    });
  }

  encodeMessage() {
    return (0, _utils.encode)(this.encoding, this.message);
  }

};
exports.isSignedMessage = isSignedMessage = (0, _pandaParchment.isType)(SignedMessage);
get = _pandaGenerics.Method.create();

_pandaGenerics.Method.define(get, _pandaParchment.isObject, function ({
  message,
  encoding,
  publicKeys,
  signatures
}) {
  var key, sig;

  if (!message || !encoding || !publicKeys || !signatures) {
    throw new Error("Needs message, encoding, public keys, and signatures.");
  }

  return {
    message: (0, _utils.decode)("base64", message),
    encoding: encoding,
    publicKeys: function () {
      var i, len, results;
      results = [];

      for (i = 0, len = publicKeys.length; i < len; i++) {
        key = publicKeys[i];
        results.push((0, _utils.decode)("base64", key));
      }

      return results;
    }(),
    signatures: function () {
      var i, len, results;
      results = [];

      for (i = 0, len = signatures.length; i < len; i++) {
        sig = signatures[i];
        results.push((0, _utils.decode)("base64", sig));
      }

      return results;
    }()
  };
});

_pandaGenerics.Method.define(get, _pandaParchment.isString, function (s) {
  return get(JSON.parse((0, _utils.encode)("utf8", s)));
});

_pandaGenerics.Method.define(get, _utils.isData, function (d) {
  return get(JSON.parse((0, _utils.encode)("utf8", d)));
});

exports.signedMessage = signedMessage = function (input) {
  return new SignedMessage(get(input));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ25lZC1tZXNzYWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBSkE7QUFBQSxJQUFBLGFBQUEsRUFBQSxHQUFBLEVBQUEsZUFBQSxFQUFBLGFBQUE7OztBQU1NLGFBQUEsR0FBTixNQUFBLGFBQUEsQ0FBQTtBQUNFLEVBQUEsV0FBYSxDQUFDO0FBQUUsSUFBQSxPQUFBLEVBQUYsUUFBQTtBQUFZLElBQUEsUUFBQSxFQUFaLFNBQUE7QUFBdUIsSUFBQSxVQUFBLEVBQXZCLFdBQUE7QUFBb0MsSUFBQSxVQUFBLEVBQUE7QUFBcEMsR0FBRCxFQUFBO0FBQUUsU0FBQyxPQUFELEdBQUMsUUFBRDtBQUFVLFNBQUMsUUFBRCxHQUFDLFNBQUQ7QUFBVyxTQUFDLFVBQUQsR0FBQyxXQUFEO0FBQWEsU0FBQyxVQUFELEdBQUMsV0FBRDtBQUFwQzs7QUFDYixFQUFBLE1BQVEsR0FBQTtBQUNOLFFBQUEsR0FBQSxFQUFBLEdBQUE7V0FBQSxtQkFDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLG1CQUFBLFFBQUEsRUFBaUIsS0FBMUIsT0FBUyxDQUFUO0FBQ0EsTUFBQSxRQUFBLEVBQVUsS0FEVixRQUFBO0FBRUEsTUFBQSxVQUFBLEVBQUEsWUFBQTs7QUFBa0MsUUFBQSxHQUFBLEdBQUEsS0FBQSxVQUFBO0FBQUEsUUFBQSxPQUFBLEdBQUEsRUFBQTs7QUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7dUJBQXJCLG1CQUFBLFFBQUEsRUFBQSxHQUFBLEM7QUFBcUI7OztPQUFsQyxDLElBQUEsQ0FGQSxJQUVBLENBRkE7QUFHQSxNQUFBLFVBQUEsRUFBQSxZQUFBOztBQUFrQyxRQUFBLEdBQUEsR0FBQSxLQUFBLFVBQUE7QUFBQSxRQUFBLE9BQUEsR0FBQSxFQUFBOztBQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBOzt1QkFBckIsbUJBQUEsUUFBQSxFQUFBLEdBQUEsQztBQUFxQjs7O09BQWxDLEMsSUFBQSxDLElBQUE7QUFIQSxLQURGLEM7QUFETTs7QUFNUixFQUFBLGFBQWUsR0FBQTtXQUFHLG1CQUFPLEtBQVAsUUFBQSxFQUFrQixLQUFsQixPQUFBLEM7QUFBSDs7QUFSakIsQ0FBTTtBQVVOLDBCQUFBLGVBQUEsR0FBa0IsNEJBQUEsYUFBQSxDQUFsQjtBQUVBLEdBQUEsR0FBTSxzQkFBQSxNQUFBLEVBQU47O0FBQ0Esc0JBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUM7QUFBQSxFQUFBLE9BQUE7QUFBQSxFQUFBLFFBQUE7QUFBQSxFQUFBLFVBQUE7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO0FBQ0UsTUFBQSxHQUFBLEVBQUEsR0FBQTs7QUFBQSxNQUFHLENBQUEsT0FBQSxJQUFZLENBQVosUUFBQSxJQUF5QixDQUF6QixVQUFBLElBQXdDLENBQTNDLFVBQUEsRUFBQTtBQUNFLFVBQU0sSUFBQSxLQUFBLENBRFIsdURBQ1EsQ0FBTjs7O1NBQ0Y7QUFBQSxJQUFBLE9BQUEsRUFBUyxtQkFBQSxRQUFBLEVBQVQsT0FBUyxDQUFUO0FBQ0EsSUFBQSxRQUFBLEVBREEsUUFBQTtBQUVBLElBQUEsVUFBQSxFQUFBLFlBQUE7O0FBQWtDLE1BQUEsT0FBQSxHQUFBLEVBQUE7O0FBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxVQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7O3FCQUFyQixtQkFBQSxRQUFBLEVBQUEsR0FBQSxDO0FBQXFCOzs7QUFGbEMsS0FFQSxFQUZBO0FBR0EsSUFBQSxVQUFBLEVBQUEsWUFBQTs7QUFBa0MsTUFBQSxPQUFBLEdBQUEsRUFBQTs7QUFBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLFVBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7cUJBQXJCLG1CQUFBLFFBQUEsRUFBQSxHQUFBLEM7QUFBcUI7OztLQUFsQztBQUhBLEc7QUFKSixDQUFBOztBQVFBLHNCQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsd0JBQUEsRUFBNkIsVUFBQSxDQUFBLEVBQUE7U0FBTyxHQUFBLENBQUksSUFBSSxDQUFKLEtBQUEsQ0FBVyxtQkFBQSxNQUFBLEVBQWYsQ0FBZSxDQUFYLENBQUosQztBQUFwQyxDQUFBOztBQUNBLHNCQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsYUFBQSxFQUEyQixVQUFBLENBQUEsRUFBQTtTQUFPLEdBQUEsQ0FBSSxJQUFJLENBQUosS0FBQSxDQUFXLG1CQUFBLE1BQUEsRUFBZixDQUFlLENBQVgsQ0FBSixDO0FBQWxDLENBQUE7O0FBRUEsd0JBQUEsYUFBQSxHQUFnQixVQUFBLEtBQUEsRUFBQTtTQUFXLElBQUEsYUFBQSxDQUFrQixHQUFBLENBQWxCLEtBQWtCLENBQWxCLEM7QUFBWCxDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbIiMgU2lnbmVkIG1lc3NhZ2VzIGFyZSBpbiBjb250YWluaW5nIG9iamVjdHMgdGhhdCBhbHNvIGhvbGQgbWV0YS1kYXRhIGFib3V0IHRoZSBuYXR1cmUgb2YgKHBvc3NpYmx5IG11bHRpcGxlKSBzaWduYXR1cmUocykgb24gYSBtZXNzYWdlLiAgVGhpcyBjbGFzcyBhY2NlcHRzIGVpdGhlciBhbiBvYmplY3QgbGl0ZXJhbCBvciB0aGUgYmFzZTY0IGJsb2IgdGhhdCdzIG91dHB1dCBmcm9tIHRoZSBcInNpZ25cIiBtZXRob2QgZm9yIHRyYW5zcG9ydC5cbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuaW1wb3J0IHtpc1R5cGUsIGlzU3RyaW5nLCBpc0J1ZmZlciwgaXNPYmplY3R9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuXG5pbXBvcnQge2VuY29kZSwgZGVjb2RlLCBpc0RhdGF9IGZyb20gXCIuL3V0aWxzXCJcblxuY2xhc3MgU2lnbmVkTWVzc2FnZVxuICBjb25zdHJ1Y3RvcjogKHtAbWVzc2FnZSwgQGVuY29kaW5nLCBAcHVibGljS2V5cywgQHNpZ25hdHVyZXN9KSAtPlxuICBlbmNvZGU6IC0+XG4gICAgZW5jb2RlXG4gICAgICBtZXNzYWdlOiBlbmNvZGUgXCJiYXNlNjRcIiwgQG1lc3NhZ2VcbiAgICAgIGVuY29kaW5nOiBAZW5jb2RpbmdcbiAgICAgIHB1YmxpY0tleXM6IChlbmNvZGUgXCJiYXNlNjRcIiwga2V5IGZvciBrZXkgaW4gQHB1YmxpY0tleXMpXG4gICAgICBzaWduYXR1cmVzOiAoZW5jb2RlIFwiYmFzZTY0XCIsIHNpZyBmb3Igc2lnIGluIEBzaWduYXR1cmVzKVxuICBlbmNvZGVNZXNzYWdlOiAtPiBlbmNvZGUgQGVuY29kaW5nLCBAbWVzc2FnZVxuXG5pc1NpZ25lZE1lc3NhZ2UgPSBpc1R5cGUgU2lnbmVkTWVzc2FnZVxuXG5nZXQgPSBNZXRob2QuY3JlYXRlKClcbk1ldGhvZC5kZWZpbmUgZ2V0LCBpc09iamVjdCxcbiAgKHttZXNzYWdlLCBlbmNvZGluZywgcHVibGljS2V5cywgc2lnbmF0dXJlc30pIC0+XG4gICAgaWYgIW1lc3NhZ2UgfHwgIWVuY29kaW5nIHx8ICFwdWJsaWNLZXlzIHx8ICFzaWduYXR1cmVzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJOZWVkcyBtZXNzYWdlLCBlbmNvZGluZywgcHVibGljIGtleXMsIGFuZCBzaWduYXR1cmVzLlwiXG4gICAgbWVzc2FnZTogZGVjb2RlIFwiYmFzZTY0XCIsIG1lc3NhZ2VcbiAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgICBwdWJsaWNLZXlzOiAoZGVjb2RlIFwiYmFzZTY0XCIsIGtleSBmb3Iga2V5IGluIHB1YmxpY0tleXMpXG4gICAgc2lnbmF0dXJlczogKGRlY29kZSBcImJhc2U2NFwiLCBzaWcgZm9yIHNpZyBpbiBzaWduYXR1cmVzKVxuTWV0aG9kLmRlZmluZSBnZXQsIGlzU3RyaW5nLCAocykgLT4gZ2V0IEpTT04ucGFyc2UgZW5jb2RlIFwidXRmOFwiLCBzXG5NZXRob2QuZGVmaW5lIGdldCwgaXNEYXRhLCAoZCkgLT4gZ2V0IEpTT04ucGFyc2UgZW5jb2RlIFwidXRmOFwiLCBkXG5cbnNpZ25lZE1lc3NhZ2UgPSAoaW5wdXQpIC0+IG5ldyBTaWduZWRNZXNzYWdlIGdldCBpbnB1dFxuXG5leHBvcnQge3NpZ25lZE1lc3NhZ2UsIGlzU2lnbmVkTWVzc2FnZX1cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=signed-message.coffee