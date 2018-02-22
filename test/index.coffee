import "source-map-support/register"
import parseCLIArgs from "command-line-args"

import Context from "./context"
import EstablishKey from "./key"
import Tests from "./tests"

# This grabs CLI arugments to allow the developer to configure the AWS context.
options = parseCLIArgs [
  { name: "profile", alias: "p", type: String }
  { name: "region", alias: "r", type: String }
]

do ->
  try
    console.error "Establishing AWS context..."
    {Sundog, SDK} = Context options
    await EstablishKey Sundog
  catch e
    console.error "Failed to establish AWS SDK context.", e
    process.exit()

  await Tests SDK
