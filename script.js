// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    
    // Update Icon
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Theme from LocalStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') icon.classList.replace('fa-moon', 'fa-sun');
}

// Responsive scroll event handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Interactive Hero Section - Typing Effect
const names = ['Faisal suleiman guye', 'a Developer', 'an Innovator', 'a Problem Solver'];
const roles = [
    'Software Engineer | Creative Problem Solver',
    'Building amazing web experiences',
    'Turning ideas into reality',
    'Full-stack development specialist'
];

let currentNameIndex = 0;
let currentRoleIndex = 0;
let isTyping = true;

function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = '';
        
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

async function animateHero() {
    const typingElement = document.querySelector('.typing-effect');
    const roleElement = document.getElementById('role-text');
    
    if (!typingElement || !roleElement) return;

    while (true) {
        // Type name
        await typeText(typingElement, names[currentNameIndex], 60);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Delete name
        while (typingElement.textContent.length > 0) {
            typingElement.textContent = typingElement.textContent.slice(0, -1);
            await new Promise(resolve => setTimeout(resolve, 40));
        }

        // Change role text
        currentNameIndex = (currentNameIndex + 1) % names.length;
        roleElement.style.opacity = '0';
        roleElement.style.transition = 'opacity 0.3s ease';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleElement.textContent = roles[currentRoleIndex];
        
        roleElement.style.opacity = '1';
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Start animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateHero);
} else {
    animateHero();
}