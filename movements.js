
var walk = function(sprite, direction, speed) {
	var adjustedPosition = sprite.collisionBox.position.moved(direction.axis, speed * direction.mod);
	var collision = sprite.canvas.testCollision(adjustedPosition);

	if (collision) {
		speed = (direction.isAxisX() ? collision.distanceX() : collision.distanceY()) - 1; // ugh!
		adjustedPosition = sprite.collisionBox.position.moved(direction.axis, speed * direction.mod);
	}

	sprite.collisionBox.position = adjustedPosition;
};
