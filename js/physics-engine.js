// --- JAVASCRIPT FILE: js/physics-engine.js ---

// Data structure for skill/project metaballs
const BALL_DATA = [
    { id: 'js-ball', radius: 45, x: 200, y: 300, vx: 0.5, vy: -0.2, title: 'JavaScript Engine', detailId: 'js' },
    { id: 'css-ball', radius: 55, x: 700, y: 500, vx: -0.4, vy: 0.3, title: 'CSS/SVG Maestro', detailId: 'css' },
    { id: 'react-ball', radius: 50, x: 500, y: 200, vx: 0.3, vy: 0.4, title: 'React Architecture', detailId: 'react' },
    { id: 'node-ball', radius: 65, x: 300, y: 700, vx: -0.2, vy: -0.5, title: 'Node.js Backend', detailId: 'node' },
    { id: 'ui-ball', radius: 40, x: 900, y: 150, vx: 0.6, vy: 0.1, title: 'UI/UX Design', detailId: 'ui' }
];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const DAMPING = 0.985;   // Very subtle damping for fluid look
const REPEL_FORCE = 0.8; // Stronger force for noticeable interaction
const MAX_SPEED = 3;     

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/**
 * The main physics update loop.
 */
function updatePhysics() {
    const W = window.innerWidth;
    const H = window.innerHeight;

    BALL_DATA.forEach(ball => {
        ball.vx *= DAMPING;
        ball.vy *= DAMPING;

        // Mouse Repulsion Calculation
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) { // Increased repulsion zone
            const angle = Math.atan2(dy, dx);
            const force = (250 - distance) / 250 * REPEL_FORCE; 

            ball.vx += Math.cos(angle) * force;
            ball.vy += Math.sin(angle) * force;
        }

        // Limit Speed
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (speed > MAX_SPEED) {
            ball.vx = (ball.vx / speed) * MAX_SPEED;
            ball.vy = (ball.vy / speed) * MAX_SPEED;
        }

        // Update Position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Boundary Collision (Bounce)
        if (ball.x + ball.radius > W || ball.x - ball.radius < 0) {
            ball.vx *= -1;
            ball.x = Math.max(ball.radius, Math.min(W - ball.radius, ball.x));
        }
        if (ball.y + ball.radius > H || ball.y - ball.radius < 0) {
            ball.vy *= -1;
            ball.y = Math.max(ball.radius, Math.min(H - ball.radius, ball.y));
        }
    });

    requestAnimationFrame(updatePhysics);
}

updatePhysics();
