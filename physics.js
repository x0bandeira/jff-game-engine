var axis = {X: "X", Y: "Y"}

var direction = function(axis, mod, name) {
	var d = new Direction;
	d.axis = axis;
	d.mod  = mod;
	d.name = name;
	return d;
};

function Direction() {};

Direction.prototype.isAxisX = function() {
	return this.axis === axis.X;
};

Direction.prototype.isAxisY = function() {
	return this.axis === axis.Y;
};

Direction.prototype.toString = function() {
	return this.name;
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

function Point() {};

Point.prototype.equal = function(b) {
	var a = this;
	return a.x == b.x && a.y == b.y;
};

Point.prototype.plus = function(b) {
	var a = this;
	return point(a.x + b.x, a.y + b.y);
};

Point.prototype.moved = function(_axis, amount) {
	var a = this;
	return point(_axis === axis.X ? a.x + amount : a.x,
				 _axis === axis.Y ? a.y + amount : a.y);
};

var collisionBox = function(position, size) {
	var cb = new CollisionBox;
	cb.position = position;
	cb.size = size;
	return cb;
};

function CollisionBox() {};

CollisionBox.prototype.width  = function() { return this.size.x; }
CollisionBox.prototype.height = function() { return this.size.y; }
CollisionBox.prototype.axisX  = function() { return this.position.x; }
CollisionBox.prototype.axisY  = function() { return this.position.y; }
CollisionBox.prototype.boundariesX = function() { return this.axisX() + this.width(); } 
CollisionBox.prototype.boundariesY = function() { return this.axisY() + this.height(); } 

CollisionBox.prototype.collides = function(collisionBox) {
	var a = this, b = collisionBox;
	return (
		(a.boundariesX() >= b.axisX())
		&&
		(a.axisX() <= b.boundariesX())
		&&
		(a.boundariesY() >= b.axisY())
		&&
		(a.axisY() <= b.boundariesY())
	);
};

CollisionBox.prototype.distanceX = function(collisionBox) {
	var a = this, b = collisionBox;
	if (a.boundariesX() < b.axisX()) return b.axisX() - a.boundariesX();
	if (b.boundariesX() < a.axisX()) return a.axisX() - b.boundariesX();
	return 0;
};

CollisionBox.prototype.distanceY = function(collisionBox) {
	var a = this, b = collisionBox;
	if (a.boundariesY() < b.axisY()) return b.axisY() - a.boundariesY();
	if (b.boundariesY() < a.axisY()) return a.axisY() - b.boundariesY();
	return 0;
};

CollisionBox.prototype.move = function(axis, amount) {
	this.position = this.position.moved(axis, amount);
};

var collision = function(offender, target) {
	var c = new Collision;
	c.offender = offender;
	c.target = target;
	return c;
};

function Collision() {}

Collision.prototype.distanceX = function() {
	return this.offender.collisionBox.distanceX(this.target.collisionBox);
};

Collision.prototype.distanceY = function() {
	return this.offender.collisionBox.distanceY(this.target.collisionBox);
};

Collision.prototype.collidingOnX = function() {
	return _.include(this.collidingAxis(), axis.X);
};

Collision.prototype.collidingOnY = function() {
	return _.include(this.collidingAxis(), axis.Y);
};

Collision.prototype.collidingAxis = function() {
	var a = [];
	if (this.distanceX() <= 0) a.push(axis.X);
	if (this.distanceY() <= 0) a.push(axis.Y);
	return a;
};

