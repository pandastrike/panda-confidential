import regular from "./regular"
import extended from "./extended"

Tests = (SDK) ->
  await regular()
  if SDK
    await extended SDK

export default Tests
