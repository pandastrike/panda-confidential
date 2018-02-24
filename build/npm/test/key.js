"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyName = require("./key-name");

var _keyName2 = _interopRequireDefault(_keyName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// For the purposes of testing, panda-confidential needs access to a KMS key. That key has an alias of "alias/panda-confidential-testing".  The test suite checks for this key, and creates it if it does not exist.  It does not create any resources if it finds this alias within the specified region.  The test suite *DOES NOT* destroy any resources.
var EstablishKey;

EstablishKey = (() => {
  var _ref = _asyncToGenerator(function* (AWS) {
    var KeyId, addAlias, create, get;
    ({
      KMS: { get, create, addAlias }
    } = AWS);
    if (yield get(_keyName2.default)) {
      console.error(`Confirmed testing key ${_keyName2.default}`);
    } else {
      console.error(`Unable to locate key ${_keyName2.default}.  Creating...`);
      ({ KeyId } = yield create());
      return yield addAlias(KeyId, _keyName2.default);
    }
  });

  return function EstablishKey(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = EstablishKey;