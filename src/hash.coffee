import nacl from "tweetnacl"
import {decode, encode} from "../utils"

# Return the SHA-512 hash of a message.
hash = (message, encoding="utf8") ->
  encode "base64", nacl.hash decode encoding, message

export default hash
