# For the purposes of testing, panda-confidential needs access to a KMS key. That key has an alias of "alias/panda-confidential-testing".  The test suite checks for this key, and creates it if it does not exist.  It does not create any resources if it finds this alias within the specified region.  The test suite *DOES NOT* destroy any resources.
import name from "./key-name"

EstablishKey = (AWS) ->
  {get, create, addAlias} = AWS.KMS()

  if await get name
    console.error "Confirmed testing key #{name}"
    return
  else
    console.error "Unable to locate key #{name}.  Creating..."
    {KeyId} = await create()
    await addAlias KeyId, name

export default EstablishKey
