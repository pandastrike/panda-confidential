import regular from "./regular"
import extended from "./extended"

Tests = (SDK) ->
  await regular()
  await extended SDK

export default Tests
