
class CollisionBox
  initialize: (@size) ->

  move: (axis, units) ->
    @position = @position.moved(axis, units)

  width: -> @size.x
  height: -> @size.y
  axisX: -> @position.x
  axisY: -> @position.y
  boundariesX: -> @axisX() + @width()
  boundariesY: -> @axisY() + @height()

  collides: (collisionBox) ->
    a = this
    b = collisionBox
    return (
      a.boundariesX() >= b.axisX() and
      a.axisX() <= b.boundariesX() and
      a.boundariesY() >= b.axisY() and
      a.axisY() <= b.boundariesY()
    )

  distanceX: (collisionBox) ->
    a = this
    b = collisionBox
    return b.axisX() - a.boundariesX() if (a.boundariesX() < b.axisX()) 
    return a.axisX() - b.boundariesX() if (b.boundariesX() < a.axisX()) 
    return 0

  distanceY: (collisionBox) ->
    a = this
    b = collisionBox
    return b.axisY() - a.boundariesY() if (a.boundariesY() < b.axisY()) 
    return a.axisY() - b.boundariesY() if (b.boundariesY() < a.axisY()) 
    return 0

exports = window
exports.CollisionBox = CollisionBox
