// ===================================
// DigitalDairy786 Portfolio - Quantum Theme
// Interactive Features & Animations
// ===================================

// Utility Functions
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Particle System
// ===================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = this.getParticleCount();
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', debounce(() => this.resize(), 250));
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }
    
    getParticleCount() {
        const width = window.innerWidth;
        if (width > 1200) return 100;
        if (width > 768) return 60;
        return 30;
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particleCount = this.getParticleCount();
        this.init();
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            this.particles.push({ x, y, size, speedX, speedY });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Move particle
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around screen
            if (p.x > this.canvas.width) p.x = 0;
            else if (p.x < 0) p.x = this.canvas.width;
            if (p.y > this.canvas.height) p.y = 0;
            else if (p.y < 0) p.y = this.canvas.height;
            
            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 2;
                    p.y -= Math.sin(angle) * force * 2;
                }
            }
            
            // Draw particle
            this.ctx.fillStyle = 'rgba(0, 242, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Connect nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance / 120})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Navigation
// ===================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Hamburger menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }
        
        // Close menu when clicking on link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.hamburger) {
                    this.hamburger.classList.remove('active');
                }
                if (this.navMenu) {
                    this.navMenu.classList.remove('active');
                }
            });
        });
        
        // Smooth scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Active link on scroll
        window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 100));
        
        // Navbar background on scroll
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                this.navbar.style.background = 'rgba(10,25,47,0.95)';
            } else {
                this.navbar.style.background = 'rgba(10,25,47,0.9)';
            }
        }, 100));
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }
}

// ===================================
// Typewriter Effect
// ===================================
class Typewriter {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===================================
// Counter Animation
// ===================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = new Set();
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.5 }
        );
        
        this.init();
    }
    
    init() {
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated.has(entry.target)) {
                this.animated.add(entry.target);
                this.animateCounter(entry.target);
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
}

// ===================================
// Skill Bar Animation
// ===================================
class SkillBarAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = new Set();
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.3 }
        );
        
        this.init();
    }
    
    init() {
        this.skillBars.forEach(bar => {
            this.observer.observe(bar);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated.has(entry.target)) {
                this.animated.add(entry.target);
                this.animateBar(entry.target);
            }
        });
    }
    
    animateBar(bar) {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll(
            '.service-card, .project-card, .skill-category, .contact-card, .about-image, .about-text'
        );
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// ===================================
// Contact Form
// ===================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        });
    }
    
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// ===================================
// Smooth Scroll to Top
// ===================================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00f2ff, #ff00ff);
        color: #0a192f;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.25rem;
        box-shadow: 0 4px 8px rgba(0,242,255,0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollBtn.style.boxShadow = '0 8px 16px rgba(0,242,255,0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
        scrollBtn.style.boxShadow = '0 4px 8px rgba(0,242,255,0.3)';
    });
}

// ===================================
// Loading Animation
// ===================================
function createLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a192f;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(0,242,255,0.1);
                border-top: 4px solid #00f2ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="
                color: #00f2ff;
                font-family: 'Orbitron', sans-serif;
                font-size: 1.25rem;
            ">Loading Quantum Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// DNA Helix Animation
// ===================================
class DNAHelix {
    constructor() {
        this.container = document.querySelector('.dna-helix');
        if (!this.container) return;
        
        this.createHelix();
    }
    
    createHelix() {
        const numParticles = 20;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(0,242,255,0.6);
                border-radius: 50%;
                animation: helixMove ${3 + i * 0.1}s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px rgba(0,242,255,0.8);
            `;
            this.container.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes helixMove {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(0) translateX(20px); }
                75% { transform: translateY(20px) translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Console Message
// ===================================
function consoleMessage() {
    const styles = {
        title: 'color: #00f2ff; font-size: 24px; font-weight: bold;',
        subtitle: 'color: #ff00ff; font-size: 16px; font-weight: bold;',
        text: 'color: #b8c1ec; font-size: 14px;',
        link: 'color: #ffff00; font-size: 14px;'
    };
    
    console.log('%c👋 السلام علیکم! Welcome to DigitalDairy786', styles.title);
    console.log('%c⚛️ Quantum Portfolio System Active', styles.subtitle);
    console.log('%cInterested in the code? Check out my GitHub!', styles.text);
    console.log('%c🔗 https://github.com/ranag786tech-lang', styles.link);
    console.log('%c💼 Let\'s work together!', styles.subtitle);
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    createLoadingAnimation();
    
    // Initialize particle system
    new ParticleSystem('particleCanvas');
    
    // Initialize navigation
    new Navigation();
    
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        new Typewriter(
            typewriterElement,
            [
                'Creator & Social Media Expert',
                'Content Creator 📱',
                'Logo Designer 🎨',
                'Script Writer ✍️',
                'Freelancer 💼',
                'Physics Enthusiast ⚛️'
            ],
            100,
            50,
            2000
        );
    }
    
    // Initialize counter animations
    new CounterAnimation();
    
    // Initialize skill bar animations
    new SkillBarAnimation();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize contact form
    new ContactForm();
    
    // Create scroll to top button
    createScrollToTop();
    
    // Initialize DNA helix
    new DNAHelix();
    
    // Console message
    consoleMessage();
});

// ===================================
// Performance Optimization
// ===================================

// Reduce animations on low-power devices
if (navigator.connection && navigator.connection.saveData) {
    document.body.classList.add('reduced-motion');
    const style = document.createElement('style');
    style.textContent = `
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Service Worker for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error caught:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
// Example logic to play music after Act VII
function finishIntro() {
    const intro = document.getElementById('introSequence');
    const music = document.getElementById('bg-music');
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        if(music) music.play();
    }, 1000);
}

