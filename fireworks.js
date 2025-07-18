const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 9999;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const fireworks = [];
const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor(x, y) {
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.targetX = x;
    this.targetY = y;
    this.speed = 3;
    this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.distanceToTarget = Math.hypot(this.targetX - this.x, this.targetY - this.y);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.brightness = random(50, 80);
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.x += vx;
    this.y += vy;
    this.distanceTraveled = Math.hypot(this.targetX - this.x, this.targetY - this.y);

    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.targetX, this.targetY);
      fireworks.splice(index, 1);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0],
               this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(${Math.floor(random(0, 360))}, 100%, ${this.brightness}%)`;
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    this.friction = 0.95;
    this.gravity = 1;
    this.hue = random(0, 360);
    this.brightness = random(50, 80);
    this.alpha = 1;
    this.decay = random(0.01, 0.03);
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;

    if (this.alpha <= 0) {
      particles.splice(index, 1);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0],
               this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
  }
}

function createParticles(x, y) {
  let particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

function loop() {
  requestAnimationFrame(loop);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].draw();
    particles[i].update(i);
  }
}

function triggerFirework(x = Math.random() * canvas.width, y = Math.random() * canvas.height / 2) {
  fireworks.push(new Firework(x, y));
}

setInterval(() => {
  triggerFirework();
}, 800);

loop();
