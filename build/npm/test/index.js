"use strict";

require("source-map-support/register");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUpBOzs7O0FBQUEsSUFBQSxPQUFBOztBQVFBLE9BQUEsR0FBVSw4QkFBYSxDQUNyQjtBQUFFLEVBQUEsSUFBQSxFQUFGLFVBQUE7QUFBb0IsRUFBQSxLQUFBLEVBQXBCLEdBQUE7QUFBZ0MsRUFBQSxJQUFBLEVBQU07QUFBdEMsQ0FEcUIsRUFFckI7QUFBRSxFQUFBLElBQUEsRUFBRixTQUFBO0FBQW1CLEVBQUEsS0FBQSxFQUFuQixHQUFBO0FBQStCLEVBQUEsSUFBQSxFQUFNO0FBQXJDLENBRnFCLEVBR3JCO0FBQUUsRUFBQSxJQUFBLEVBQUYsUUFBQTtBQUFrQixFQUFBLEtBQUEsRUFBbEIsR0FBQTtBQUE4QixFQUFBLElBQUEsRUFBTTtBQUFwQyxDQUhxQixDQUFiLENBQVY7O0FBTUcsQ0FBQSxrQkFBQTtBQUNELE1BQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxDQUFBOztBQUFBLE1BQUcsT0FBTyxDQUFWLFFBQUEsRUFBQTtBQUNFLFFBQUE7QUFDRSxNQUFBLE9BQU8sQ0FBUCxLQUFBLENBQUEsNkJBQUE7QUFDQSxPQUFBO0FBQUEsUUFBQSxNQUFBO0FBQUEsUUFBQTtBQUFBLFVBQWdCLHNCQUFoQixPQUFnQixDQUFoQjtBQUNBLFlBQU0sa0JBSFIsTUFHUSxDQUFOO0FBSEYsS0FBQSxDQUFBLE9BQUEsS0FBQSxFQUFBO0FBSU0sTUFBQSxDQUFBLEdBQUEsS0FBQTtBQUNKLE1BQUEsT0FBTyxDQUFQLEtBQUEsQ0FBQSxzQ0FBQSxFQUFBLENBQUE7QUFDQSxNQUFBLE9BQU8sQ0FOVCxJQU1FO0FBUEo7QUFBQSxHQUFBLE1BQUE7QUFTRSxJQUFBLEdBQUEsR0FURixLQVNFOzs7QUFFRixTQUFBLE1BQU0sb0JBQU4sR0FBTSxDQUFOO0FBWkYsQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInNvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlclwiXG5pbXBvcnQgcGFyc2VDTElBcmdzIGZyb20gXCJjb21tYW5kLWxpbmUtYXJnc1wiXG5cbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL2NvbnRleHRcIlxuaW1wb3J0IEVzdGFibGlzaEtleSBmcm9tIFwiLi9rZXlcIlxuaW1wb3J0IFRlc3RzIGZyb20gXCIuL3Rlc3RzXCJcblxuIyBUaGlzIGdyYWJzIENMSSBhcnVnbWVudHMgdG8gYWxsb3cgdGhlIGRldmVsb3BlciB0byBjb25maWd1cmUgdGhlIEFXUyBjb250ZXh0Llxub3B0aW9ucyA9IHBhcnNlQ0xJQXJncyBbXG4gIHsgbmFtZTogJ2V4dGVuZGVkJywgYWxpYXM6ICdlJywgdHlwZTogQm9vbGVhbiB9XG4gIHsgbmFtZTogXCJwcm9maWxlXCIsIGFsaWFzOiBcInBcIiwgdHlwZTogU3RyaW5nIH1cbiAgeyBuYW1lOiBcInJlZ2lvblwiLCBhbGlhczogXCJyXCIsIHR5cGU6IFN0cmluZyB9XG5dXG5cbmRvIC0+XG4gIGlmIG9wdGlvbnMuZXh0ZW5kZWRcbiAgICB0cnlcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCJFc3RhYmxpc2hpbmcgQVdTIGNvbnRleHQuLi5cIlxuICAgICAge1N1bmRvZywgU0RLfSA9IENvbnRleHQgb3B0aW9uc1xuICAgICAgYXdhaXQgRXN0YWJsaXNoS2V5IFN1bmRvZ1xuICAgIGNhdGNoIGVcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCJGYWlsZWQgdG8gZXN0YWJsaXNoIEFXUyBTREsgY29udGV4dC5cIiwgZVxuICAgICAgcHJvY2Vzcy5leGl0KClcbiAgZWxzZVxuICAgIFNESyA9IGZhbHNlXG5cbiAgYXdhaXQgVGVzdHMgU0RLXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=index.coffee