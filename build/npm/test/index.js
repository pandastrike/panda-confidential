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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSkE7Ozs7QUFBQSxJQUFBLE9BQUE7O0FBUUEsT0FBQSxHQUFVLDhCQUFhLENBQ3JCO0FBQUUsRUFBQSxJQUFBLEVBQUYsVUFBQTtBQUFvQixFQUFBLEtBQUEsRUFBcEIsR0FBQTtBQUFnQyxFQUFBLElBQUEsRUFBTTtBQUF0QyxDQURxQixFQUVyQjtBQUFFLEVBQUEsSUFBQSxFQUFGLFNBQUE7QUFBbUIsRUFBQSxLQUFBLEVBQW5CLEdBQUE7QUFBK0IsRUFBQSxJQUFBLEVBQU07QUFBckMsQ0FGcUIsRUFHckI7QUFBRSxFQUFBLElBQUEsRUFBRixRQUFBO0FBQWtCLEVBQUEsS0FBQSxFQUFsQixHQUFBO0FBQThCLEVBQUEsSUFBQSxFQUFNO0FBQXBDLENBSHFCLENBQWIsQ0FBVjs7QUFNRyxDQUFBLGtCQUFBO0FBQ0QsTUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLENBQUE7O0FBQUEsTUFBRyxPQUFPLENBQVYsUUFBQSxFQUFBO0FBQ0UsUUFBQTtBQUNFLE1BQUEsT0FBTyxDQUFQLEtBQUEsQ0FBQSw2QkFBQTtBQUNBLE9BQUE7QUFBQSxRQUFBLE1BQUE7QUFBQSxRQUFBO0FBQUEsVUFBZ0Isc0JBQWhCLE9BQWdCLENBQWhCO0FBQ0EsWUFBTSxrQkFIUixNQUdRLENBQU47QUFIRixLQUFBLENBQUEsT0FBQSxLQUFBLEVBQUE7QUFJTSxNQUFBLENBQUEsR0FBQSxLQUFBO0FBQ0osTUFBQSxPQUFPLENBQVAsS0FBQSxDQUFBLHNDQUFBLEVBQUEsQ0FBQTtBQUNBLE1BQUEsT0FBTyxDQU5ULElBTUU7QUFQSjtBQUFBLEdBQUEsTUFBQTtBQVNFLElBQUEsR0FBQSxHQVRGLEtBU0U7OztBQUVGLFNBQUEsTUFBTSxvQkFBTixHQUFNLENBQU47QUFaRixDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCBwYXJzZUNMSUFyZ3MgZnJvbSBcImNvbW1hbmQtbGluZS1hcmdzXCJcblxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vY29udGV4dFwiXG5pbXBvcnQgRXN0YWJsaXNoS2V5IGZyb20gXCIuL2tleVwiXG5pbXBvcnQgVGVzdHMgZnJvbSBcIi4vdGVzdHNcIlxuXG4jIFRoaXMgZ3JhYnMgQ0xJIGFydWdtZW50cyB0byBhbGxvdyB0aGUgZGV2ZWxvcGVyIHRvIGNvbmZpZ3VyZSB0aGUgQVdTIGNvbnRleHQuXG5vcHRpb25zID0gcGFyc2VDTElBcmdzIFtcbiAgeyBuYW1lOiAnZXh0ZW5kZWQnLCBhbGlhczogJ2UnLCB0eXBlOiBCb29sZWFuIH1cbiAgeyBuYW1lOiBcInByb2ZpbGVcIiwgYWxpYXM6IFwicFwiLCB0eXBlOiBTdHJpbmcgfVxuICB7IG5hbWU6IFwicmVnaW9uXCIsIGFsaWFzOiBcInJcIiwgdHlwZTogU3RyaW5nIH1cbl1cblxuZG8gLT5cbiAgaWYgb3B0aW9ucy5leHRlbmRlZFxuICAgIHRyeVxuICAgICAgY29uc29sZS5lcnJvciBcIkVzdGFibGlzaGluZyBBV1MgY29udGV4dC4uLlwiXG4gICAgICB7U3VuZG9nLCBTREt9ID0gQ29udGV4dCBvcHRpb25zXG4gICAgICBhd2FpdCBFc3RhYmxpc2hLZXkgU3VuZG9nXG4gICAgY2F0Y2ggZVxuICAgICAgY29uc29sZS5lcnJvciBcIkZhaWxlZCB0byBlc3RhYmxpc2ggQVdTIFNESyBjb250ZXh0LlwiLCBlXG4gICAgICBwcm9jZXNzLmV4aXQoKVxuICBlbHNlXG4gICAgU0RLID0gZmFsc2VcblxuICBhd2FpdCBUZXN0cyBTREtcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/test/index.coffee