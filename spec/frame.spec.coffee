describe 'Frame', ->
  Frame = require('../src/frame').Frame

  it 'generates next frame', ->
    a = new Frame(1, 2)
    expect(a.next()).toEqual(new Frame 2, 2)

  it 'resets next frame when last frame', ->
    a = new Frame(2, 2)
    expect(a.next()).toEqual(new Frame 1, 2)

  it 'keeps reference to 0 based index', ->
    a = new Frame(1, 24)
    expect(a.index).toEqual(0)

  it 'finds relative frame', ->
    a = new Frame(1, 24)
    expect(a.adjustedFor 4).toEqual(new Frame 1, 4)

    b = new Frame(7, 24)
    expect(b.adjustedFor 4).toEqual(new Frame 2, 4)

    c = new Frame(15, 24)
    expect(c.adjustedFor 4).toEqual(new Frame 3, 4)

    d = new Frame(20, 24)
    expect(d.adjustedFor 4).toEqual(new Frame 4, 4)

