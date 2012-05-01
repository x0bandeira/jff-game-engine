class AnimationSheet
  constructor: ({@frames}) ->
  onFrame: (frame) ->
    @frames[frame.n]()

exports = window
exports.AnimationSheet = AnimationSheet

