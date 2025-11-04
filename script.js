// ========================================
// DUMBBELL CURSOR EFFECT
// ========================================
const cursorDumbbell = document.querySelector('.cursor-dumbbell');

let mouseX = 0, mouseY = 0;
let dumbbellX = 0, dumbbellY = 0;
let rotation = 0;
let targetRotation = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Calculate rotation based on movement direction
    const deltaX = mouseX - lastMouseX;
    const deltaY = mouseY - lastMouseY;

    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

// Animate dumbbell cursor
function animateDumbbell() {
    // Smooth follow
    const distX = mouseX - dumbbellX;
    const distY = mouseY - dumbbellY;

    dumbbellX += distX * 0.2;
    dumbbellY += distY * 0.2;

    // Smooth rotation
    let rotDiff = targetRotation - rotation;
    if (rotDiff > 180) rotDiff -= 360;
    if (rotDiff < -180) rotDiff += 360;
    rotation += rotDiff * 0.15;

    cursorDumbbell.style.left = dumbbellX + 'px';
    cursorDumbbell.style.top = dumbbellY + 'px';
    cursorDumbbell.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    requestAnimationFrame(animateDumbbell);
}
animateDumbbell();

// Click effect - dumbbell lifts
document.addEventListener('mousedown', () => {
    cursorDumbbell.classList.add('lifting');

    // Create energy burst
    createEnergyBurst(mouseX, mouseY);
});

document.addEventListener('mouseup', () => {
    cursorDumbbell.classList.remove('lifting');
});

// Energy burst on click
function createEnergyBurst(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 600);
    }
}

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .program-card, .trainer-card, .pricing-card, input, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDumbbell.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorDumbbell.classList.remove('hover');
    });
});

// ========================================
// PARTICLE ANIMATION
// ========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

// Get theme colors dynamically
function getThemeColor() {
    const root = document.documentElement;
    const primaryRgb = getComputedStyle(root).getPropertyValue('--primary-rgb').trim();
    return primaryRgb || '255, 215, 0'; // fallback to gold
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        const color = getThemeColor();
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect particles
    const color = getThemeColor();
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - distance / 120)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    document.querySelectorAll('.parallax-image').forEach(img => {
        const speed = img.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        img.style.transform = `translateY(${yPos}px)`;
    });
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target + '+';
    }
};

// ========================================
// GSAP SCROLL ANIMATIONS
// ========================================
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-title', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power4.out'
});

gsap.from('.hero .btn', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.6,
    ease: 'power4.out'
});

// Section Titles Animation
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
});

// About Section Animation
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-image',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
});

// Stats Counter Animation with GSAP
gsap.utils.toArray('.stat-item').forEach((stat, index) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                const counter = stat.querySelector('.counter');
                if (counter && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: 'back.out(1.7)'
    });
});

// Program Cards Animation
gsap.utils.toArray('.program-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Trainer Cards Animation
gsap.utils.toArray('.trainer-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        delay: index * 0.15,
        ease: 'back.out(1.7)'
    });
});

// Pricing Cards Animation
gsap.utils.toArray('.pricing-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        rotation: index === 1 ? 0 : (index === 0 ? -5 : 5),
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Gallery Items Animation
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.5,
        opacity: 0,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// CTA Banner Animation
gsap.from('.cta-content h2', {
    scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    scale: 0.5,
    opacity: 0,
    ease: 'back.out(1.7)'
});

gsap.from('.cta-content p', {
    scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.cta-content .btn', {
    scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    scale: 0,
    opacity: 0,
    delay: 0.6,
    ease: 'elastic.out(1, 0.5)'
});

// Features Section Animation
gsap.utils.toArray('.feature-box').forEach((box, index) => {
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// Contact Section Animation
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
});

// Navbar Animation on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to('.navbar', { y: -100, duration: 0.3 });
    } else {
        gsap.to('.navbar', { y: 0, duration: 0.3 });
    }

    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL
// ========================================
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

// ========================================
// TEXT REVEAL ON SCROLL
// ========================================
const revealElements = document.querySelectorAll('.section-title, .hero-title');
revealElements.forEach(el => {
    el.classList.add('reveal');
});

window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
});

// ========================================
// RIPPLE EFFECT ON CLICK
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


// ========================================
// SCROLL PROGRESS BAR
// ========================================
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});


// ========================================
// THEME SWITCHER
// ========================================
const themeToggle = document.getElementById('themeToggle');
const themeDropdown = document.getElementById('themeDropdown');
const themeOptions = document.querySelectorAll('.theme-option');

// Load saved theme
const savedTheme = localStorage.getItem('fitzone-theme') || 'gold';
document.documentElement.setAttribute('data-theme', savedTheme);
updateActiveTheme(savedTheme);

// Toggle dropdown
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!themeDropdown.contains(e.target) && !themeToggle.contains(e.target)) {
        themeDropdown.classList.remove('active');
    }
});

// Theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.dataset.theme;

        // Smooth transition
        document.body.style.transition = 'background-color 0.3s ease';

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('fitzone-theme', theme);
        updateActiveTheme(theme);

        // Close dropdown
        setTimeout(() => {
            themeDropdown.classList.remove('active');
        }, 300);
    });
});

function updateActiveTheme(theme) {
    themeOptions.forEach(option => {
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Keyboard shortcut (T key)
document.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
        if (!themeDropdown.classList.contains('active')) {
            themeToggle.click();
        }
    }
    if (e.key === 'Escape' && themeDropdown.classList.contains('active')) {
        themeDropdown.classList.remove('active');
    }
});


// ========================================
// PROGRAM CARDS DROPDOWN
// ========================================
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('click', function () {
        // Close other cards
        document.querySelectorAll('.program-card').forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.classList.remove('expanded');
            }
        });

        // Toggle current card
        this.classList.toggle('expanded');
    });
});


// ========================================
// HERO BACKGROUND SLIDESHOW
// ========================================
const heroBgs = document.querySelectorAll('.hero-bg');
let currentBg = 0;

function changeHeroBackground() {
    // Remove active class from current
    heroBgs[currentBg].classList.remove('active');

    // Move to next background
    currentBg = (currentBg + 1) % heroBgs.length;

    // Add active class to next
    heroBgs[currentBg].classList.add('active');
}

// Change background every 5 seconds
setInterval(changeHeroBackground, 5000);


// ========================================
// WHATSAPP CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const phone = document.getElementById('userPhone').value;
        const message = document.getElementById('userMessage').value;

        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Phone:* ${encodeURIComponent(phone)}%0A` +
            `*Message:* ${encodeURIComponent(message)}`;

        // Replace with your WhatsApp number (include country code without + or spaces)
        // Example: For +1 234 567 8900, use 12345678900
        const whatsappNumber = '9948318650'; // CHANGE THIS TO YOUR WHATSAPP NUMBER

        // Open WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');

        // Reset form
        contactForm.reset();

        // Optional: Show success message
        alert('Redirecting to WhatsApp...');
    });
}
