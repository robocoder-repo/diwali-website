
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];
const diyas = [];

let soundEnabled = false;

// Firework class
class Firework {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 3;
        this.size = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.sx;
        this.y += this.sy;
        if (this.size > 0.1) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Particle class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Diya class
class Diya {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 5;
        this.angle = 0;
    }

    update() {
        this.angle += 0.02;
        this.y += Math.sin(this.angle) * 0.5;
    }

    draw() {
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].size <= 0.1) {
            createParticles(fireworks[i].x, fireworks[i].y, fireworks[i].color);
            fireworks.splice(i, 1);
            i--;
            if (soundEnabled) playSound();
        }
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }

    for (let diya of diyas) {
        diya.update();
        diya.draw();
    }

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    requestAnimationFrame(animate);
}

function createParticles(x, y, color) {
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Sound effect
const audio = new Audio('https://www.soundjay.com/mechanical/sounds/firework-explosion-1.mp3');

function playSound() {
    audio.currentTime = 0;
    audio.play();
}

// Create fireworks on click
canvas.addEventListener('click', (e) => {
    fireworks.push(new Firework(e.clientX, e.clientY));
});

// Toggle sound
const soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
});

// Create diyas
for (let i = 0; i < 10; i++) {
    diyas.push(new Diya());
}

// Start animation
animate();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
