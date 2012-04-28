var axis = {
  X: new Axis("X"), 
  Y: new Axis("Y")
}

var direction = function(axis, mod, name) {
	var d = new Direction;
	d.axis = axis;
	d.mod  = mod;
	d.name = name;
	return d;
};

direction.NORTH = direction(axis.Y, +1, "north");
direction.SOUTH = direction(axis.Y, -1, "south");
direction.EAST  = direction(axis.X, +1, "east"); 
direction.WEST  = direction(axis.X, -1, "west");

var point = function(x, y) {
	p = new Point;
	p.x = x;
	p.y = y;
	return p;
};

var collisionBox = function(position, size) {
	var cb = new CollisionBox;
	cb.position = position;
	cb.size = size;
	return cb;
};

var collision = function(offender, target) {
	var c = new Collision;
	c.offender = offender;
	c.target = target;
	return c;
};

