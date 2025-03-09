class Particle {
  constructor(x, y, directionX, directionY, size, color, ctx) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(canvas) {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initParticles(canvas, ctx, numberOfParticles) {
  const particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const directionX = Math.random() * 0.4 - 0.2;
    const directionY = Math.random() * 0.4 - 0.2;
    const color = "#b56fc76b";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color, ctx)
    );
  }
  return particlesArray;
}

function animateParticles(canvas, ctx, particlesArray) {
  requestAnimationFrame(() => animateParticles(canvas, ctx, particlesArray));
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update(canvas);
  });
}

function addBackgroundAnimation(containerId, numberOfParticles = 100) {
  const container = document.getElementById(containerId);
  const canvas = document.createElement("canvas");
  canvas.id = "backgroundCanvas"; // Set the id for the canvas
  container.appendChild(canvas); // Append canvas to the container
  const ctx = canvas.getContext("2d");

  // Ensure the canvas covers the entire container
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  const particlesArray = initParticles(canvas, ctx, numberOfParticles);

  window.addEventListener("resize", () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    particlesArray.length = 0;
    particlesArray.push(...initParticles(canvas, ctx, numberOfParticles));
  });

  animateParticles(canvas, ctx, particlesArray);
}
