class Duration
  constructor: (@seconds) ->
    @miliseconds = @seconds * 1000
  isWithin: (duration) ->
    @miliseconds <= duration.miliseconds

Duration.fromMiliseconds = (miliseconds) ->
  new Duration(miliseconds / 1000)

Duration.fromFPS = (fps) ->
  new Duration(1 / fps)

imports = this || window
imports.Duration = Duration

