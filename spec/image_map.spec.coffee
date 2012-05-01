describe 'ImageMap', ->
  """
  An ImageMap is what ties together ids to image positions to enable 
  a readable way to find the right position in a sprite image.

  The idea is to allow all different images that compose an entity state
  or sprite animation to be single located and easily identified.

  Let's say we have Actor X which has different states that need to be shown
  on the game and also a few animations. Namely, its status are 'healthy', 
  'sick' and 'wounded'. The sprite image that has the image to represent each status
  has them on 0/0, 20/0 and 40/0 respectively, to allow them to be easily referenced
  in the code we'll call them 'actor-x-healthy', 'actor-x-sick' and 'actor-x-wounded'.

  'actor-x-healthy' is position  0/0 on image actors/x/states.png
  'actor-x-sick'    is position 20/0 on image actors/x/states.png
  'actor-x-wounded' is position 40/0 on image actors/x/states.png

  Now, sprite image management isn't enforced to be in a specific way so you could 
  have that or maybe separated files for each state:

  'actor-x-healthy' is position 0/0 on image actors/x/healthy-actions.png
  'actor-x-sick'    is position 0/0 on image actors/x/sick-actions.png
  'actor-x-wounded' is position 0/0 on image actors/x/wounded-actions.png

  For that, image position and actual image file are kept in a sub-entity which
  is the ImageMap.Image, while the link between them and an identifier is controlled
  by the actual ImageMap
  """

  ImageMap       = require('image_map').ImagemMap
  ImageMap.Image = require('image_map/image').ImageMap.Image

  image = null
  map   = null 
  
  beforeEach = ->
    image = new ImageMap.Image
      image: 'foo.png'
      id: 'foo'
      position: {x: 1, y: 2}
    map = new ImageMap(image)


  if 'references images by identifier', ->
    expect(map.get('foo')).toEqual(image)


      
