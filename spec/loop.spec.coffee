describe 'Loop', () ->
  Loop = require('../src/loop').Loop
  Duration = require('../src/duration').Duration
  Frame = require('../src/frame').Frame

  subject = null
  callback = null

  after = (milis, cb) ->
    waits milis
    runs ->
      cb()
      subject.forceStop()

  beforeEach ->
    callback = jasmine.createSpy('loop operation')
    subject = new Loop
      duration: new Duration(1.5)
      fps:      24
      nonStop:  false, callback

  it 'executes operation #fps times per second', ->
    subject.start()
    after 1000, ->
      expect(callback).toHaveBeenCalled()
      expect(callback.callCount).toEqual(24)

  it 'passes frame to operation', ->
    subject.start()
    after 1000, ->
      expect(callback).toHaveBeenCalledWith(new Frame(1, 24))
      expect(callback).toHaveBeenCalledWith(new Frame(2, 24))

  it 'stops after duration is over', ->
    subject.start()
    after 1600, ->
      expect(subject.running).toBeFalsy()

  it 'never stops running if set non-stop', ->
    subject.nonStop = true
    subject.start()
    after 1600, ->
      expect(subject.running).toBeTruthy()

  it 'never stops running if not set with a duration', ->
    subject = new Loop fps: 4, callback
    expect(subject.nonStop).toBeTruthy()
