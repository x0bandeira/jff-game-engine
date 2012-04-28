class Actor
  initialize: (@status = {}) ->

Actor.create = () ->
  return Actor.apply({}, arguments)

