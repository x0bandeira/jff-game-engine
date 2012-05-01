describe 'Animations.ImageMap', ->
  Animations = require('animations/image_map').Animations
  Duration = require('duration').Duration
  ImageMap = require('image_map').ImageMap

  subject = null
  imageMap = null
  animatedObj = null

  after = (milis, cb) ->
    waits milis
    runs ->
      cb()
      subject.forceStop()

  beforeEach ->
    imageMap = {}
    animatedObj = jasmine.createSpyObj('animated')
    subject = new Animations.ImageMap
      duration: new Duration(1)
      image_map: imageMap()
      steps: []
      target: animatedObj

  it 'updates image_background property of target', ->
    subject.start()
    after 200, ->
      expect(target.image_background).toEqual(new ImageMap.Position)

