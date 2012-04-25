jQuery(function($) {

	var game = {status: {}};
	game.loop = {fps: 24, paused: false};


	var player = {};

	player.sprite = {};
	player.sprite.positions = {
		"north-walk-right" : 	[-75,  -5],
		"north-walk-left" : 	[-122, -5],
		"north-stand" : 		[-98,  -5],
		"east-walk-right" : 	[-74,  -37],
		"east-walk-left" : 		[-122, -37],
		"east-stand" : 			[-99,  -37],
		"south-walk-right" : 	[-75,  -69],
		"south-walk-left" : 	[-122, -69],
		"south-stand" : 		[-98,  -69],
		"west-walk-right" : 	[-74,  -101],
		"west-walk-left" : 		[-122, -101],
		"west-stand" : 			[-99,  -101]
	};

	player.sprite.animations = {};

	player.sprite.animations.walking = [
		"{{direction}}-walk-right",
		"{{direction}}-stand",
		"{{direction}}-walk-left",
		"{{direction}}-stand"
	];

	player.sprite.animations.standing = [
		"{{direction}}-stand"
	];

	player.sprite.animations.attacking = [
		"{{direction}}-stand"
	];

	player.sprite.render = function() {
		this.html = $("<div>").css({
			"background-image": "url(./playersprite.png)",
			"background-position": this.backgroundPosition
		});

		return this.html;
	};

	player.sprite.collisionBox = collisionBox(point(0, 0), point(20, 30));

	player.sprite.animate = function(frame) {
		var animation = this.animations[player.status.action];

		var frameN = frame.tickFor(animation.length);

		var frameImage = animation[frameN].replace("{{direction}}", player.status.direction);
		var position = this.positions[frameImage];
		var x = position[0], y = position[1];

		this.backgroundPosition = x + "px " + y + "px";

	};

	player.sprite.update = function(frame) {
		if (player.status.action == "walking")
			player.sprite.move(frame);
		if (player.status.action == "attacking")
			player.sprite.attack(frame);
	};

	player.sprite.move = function(frame) {
		walk(this, player.status.direction, Math.ceil(player.speed / frame.fps));
	};

	player.sprite.attack = function(frame) {
		var shot = createProjectile(this.collisionBox.position.plus(point(40, 10)), player.status.direction);
		this.canvas.registerSprite(shot);
		player.status.action = "standing";
	};


	function createProjectile(position, direction) {
		var p = {
			speed: 100,
			direction: direction,
			collisionBox: collisionBox(position, point(5, 5)),
			update: function(frame) {
				p.collisionBox.move(direction.axis, Math.ceil(p.speed / frame.fps));
			},
			collision: function(collision) {
				map.removeSprite(p);
				map.removeSprite(collision.target);
			},
			animate: function() {},
			render: function() {
				return $("<div>").css({
					"background": "blue"
				});
			}
		};

		return p;
	}


	player.speed = 30;
	player.status = {};

	player.status.action = "standing";
	player.status.direction = direction.EAST;

	var map = {};
	map.registeredSprites = [];

	map.registerSprite = function(sprite) {
		this.registeredSprites.push(sprite);
		$(this.html).append(sprite.html);
		sprite.canvas = canvasProxy(this, sprite);
	};

	map.removeSprite = function(sprite) {
		this.registeredSprites = _.without(this.registeredSprites, sprite);
	};

	map.nextTick = function(frame) {
		_.each(this.registeredSprites, function(sprite) {
				sprite.hasOwnProperty("update") ? sprite.update(frame) : null;
		});
		_.each(this.registeredSprites, function(sprite) {
				sprite.hasOwnProperty("collision") ? 
					_.each(map.collisionsFor(sprite), function(c) { sprite.collision(c); })
					: null;
		});
		_.each(this.registeredSprites, function(sprite) {
			sprite.hasOwnProperty("animate") ? sprite.animate(frame) : null;
			return sprite;
		});

		map.render();
	};

	map.collisionsFor = function(requestor) {
		return _.chain(this.registeredSprites)
			.filter(function(sprite) {
				return (
					sprite !== requestor &&
					requestor.collisionBox.collides(sprite.collisionBox)
				);
			})
			.map(function(sprite) { return collision(requestor, sprite); })
			.value();
	};

	map.render = function() {
		var sprites = _.map(this.registeredSprites, function(sprite) {
			return sprite.render().css({
				position: "absolute",
				width:    sprite.collisionBox.width() + "px",
				height:   sprite.collisionBox.height() + "px",
				left:     sprite.collisionBox.axisX() + "px",
				bottom:   sprite.collisionBox.axisY() + "px"
			});
		});

		this.html = $("<div>")
			.css({
				"position": "absolute",
				"width": map.limit.x + "px",
				"height": map.limit.y + "px",
				"border": "1px black solid"
			});
		_.each(sprites, function(html) { html.appendTo(map.html) });
		
		$("#map").empty().append(this.html);
	};

	map.testCollision = function(requestor, position) {
		var wouldBeCollisionBox = collisionBox(position, requestor.collisionBox.size);
		var obj = _.find(this.registeredSprites, function(sprite) {
			return (
				requestor !== sprite 
				&&
				sprite.collisionBox.collides(wouldBeCollisionBox)
			);
		});

		if (!obj) return;

		return collision(requestor, obj);
	};

	var canvasProxy = function(canvas, sprite) {
		return {
			testCollision: function(position) {
				return canvas.testCollision(sprite, position);
			},
			registerSprite: function(sprite) {
				canvas.registerSprite(sprite);
			}
		};
	};

	var sprite = function(collisionBox) {}

	var redBox = function() {
		var randx = Math.floor(Math.random() * map.limit.x);
		var randy = Math.floor(Math.random() * map.limit.y);
		return {
			collisionBox: collisionBox(point(randx, randy), point(20, 20)),
			render: function() {
				return $("<div>").css({"background": "red"});
			}
		};
	}

	map.limit = point(800, 600);

	map.registerSprite(player.sprite)
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	map.registerSprite(redBox());
	
	map.render();

	$(document.body)
		.bind("keydown", function(e) {
			if (e.keyCode < 37 || e.keyCode > 40) return;

			var keycode_direction = {
				"37": direction.WEST,
				"38": direction.NORTH,
				"39": direction.EAST,
				"40": direction.SOUTH
			};

			if (keycode_direction[e.keyCode.toString()]) {
				player.status.direction = keycode_direction[e.keyCode.toString()];
				player.status.action = "walking";
			}
		})
		.bind("keyup", function(e) {
			player.status.action = "standing";
		});

	key("space", function() {
		if (player.status.action != "attacking")
			player.status.action = "attacking";
	});


	game.loop.updateFrame = function() {
		var frame = game.loop.currentFrame ? 
			game.loop.currentFrame.nextFrame()
			: createFrame(0, game.loop.fps);

		game.loop.currentFrame = frame; 
	};

	function createFrame(n, fps) {
		var stage = (n + 1) / fps;
		return {
			n: n, 
			fps: fps,
			nextFrame: function() {
				var m = n + 1 < fps ? n + 1 : 0;
				return createFrame(m, fps);
			},
			tickFor: function(frames) {
				var ticks = fps / frames;

				var tick = _.find(_.range(1, frames), function(i) {
					return n < i * ticks;
				});

				return tick || 0;
			}
		};
	}

	function pauseAfter(n) {
		if (game.loop.currentFrame.n === n - 1) game.loop.paused = true;
	}

	setInterval(function() {
		if (game.loop.paused) return;

		game.loop.updateFrame();
		var frame = game.loop.currentFrame;

		try {
			map.nextTick(frame);
			// pauseAfter(24);
		} catch(e) {
			console.log("crash... pausing")
			game.loop.paused = true;
			throw e;
		}
	}, 1000 / game.loop.fps);
});
