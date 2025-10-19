// --- JAVASCRIPT FILE: js/ui-handler.js ---

const detailPanel = document.getElementById('detail-panel');
const ballGroupElement = document.getElementById('ball-group');

// Detailed project descriptions
const PROJECT_DETAILS = {
    'js': {
        title: 'JavaScript Engine',
        desc: 'Built custom, high-performance engines and logic flows. Expertise in **ES6+**, asynchronous patterns, and code optimization.',
        skills: 'Proficiency: 95%'
    },
    'css': {
        title: 'CSS/SVG Maestro',
        desc: 'Mastery of **CSS 3D transforms** and **SVG filters** (like the one used here!) for fluid, accessible, and 60fps UI/UX design.',
        skills: 'Proficiency: 90%'
    },
    'react': {
        title: 'React Architecture',
        desc: 'Developed large-scale applications focusing on **component modularity**, state management, and efficient rendering strategies.',
        skills: 'Proficiency: 85%'
    },
    'node': {
        title: 'Node.js Backend',
        desc: 'Experience in building scalable microservices and RESTful APIs, focusing on security and performance on the server-side.',
        skills: 'Proficiency: 70%'
    },
    'ui': {
        title: 'UI/UX Design',
        desc: 'Translating complex requirements into intuitive, minimalist user interfaces following modern design principles (Google Material / Apple Human Interface).',
        skills: 'Proficiency: 80%'
    }
};

/**
 * Event delegation to handle clicks on the fluid balls.
 */
ballGroupElement.addEventListener('click', (e) => {
    const targetCircle = e.target.closest('circle');
    
    if (targetCircle) {
        const id = targetCircle.getAttribute('data-detail-id');
        const data = PROJECT_DETAILS[id];

        // Update and show the detail panel
        detailPanel.innerHTML = `
            <h2 style="color: #88ccee;">${data.title}</h2>
            <p>${data.desc}</p>
            <p style="font-weight: 700; margin-top: 10px;">${data.skills}</p>
            <p style="font-size: 0.8em; color: #ccc; margin-top: 15px;">Click anywhere outside to dismiss.</p>
        `;
        detailPanel.classList.remove('hidden');
    }
});

/**
 * Hide the detail panel when the user clicks away.
 */
document.body.addEventListener('click', (e) => {
    // Hide the panel if the click is not on the panel itself and not on a circle
    if (!detailPanel.contains(e.target) && !e.target.closest('circle')) {
        detailPanel.classList.add('hidden');
    }
});
