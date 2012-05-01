class Frame
  constructor: (@n, @fps) ->
    throw 'Frame has to be > 0' unless @n > 0
    @index = @n - 1
  next: ->
    next = if @n + 1 <= @fps then @n + 1 else 1
    new Frame(next, @fps)
  adjustedFor: (fps) -> # legacy
    ticks = @fps / fps
    tick = _.find(
      _.range(1, fps + 1),
      (i) => @n < i * ticks
    )

    new Frame(tick || 1, fps)


exports = this || window
exports.Frame = Frame
