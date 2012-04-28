class Direction
  isAxisX: () -> @axis.isX()
  isAxisY: () -> @axis.isY()
  toString: () -> @name

exports = window
exports.Direction = Direction
