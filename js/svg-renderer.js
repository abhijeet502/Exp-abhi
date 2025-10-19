// --- JAVASCRIPT FILE: js/svg-renderer.js ---

const ballGroup = document.getElementById('ball-group');
const SVG_NS = 'http://www.w3.org/2000/svg'; 

/**
 * Creates the initial SVG circles based on the data in physics-engine.js
 */
function initializeBalls() {
    // Check if BALL_DATA is available (defined in physics-engine.js)
    if (typeof BALL_DATA === 'undefined') {
        console.error("BALL_DATA not found. Check if physics-engine.js is loaded first.");
        return;
    }
    
    BALL_DATA.forEach(ball => {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', ball.radius);
        circle.setAttribute('fill', '#88ccee'); // Primary Accent Fill (will be filtered)
        circle.setAttribute('id', ball.id);
        
        // Custom data attributes for the UI Handler
        circle.setAttribute('data-title', ball.title); 
        circle.setAttribute('data-detail-id', ball.detailId); 

        ballGroup.appendChild(circle);
    });
}

/**
 * The main rendering loop that updates the SVG positions based on physics data.
 */
function renderSVG() {
    BALL_DATA.forEach(ball => {
        const circle = document.getElementById(ball.id);
        if (circle) {
            circle.setAttribute('cx', ball.x);
            circle.setAttribute('cy', ball.y);
        }
    });

    requestAnimationFrame(renderSVG);
}

initializeBalls();
renderSVG();
