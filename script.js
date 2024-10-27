
const fireworksCanvas = document.getElementById('fireworks');
const fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

const rangoliCanvas = document.getElementById('rangoli');
const rangoliCtx = rangoliCanvas.getContext('2d');
rangoliCanvas.width = window.innerWidth;
rangoliCanvas.height = window.innerHeight;

const fireworks = [];
const particles = [];
const diyas = [];

let soundEnabled = false;

// Firework, Particle, and Diya classes remain the same

// Animation loop
function animate() {
    fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw(fireworksCtx);

        if (fireworks[i].size <= 0.1) {
            createParticles(fireworks[i].x, fireworks[i].y, fireworks[i].color);
            fireworks.splice(i, 1);
            i--;
            if (soundEnabled) playSound();
        }
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(fireworksCtx);

        if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }

    for (let diya of diyas) {
        diya.update();
        diya.draw(fireworksCtx);
    }

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    requestAnimationFrame(animate);
}

// Other functions remain the same

// Countdown timer
const countdownElement = document.getElementById('countdown');
const diwaliDate = new Date('November 12, 2023 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = diwaliDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `Countdown to Diwali: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownTimer);
        countdownElement.innerHTML = "Happy Diwali!";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Rangoli
function drawRangoli(x, y) {
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#FF3333', '#33FF33'];
    const size = 20;

    rangoliCtx.beginPath();
    rangoliCtx.arc(x, y, size, 0, Math.PI * 2);
    rangoliCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    rangoliCtx.fill();
}

rangoliCanvas.addEventListener('mousemove', (e) => {
    drawRangoli(e.clientX, e.clientY);
});

// Greeting messages
const greetingElement = document.getElementById('greeting');
const greetings = [
    'शुभ दीपावली! (Hindi)',
    'ದೀಪಾವಳಿಯ ಶುಭಾಶಯಗಳು! (Kannada)',
    'दीपावलीच्या हार्दिक शुभेच्छा! (Marathi)',
    'தீபாவளி நல்வாழ்த்துக்கள்! (Tamil)',
    'దీపావళి శుభాకాంక్షలు! (Telugu)',
    'Happy Diwali! (English)'
];

function changeGreeting() {
    greetingElement.textContent = greetings[Math.floor(Math.random() * greetings.length)];
}

setInterval(changeGreeting, 5000);

// Start animation
animate();
changeGreeting();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    rangoliCanvas.width = window.innerWidth;
    rangoliCanvas.height = window.innerHeight;
});
