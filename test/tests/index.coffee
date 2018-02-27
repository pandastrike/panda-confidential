import regular from "./regular"
import extended from "./external"

Tests = (SDK) ->
  await regular()
  await extended SDK

export default Tests
