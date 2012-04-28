
class Collision
  distanceX: () ->
    @offender.collisionBox.distanceX(@target.collisionBox)

  distanceY: () ->
    @offender.collisionBox.distanceY(@target.collisionBox)

  collidingOnX: () ->
    _.include(@collidingAxis(), axis.X)

  collidingOnY: () ->
    _.include(@collidingAxis(), axis.Y)

  collidingAxis: () ->
    _.tap [], (a) =>
      a.push(axis.X) if @distanceX() <= 0
      a.push(axis.Y) if @distanceY() <= 0


exports = window
exports.Collision = Collision

