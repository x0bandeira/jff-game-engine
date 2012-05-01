Animations = Animations || {}

class Animations.ImageMap
  constructor: ({@duration, @image_map, @steps, @target}) ->
  update: (moment) ->
    @target.image_background = @at(moment)

  start: () ->
    @loop = new Loop
      duration: @duration,
      _.bind(@update, this)
      
  stop: () ->
    @shouldStop = true

  forceStop: () ->
    finish()
    clearInterval @interval
    @interval = null
    @shouldStop = false
    
    
exports = this || window
exports.Animations = Animations
