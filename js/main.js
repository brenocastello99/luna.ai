// ===== MAIN JAVASCRIPT FILE =====

// Global variables
let isLoading = true;
let particles = [];
let animationId;

// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading time
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Initialize animations after loading
        setTimeout(() => {
            initializeAnimations();
        }, 500);
    }
}

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Active link highlighting
        this.setupActiveLinks();
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop effect
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }
    
    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resize();
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#06B6D4' : '#7C3AED'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = '#06B6D4';
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
        
        // Also observe sections and cards
        document.querySelectorAll('.section, .feature-card, .metric-card').forEach(element => {
            observer.observe(element);
        });
    }
}

// ===== FORM HANDLING =====
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10B981' : '#EF4444'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// ===== ROI CALCULATOR =====
function calculateROI() {
    const monthlyContacts = parseInt(document.getElementById('monthly-contacts').value) || 0;
    const avgResponseTime = parseInt(document.getElementById('avg-response-time').value) || 0;
    
    if (monthlyContacts === 0 || avgResponseTime === 0) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simple ROI calculation (these are example formulas)
    const hoursPerMonth = (monthlyContacts * avgResponseTime) / 60;
    const costPerHour = 25; // R$ per hour
    const currentCost = hoursPerMonth * costPerHour;
    const automationSavings = currentCost * 0.6; // 60% savings
    const monthlySavings = automationSavings;
    const annualROI = (monthlySavings * 12) / (monthlySavings * 2) * 100; // Assuming 2 months payback
    
    // Update display
    document.getElementById('monthly-savings').textContent = `R$ ${monthlySavings.toLocaleString('pt-BR')}`;
    document.getElementById('annual-roi').textContent = `${Math.round(annualROI)}%`;
    
    // Add animation to results
    const resultItems = document.querySelectorAll('.result-value');
    resultItems.forEach(item => {
        item.style.transform = 'scale(1.1)';
        item.style.color = '#06B6D4';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
}

// ===== MOUSE EFFECTS =====
class MouseEffects {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }
    
    init() {
        // Create custom cursor elements
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        // Style cursors
        Object.assign(this.cursor.style, {
            position: 'fixed',
            width: '8px',
            height: '8px',
            background: '#06B6D4',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '10000',
            transition: 'transform 0.1s ease'
        });
        
        Object.assign(this.cursorFollower.style, {
            position: 'fixed',
            width: '30px',
            height: '30px',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.2s ease'
        });
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 4 + 'px';
            this.cursor.style.top = e.clientY - 4 + 'px';
            
            this.cursorFollower.style.left = e.clientX - 15 + 'px';
            this.cursorFollower.style.top = e.clientY - 15 + 'px';
        });
        
        // Hover effects
        document.querySelectorAll('a, button, .feature-card, .metric-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// ===== PARALLAX EFFECTS =====
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('.floating-moon, .hero-moon-element');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            this.elements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// ===== INITIALIZATION =====
function initializeAnimations() {
    // Initialize all components
    new Navigation();
    new CounterAnimation();
    new ScrollAnimations();
    new FormHandler();
    new MouseEffects();
    new ParallaxEffects();
    
    // Initialize particle system for hero section
    const heroParticles = document.getElementById('hero-particles');
    if (heroParticles) {
        new ParticleSystem(heroParticles);
    }
    
    // Add entrance animations to hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-actions');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }, 500);
}

// ===== UTILITY FUNCTIONS =====
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
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
    document.documentElement.style.setProperty('--transition-slow', '0.2s ease');
}

// Respect user's motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0.01ms');
    document.documentElement.style.setProperty('--transition-normal', '0.01ms');
    document.documentElement.style.setProperty('--transition-slow', '0.01ms');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.LunaAI = {
    calculateROI,
    hideLoadingScreen
};
