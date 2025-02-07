document.addEventListener("DOMContentLoaded", () => {
  const redEnvelope = document.getElementById("red-envelope");
  const card = document.getElementById("card");
  const verseText = document.getElementById("verse-text");
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  let fireworks = [];
  const fireworksSound = document.getElementById("fireworks-sound");

  redEnvelope.addEventListener("click", () => {
    redEnvelope.style.transition = "transform 0.6s";
    redEnvelope.style.transform = "translateY(-50px) scale(1.2)";
    fireworksSound.play();
    setTimeout(() => {
      redEnvelope.style.display = "none";
      showFireworks();
      setTimeout(() => {
        card.classList.remove("hidden");
        card.style.opacity = 1;
        fetchVerse();
      }, 1500);
    }, 600);
  });

  function fetchVerse() {
    fetch("verses.json")
      .then(response => response.json())
      .then(data => {
        const randomVerse = data[Math.floor(Math.random() * data.length)];
        verseText.innerHTML = randomVerse;
      })
      .catch(error => console.error("Error loading verses:", error));
  }

  function showFireworks() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
      fireworks.push(new Firework());
    }
    animateFireworks();
  }

  function animateFireworks() {
    if (fireworks.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks = fireworks.filter(firework => firework.alpha > 0);
      fireworks.forEach(firework => {
        firework.update();
        firework.draw();
      });
      requestAnimationFrame(animateFireworks);
    }
  }

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.size = Math.random() * 3 + 2;
      this.alpha = 1;
      this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    }

    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.01;
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
});
