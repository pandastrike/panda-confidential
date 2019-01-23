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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBSEE7Ozs7QUFBQSxJQUFBLE9BQUE7O0FBT0EsT0FBQSxHQUFVLDhCQUFhLENBQ3JCO0FBQUUsRUFBQSxJQUFBLEVBQUYsVUFBQTtBQUFvQixFQUFBLEtBQUEsRUFBcEIsR0FBQTtBQUFnQyxFQUFBLElBQUEsRUFBTTtBQUF0QyxDQURxQixFQUVyQjtBQUFFLEVBQUEsSUFBQSxFQUFGLFNBQUE7QUFBbUIsRUFBQSxLQUFBLEVBQW5CLEdBQUE7QUFBK0IsRUFBQSxJQUFBLEVBQU07QUFBckMsQ0FGcUIsRUFHckI7QUFBRSxFQUFBLElBQUEsRUFBRixRQUFBO0FBQWtCLEVBQUEsS0FBQSxFQUFsQixHQUFBO0FBQThCLEVBQUEsSUFBQSxFQUFNO0FBQXBDLENBSHFCLENBQWIsQ0FBVjs7QUFNRyxDQUFBLGtCQUFBO0FBQ0QsTUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLENBQUE7O0FBQUEsTUFBRyxPQUFPLENBQVYsUUFBQSxFQUFBO0FBQ0UsUUFBQTtBQUNFLE1BQUEsT0FBTyxDQUFQLEtBQUEsQ0FBQSw2QkFBQTtBQUNBLE9BQUE7QUFBQSxRQUFBLE1BQUE7QUFBQSxRQUFBO0FBQUEsVUFBZ0Isc0JBQWhCLE9BQWdCLENBQWhCO0FBQ0EsWUFBTSxrQkFIUixNQUdRLENBQU47QUFIRixLQUFBLENBQUEsT0FBQSxLQUFBLEVBQUE7QUFJTSxNQUFBLENBQUEsR0FBQSxLQUFBO0FBQ0osTUFBQSxPQUFPLENBQVAsS0FBQSxDQUFBLHNDQUFBLEVBQUEsQ0FBQTtBQUNBLE1BQUEsT0FBTyxDQU5ULElBTUU7QUFQSjtBQUFBLEdBQUEsTUFBQTtBQVNFLElBQUEsR0FBQSxHQVRGLEtBU0U7OztBQUVGLFNBQUEsTUFBTSxvQkFBTixHQUFNLENBQU47QUFaRixDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlQ0xJQXJncyBmcm9tIFwiY29tbWFuZC1saW5lLWFyZ3NcIlxuXG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9jb250ZXh0XCJcbmltcG9ydCBFc3RhYmxpc2hLZXkgZnJvbSBcIi4va2V5XCJcbmltcG9ydCBUZXN0cyBmcm9tIFwiLi90ZXN0c1wiXG5cbiMgVGhpcyBncmFicyBDTEkgYXJ1Z21lbnRzIHRvIGFsbG93IHRoZSBkZXZlbG9wZXIgdG8gY29uZmlndXJlIHRoZSBBV1MgY29udGV4dC5cbm9wdGlvbnMgPSBwYXJzZUNMSUFyZ3MgW1xuICB7IG5hbWU6ICdleHRlbmRlZCcsIGFsaWFzOiAnZScsIHR5cGU6IEJvb2xlYW4gfVxuICB7IG5hbWU6IFwicHJvZmlsZVwiLCBhbGlhczogXCJwXCIsIHR5cGU6IFN0cmluZyB9XG4gIHsgbmFtZTogXCJyZWdpb25cIiwgYWxpYXM6IFwiclwiLCB0eXBlOiBTdHJpbmcgfVxuXVxuXG5kbyAtPlxuICBpZiBvcHRpb25zLmV4dGVuZGVkXG4gICAgdHJ5XG4gICAgICBjb25zb2xlLmVycm9yIFwiRXN0YWJsaXNoaW5nIEFXUyBjb250ZXh0Li4uXCJcbiAgICAgIHtTdW5kb2csIFNES30gPSBDb250ZXh0IG9wdGlvbnNcbiAgICAgIGF3YWl0IEVzdGFibGlzaEtleSBTdW5kb2dcbiAgICBjYXRjaCBlXG4gICAgICBjb25zb2xlLmVycm9yIFwiRmFpbGVkIHRvIGVzdGFibGlzaCBBV1MgU0RLIGNvbnRleHQuXCIsIGVcbiAgICAgIHByb2Nlc3MuZXhpdCgpXG4gIGVsc2VcbiAgICBTREsgPSBmYWxzZVxuXG4gIGF3YWl0IFRlc3RzIFNES1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/index.coffee