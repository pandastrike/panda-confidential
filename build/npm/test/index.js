"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _context = _interopRequireDefault(require("./context"));

var _key = _interopRequireDefault(require("./key"));

var _tests = _interopRequireDefault(require("./tests"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options;
// This grabs CLI arugments to allow the developer to configure the AWS context.
options = (0, _commandLineArgs.default)([{
  name: 'extended',
  alias: 'e',
  type: Boolean
}, {
  name: "profile",
  alias: "p",
  type: String
}, {
  name: "region",
  alias: "r",
  type: String
}]);

(async function () {
  var SDK, Sundog, e;

  if (options.extended) {
    try {
      console.error("Establishing AWS context...");
      ({
        Sundog,
        SDK
      } = (0, _context.default)(options));
      await (0, _key.default)(Sundog);
    } catch (error) {
      e = error;
      console.error("Failed to establish AWS SDK context.", e);
      process.exit();
    }
  } else {
    SDK = false;
  }

  return await (0, _tests.default)(SDK);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFDQTs7QUFIQTs7OztBQUFBLElBQUEsT0FBQTs7QUFPQSxPQUFBLEdBQVUsOEJBQWEsQ0FDckI7QUFBRSxFQUFBLElBQUEsRUFBRixVQUFBO0FBQW9CLEVBQUEsS0FBQSxFQUFwQixHQUFBO0FBQWdDLEVBQUEsSUFBQSxFQUFNO0FBQXRDLENBRHFCLEVBRXJCO0FBQUUsRUFBQSxJQUFBLEVBQUYsU0FBQTtBQUFtQixFQUFBLEtBQUEsRUFBbkIsR0FBQTtBQUErQixFQUFBLElBQUEsRUFBTTtBQUFyQyxDQUZxQixFQUdyQjtBQUFFLEVBQUEsSUFBQSxFQUFGLFFBQUE7QUFBa0IsRUFBQSxLQUFBLEVBQWxCLEdBQUE7QUFBOEIsRUFBQSxJQUFBLEVBQU07QUFBcEMsQ0FIcUIsQ0FBYixDQUFWOztBQU1HLENBQUEsa0JBQUE7QUFDRCxNQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQTs7QUFBQSxNQUFHLE9BQU8sQ0FBVixRQUFBLEVBQUE7QUFDRSxRQUFBO0FBQ0UsTUFBQSxPQUFPLENBQVAsS0FBQSxDQUFBLDZCQUFBO0FBQ0EsT0FBQTtBQUFBLFFBQUEsTUFBQTtBQUFBLFFBQUE7QUFBQSxVQUFnQixzQkFBaEIsT0FBZ0IsQ0FBaEI7QUFDQSxZQUFNLGtCQUhSLE1BR1EsQ0FBTjtBQUhGLEtBQUEsQ0FBQSxPQUFBLEtBQUEsRUFBQTtBQUlNLE1BQUEsQ0FBQSxHQUFBLEtBQUE7QUFDSixNQUFBLE9BQU8sQ0FBUCxLQUFBLENBQUEsc0NBQUEsRUFBQSxDQUFBO0FBQ0EsTUFBQSxPQUFPLENBTlQsSUFNRTtBQVBKO0FBQUEsR0FBQSxNQUFBO0FBU0UsSUFBQSxHQUFBLEdBVEYsS0FTRTs7O0FBRUYsU0FBQSxNQUFNLG9CQUFOLEdBQU0sQ0FBTjtBQVpGLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFyc2VDTElBcmdzIGZyb20gXCJjb21tYW5kLWxpbmUtYXJnc1wiXG5cbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL2NvbnRleHRcIlxuaW1wb3J0IEVzdGFibGlzaEtleSBmcm9tIFwiLi9rZXlcIlxuaW1wb3J0IFRlc3RzIGZyb20gXCIuL3Rlc3RzXCJcblxuIyBUaGlzIGdyYWJzIENMSSBhcnVnbWVudHMgdG8gYWxsb3cgdGhlIGRldmVsb3BlciB0byBjb25maWd1cmUgdGhlIEFXUyBjb250ZXh0Llxub3B0aW9ucyA9IHBhcnNlQ0xJQXJncyBbXG4gIHsgbmFtZTogJ2V4dGVuZGVkJywgYWxpYXM6ICdlJywgdHlwZTogQm9vbGVhbiB9XG4gIHsgbmFtZTogXCJwcm9maWxlXCIsIGFsaWFzOiBcInBcIiwgdHlwZTogU3RyaW5nIH1cbiAgeyBuYW1lOiBcInJlZ2lvblwiLCBhbGlhczogXCJyXCIsIHR5cGU6IFN0cmluZyB9XG5dXG5cbmRvIC0+XG4gIGlmIG9wdGlvbnMuZXh0ZW5kZWRcbiAgICB0cnlcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCJFc3RhYmxpc2hpbmcgQVdTIGNvbnRleHQuLi5cIlxuICAgICAge1N1bmRvZywgU0RLfSA9IENvbnRleHQgb3B0aW9uc1xuICAgICAgYXdhaXQgRXN0YWJsaXNoS2V5IFN1bmRvZ1xuICAgIGNhdGNoIGVcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCJGYWlsZWQgdG8gZXN0YWJsaXNoIEFXUyBTREsgY29udGV4dC5cIiwgZVxuICAgICAgcHJvY2Vzcy5leGl0KClcbiAgZWxzZVxuICAgIFNESyA9IGZhbHNlXG5cbiAgYXdhaXQgVGVzdHMgU0RLXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/index.coffee