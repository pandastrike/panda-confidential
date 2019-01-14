{tools} = require "panda-builder"
p9k = require "panda-9000"

{target} = tools p9k

target "npm"
target "web"

thru = require "through2"
bpp = (require "biscotti-cpp").default

tee = (f) ->
  thru.obj (file, encoding, callback) ->
    await f file, encoding
    callback null, file

pluck = (key, f) ->
  tee (file) -> f file[key]

extension = (extension) ->
  tee (file) ->
    file.extname = extension

content = (f) ->
  tee (file, encoding) ->
    file.contents = Buffer.from await f (file.contents.toString encoding), file

render = bpp {require}

# TODO: prevent gulp from loading the file
# TODO: or allow path param when providing content directly
task "biscotti:md", ->
  src "docs/*.md.bpp"
  .pipe content (string, {path}) ->
    await render {path}
  .pipe extension ""
  .pipe dest "."
