class Axis
  constructor: (@name) ->
  isX: () -> @name == 'X'
  isY: () -> @name == 'Y'
  toString: () -> @name

exports = window
exports.Axis = Axis
