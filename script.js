const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const playButton = document.querySelector('.play-button');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Paddle {
	constructor({ position }) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 0
		};
		this.width = 10;
		this.height = 200;
	}

	draw() {
		c.fillStyle = 'white';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();

		if (
			this.position.y + this.velocity.y > 0 &&
			this.position.y + this.height + this.velocity.y < canvas.height
		)
			this.position.y += this.velocity.y;
	}
}

class Ball {
	constructor({ position }) {
		this.position = position;

		this.ballSpeed = 4.5;

		const direction = {
			x: Math.random() - 0.5 >= 0 ? -this.ballSpeed : this.ballSpeed,
			y: Math.random() - 0.5 >= 0 ? -this.ballSpeed : this.ballSpeed
		};
		this.velocity = {
			x: direction.x,
			y: direction.y
		};
		this.width = 20;
		this.height = 20;
	}

	draw() {
		c.fillStyle = 'white';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		const rightSide = this.position.x + this.width + this.velocity.x;
		const leftSide = this.position.x + this.velocity.x;
		const bottomSide = this.position.y + this.height;
		const topSide = this.position.y;

		// Paddle1 Collisions
		if (
			leftSide <= paddle1.position.x + paddle1.width &&
			bottomSide >= paddle1.position.y &&
			topSide <= paddle1.position.y + paddle1.height
		) {
			this.velocity.x = -this.velocity.x;
		}

		// Paddle2 Collisions
		if (
			rightSide >= paddle2.position.x &&
			bottomSide >= paddle2.position.y &&
			topSide <= paddle2.position.y + paddle2.height
		) {
			this.velocity.x = -this.velocity.x;
		}

		// Reverse and directions
		if (
			this.position.y + this.height + this.velocity.y >= canvas.height ||
			this.position.y + this.velocity.y <= 0
		) {
			this.velocity.y = -this.velocity.y;
		}

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

const paddle1 = new Paddle({
	position: {
		x: 10,
		y: 100
	}
});

const paddle2 = new Paddle({
	position: {
		x: canvas.width - 10 * 2,
		y: 100
	}
});

const ball = new Ball({
	position: {
		x: canvas.width / 2,
		y: canvas.height / 2
	}
});

const animate = () => {
	requestAnimationFrame(animate);

	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);

	paddle1.update();
	paddle2.update();

	ball.update();
};

addEventListener('keydown', (e) => {
	const paddleSpeed = 6;
	switch (e.key) {
		case 'w':
			// Go up
			paddle1.velocity.y = -paddleSpeed;
			break;
		case 's':
			paddle1.velocity.y = paddleSpeed;
			// Go down
			break;
		case 'W':
			paddle1.velocity.y = -paddleSpeed;
			// Go up
			break;
		case 'S':
			paddle1.velocity.y = paddleSpeed;
			// Go down
			break;
		case 'ArrowUp':
			paddle2.velocity.y = -paddleSpeed;
			// Go up
			break;
		case 'ArrowDown':
			paddle2.velocity.y = paddleSpeed;
			// Go down
			break;
	}
});

playButton.addEventListener('click', () => {
	animate();
	playButton.classList.add('hide');
});
