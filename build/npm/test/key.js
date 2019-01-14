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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3Qva2V5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFEQTtBQUFBLElBQUEsWUFBQTs7QUFHQSxZQUFBLEdBQWUsZ0JBQUEsR0FBQSxFQUFBO0FBQ2IsTUFBQSxLQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBO0FBQUEsR0FBQTtBQUFDLElBQUEsR0FBQSxFQUFJO0FBQUEsTUFBQSxHQUFBO0FBQUEsTUFBQSxNQUFBO0FBQUEsTUFBQTtBQUFBO0FBQUwsTUFBQSxHQUFBOztBQUVBLE1BQUcsTUFBTSxHQUFBLENBQVQsZ0JBQVMsQ0FBVCxFQUFBO0FBQ0UsSUFBQSxPQUFPLENBQVAsS0FBQSxDQUFjLHlCQUFBLGdCQURoQixFQUNFO0FBREYsR0FBQSxNQUFBO0FBSUUsSUFBQSxPQUFPLENBQVAsS0FBQSxDQUFjLHdCQUFBLGdCQUFkLGdCQUFBO0FBQ0EsS0FBQTtBQUFBLE1BQUE7QUFBQSxRQUFVLE1BQU0sTUFBaEIsRUFBQTtBQUNBLFdBQUEsTUFBTSxRQUFBLENBQUEsS0FBQSxFQU5SLGdCQU1RLENBQU47O0FBVFcsQ0FBZjs7ZUFXZSxZIiwic291cmNlc0NvbnRlbnQiOlsiIyBGb3IgdGhlIHB1cnBvc2VzIG9mIHRlc3RpbmcsIHBhbmRhLWNvbmZpZGVudGlhbCBuZWVkcyBhY2Nlc3MgdG8gYSBLTVMga2V5LiBUaGF0IGtleSBoYXMgYW4gYWxpYXMgb2YgXCJhbGlhcy9wYW5kYS1jb25maWRlbnRpYWwtdGVzdGluZ1wiLiAgVGhlIHRlc3Qgc3VpdGUgY2hlY2tzIGZvciB0aGlzIGtleSwgYW5kIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3QgZXhpc3QuICBJdCBkb2VzIG5vdCBjcmVhdGUgYW55IHJlc291cmNlcyBpZiBpdCBmaW5kcyB0aGlzIGFsaWFzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJlZ2lvbi4gIFRoZSB0ZXN0IHN1aXRlICpET0VTIE5PVCogZGVzdHJveSBhbnkgcmVzb3VyY2VzLlxuaW1wb3J0IG5hbWUgZnJvbSBcIi4va2V5LW5hbWVcIlxuXG5Fc3RhYmxpc2hLZXkgPSAoQVdTKSAtPlxuICB7S01TOntnZXQsIGNyZWF0ZSwgYWRkQWxpYXN9fSA9IEFXU1xuXG4gIGlmIGF3YWl0IGdldCBuYW1lXG4gICAgY29uc29sZS5lcnJvciBcIkNvbmZpcm1lZCB0ZXN0aW5nIGtleSAje25hbWV9XCJcbiAgICByZXR1cm5cbiAgZWxzZVxuICAgIGNvbnNvbGUuZXJyb3IgXCJVbmFibGUgdG8gbG9jYXRlIGtleSAje25hbWV9LiAgQ3JlYXRpbmcuLi5cIlxuICAgIHtLZXlJZH0gPSBhd2FpdCBjcmVhdGUoKVxuICAgIGF3YWl0IGFkZEFsaWFzIEtleUlkLCBuYW1lXG5cbmV4cG9ydCBkZWZhdWx0IEVzdGFibGlzaEtleVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/key.coffee