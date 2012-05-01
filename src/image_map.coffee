class ImageMap
  constructor: ({@image, @positions}) ->
    @map = _.groupBy @positions, (p) -> p.id
  position: (key) ->
    @map[key]

exports = this || window
exports.ImageMap = ImageMap
