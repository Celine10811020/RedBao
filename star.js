const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

let shootingStars = [];

class ShootingStar {
  constructor() {
    this.x = Math.random() * starsCanvas.width;
    this.y = Math.random() * starsCanvas.height * 0.5; // 流星從上半部開始
    this.length = Math.random() * 80 + 50;
    this.speed = Math.random() * 5 + 2;
    this.opacity = 1;
  }

  update() {
    this.x -= this.speed;
    this.y += this.speed;
    this.opacity -= 0.02;
  }

  draw() {
    starsCtx.beginPath();
    starsCtx.moveTo(this.x, this.y);
    starsCtx.lineTo(this.x + this.length, this.y - this.length);
    starsCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    starsCtx.lineWidth = 2;
    starsCtx.stroke();
  }
}

function createStars() {
  if (Math.random() < 0.05) { // 控制流星數量
    shootingStars.push(new ShootingStar());
  }

  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  shootingStars = shootingStars.filter(star => star.opacity > 0);

  shootingStars.forEach(star => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(createStars);
}

createStars();
