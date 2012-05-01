isCommonJS = !@hasOwnProperty('window')

if isCommonJS
  Duration = require('./duration').Duration
  Frame = require('./frame').Frame

class Loop
  constructor: ({@duration, @fps, @nonStop}, @operation) ->
    @tick = Duration.fromFPS(@fps)
    @nonStop = true unless @duration

  start: ->
    @running = true
    @cycle = 0
    @_stop = false
    @interval = setInterval @callback(), @tick.miliseconds

  stop: ->
    @_stop = true

  forceStop: ->
    return unless @running
    clearInterval @interval
    @interval = null
    @_stop = @running = false

  shouldStop: ->
    return true if @_stop
    return true if !@nonStop && !@runningTime().isWithin(@duration)
    false

  runningTime: ->
    Duration.fromMiliseconds(@cycle * @tick.miliseconds)

  updateFrame: ->
    @currentFrame = @currentFrame?.next() || new Frame(1, @fps)

  callback: ->
    return () =>
      @cycle++
      return @forceStop() if @shouldStop()
      @running = true
      @operation(@updateFrame())

exports = this || window
exports.Loop = Loop

