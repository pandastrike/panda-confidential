"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyName = _interopRequireDefault(require("./key-name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For the purposes of testing, panda-confidential needs access to a KMS key. That key has an alias of "alias/panda-confidential-testing".  The test suite checks for this key, and creates it if it does not exist.  It does not create any resources if it finds this alias within the specified region.  The test suite *DOES NOT* destroy any resources.
var EstablishKey;

EstablishKey = async function (AWS) {
  var KeyId, addAlias, create, get;
  ({
    KMS: {
      get,
      create,
      addAlias
    }
  } = AWS);

  if (await get(_keyName.default)) {
    console.error(`Confirmed testing key ${_keyName.default}`);
  } else {
    console.error(`Unable to locate key ${_keyName.default}.  Creating...`);
    ({
      KeyId
    } = await create());
    return await addAlias(KeyId, _keyName.default);
  }
};

var _default = EstablishKey;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC9rZXkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQURBO0FBQUEsSUFBQSxZQUFBOztBQUdBLFlBQUEsR0FBZSxnQkFBQSxHQUFBLEVBQUE7QUFDYixNQUFBLEtBQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUE7QUFBQSxHQUFBO0FBQUMsSUFBQSxHQUFBLEVBQUk7QUFBQSxNQUFBLEdBQUE7QUFBQSxNQUFBLE1BQUE7QUFBQSxNQUFBO0FBQUE7QUFBTCxNQUFBLEdBQUE7O0FBRUEsTUFBRyxNQUFNLEdBQUEsQ0FBVCxnQkFBUyxDQUFULEVBQUE7QUFDRSxJQUFBLE9BQU8sQ0FBUCxLQUFBLENBQWMseUJBQUEsZ0JBRGhCLEVBQ0U7QUFERixHQUFBLE1BQUE7QUFJRSxJQUFBLE9BQU8sQ0FBUCxLQUFBLENBQWMsd0JBQUEsZ0JBQWQsZ0JBQUE7QUFDQSxLQUFBO0FBQUEsTUFBQTtBQUFBLFFBQVUsTUFBTSxNQUFoQixFQUFBO0FBQ0EsV0FBQSxNQUFNLFFBQUEsQ0FBQSxLQUFBLEVBTlIsZ0JBTVEsQ0FBTjs7QUFUVyxDQUFmOztlQVdlLFkiLCJzb3VyY2VzQ29udGVudCI6WyIjIEZvciB0aGUgcHVycG9zZXMgb2YgdGVzdGluZywgcGFuZGEtY29uZmlkZW50aWFsIG5lZWRzIGFjY2VzcyB0byBhIEtNUyBrZXkuIFRoYXQga2V5IGhhcyBhbiBhbGlhcyBvZiBcImFsaWFzL3BhbmRhLWNvbmZpZGVudGlhbC10ZXN0aW5nXCIuICBUaGUgdGVzdCBzdWl0ZSBjaGVja3MgZm9yIHRoaXMga2V5LCBhbmQgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdCBleGlzdC4gIEl0IGRvZXMgbm90IGNyZWF0ZSBhbnkgcmVzb3VyY2VzIGlmIGl0IGZpbmRzIHRoaXMgYWxpYXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmVnaW9uLiAgVGhlIHRlc3Qgc3VpdGUgKkRPRVMgTk9UKiBkZXN0cm95IGFueSByZXNvdXJjZXMuXG5pbXBvcnQgbmFtZSBmcm9tIFwiLi9rZXktbmFtZVwiXG5cbkVzdGFibGlzaEtleSA9IChBV1MpIC0+XG4gIHtLTVM6e2dldCwgY3JlYXRlLCBhZGRBbGlhc319ID0gQVdTXG5cbiAgaWYgYXdhaXQgZ2V0IG5hbWVcbiAgICBjb25zb2xlLmVycm9yIFwiQ29uZmlybWVkIHRlc3Rpbmcga2V5ICN7bmFtZX1cIlxuICAgIHJldHVyblxuICBlbHNlXG4gICAgY29uc29sZS5lcnJvciBcIlVuYWJsZSB0byBsb2NhdGUga2V5ICN7bmFtZX0uICBDcmVhdGluZy4uLlwiXG4gICAge0tleUlkfSA9IGF3YWl0IGNyZWF0ZSgpXG4gICAgYXdhaXQgYWRkQWxpYXMgS2V5SWQsIG5hbWVcblxuZXhwb3J0IGRlZmF1bHQgRXN0YWJsaXNoS2V5XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/key.coffee