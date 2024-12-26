const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const interactiveStars = [];
const backgroundStars = [];
const connections = [];
let currentConnection = 0;
let progress = 0;

// Helper function to generate a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Star creation
function createStar(x, y, size, twinkleSpeed) {
    return {
        x,
        y,
        size,
        opacity: random(0.3, 0.8),
        twinkleSpeed
    };
}

function addInteractiveStar(x, y, message) {
    interactiveStars.push({
        ...createStar(x, y, 6, random(0.002, 0.005)), // Larger interactive stars with slower twinkle
        interactive: true,
        message
    });
}

function addBackgroundStar(x, y) {
    backgroundStars.push(createStar(x, y, random(1, 2), random(0.005, 0.01))); // Smaller background stars with faster twinkle
}

// Randomize stars
function randomizeInteractiveStars(count = 15) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const message = `Message for star ${i + 1}`;
        addInteractiveStar(x, y, message);
    }
}

function randomizeBackgroundStars(count = 100) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        addBackgroundStar(x, y);
    }
}

// Connect stars
function connectStars() {
    connections.length = 0;
    for (let i = 0; i < interactiveStars.length; i++) {
        const start = interactiveStars[i];
        const end = interactiveStars[(i + 1) % interactiveStars.length]; // Loop back to the first star
        connections.push([start, end]);
    }
}

// Draw stars with twinkle effect
function drawStars(stars) {
    stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
            star.twinkleSpeed *= -1; // Reverse direction
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
}

// Animate connections with "connect-the-dots" effect
function drawConnections() {
    if (connections.length > 0) {
        const [start, end] = connections[currentConnection];

        // Interpolate the line based on progress
        const x = start.x + (end.x - start.x) * progress;
        const y = start.y + (end.y - start.y) * progress;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Update progress
        progress += 0.002; // Slow down the tracing effect
        if (progress >= 1) {
            progress = 0; // Reset progress
            currentConnection = (currentConnection + 1) % connections.length; // Move to the next connection
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars(backgroundStars); // Draw twinkling background stars
    drawConnections(); // Draw connecting lines
    drawStars(interactiveStars); // Draw twinkling interactive stars

    requestAnimationFrame(animate);
}

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    connectStars();
});

// Initialization
randomizeInteractiveStars();
randomizeBackgroundStars();
connectStars();
animate();
