class Point
  equal: (b) ->
    @x == b.x and @y == b.y

  plus: (b) ->
    point(@x + b.x, @y + b.y)

  moved: (_axis, units) ->
    x = if _axis.isX() then @x + units else @x
    y = if _axis.isY() then @y + units else @y
    point(x, y)

exports = window
exports.Point = Point

