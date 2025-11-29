// Game of Thrones Portfolio Effects
class GOTPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.initializeCursor();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    setupScrollEffects() {
        // Header background effect on scroll
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (header) {
                if (currentScroll > 100) {
                    header.style.background = 'rgba(0, 0, 0, 0.95)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                } else {
                    header.style.background = 'rgba(0, 0, 0, 0.95)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
                }
            }
        });

        // Active navigation link highlighting
        this.highlightActiveLink();
        window.addEventListener('scroll', () => this.highlightActiveLink());
    }

    highlightActiveLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupFormHandling() {
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Show success message
                this.showNotification('Raven sent successfully! 🐦', 'success');
                form.reset();
            });
        }
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #FFD700, #8B0000)' : 'linear-gradient(135deg, #8B0000, #FF6347)'};
            color: #F5DEB3;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-family: 'Cinzel', serif;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            animation: slideIn 0.5s ease;
            border: 2px solid rgba(255, 215, 0, 0.5);
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    initializeCursor() {
        // Simple cursor implementation
        const cursor = document.getElementById('cursor-canvas');
        if (!cursor) return;
        
        const ctx = cursor.getContext('2d');
        cursor.width = 20;
        cursor.height = 20;
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
    }

    setupScrollAnimations() {
        // Game of Thrones intro style animations
        this.setupGOTIntroAnimations();
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate skill bars when they come into view
                    if (entry.target.classList.contains('skill-item')) {
                        const progress = entry.target.querySelector('.skill-progress');
                        if (progress) {
                            const width = progress.style.width;
                            progress.style.width = '0';
                            setTimeout(() => {
                                progress.style.width = width;
                            }, 100);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.section, .skill-item, .timeline-item, .project-card, .education-item, .highlight-item').forEach(el => {
            observer.observe(el);
        });

        // Add CSS for animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .section, .skill-item, .timeline-item, .project-card, .education-item, .highlight-item {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            .timeline-item.animate-in {
                animation: fadeInUp 0.8s ease forwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(animationStyle);
    }

    setupGOTIntroAnimations() {
        // Create floating text elements like GoT intro
        const kingdoms = [
            { name: "King's Landing", color: '#ffffff' },
            { name: 'Westerlands', color: '#cccccc' },
            { name: 'The Reach', color: '#ffffff' },
            { name: 'Dorne', color: '#cccccc' },
            { name: 'Iron Islands', color: '#ffffff' },
            { name: 'The North', color: '#cccccc' },
            { name: 'Beyond the Wall', color: '#ffffff' }
        ];

        // Create animated text elements
        kingdoms.forEach((kingdom, index) => {
            const textElement = document.createElement('div');
            textElement.className = 'got-floating-text';
            textElement.textContent = kingdom.name;
            textElement.style.cssText = `
                position: fixed;
                font-family: 'Cinzel', serif;
                font-size: ${2 + Math.random() * 1.5}rem;
                font-weight: 900;
                color: ${kingdom.color};
                opacity: 0;
                text-transform: uppercase;
                letter-spacing: 3px;
                pointer-events: none;
                z-index: 1;
                white-space: nowrap;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            `;
            document.body.appendChild(textElement);

            // Animate text on scroll
            this.animateGOTText(textElement, index);
        });

        // Add floating sigils/symbols
        this.createFloatingSigils();

        // Add CSS for GoT animations
        const gotStyle = document.createElement('style');
        gotStyle.textContent = `
            .got-floating-text {
                animation: float-text 15s linear infinite;
            }
            @keyframes float-text {
                0% {
                    transform: translateY(100vh) translateX(-100px) rotate(-5deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(100px) rotate(5deg);
                    opacity: 0;
                }
            }
            .got-sigil {
                position: fixed;
                font-size: 3rem;
                opacity: 0.3;
                pointer-events: none;
                z-index: 0;
                animation: float-sigil 20s linear infinite;
            }
            @keyframes float-sigil {
                0% {
                    transform: translateY(100vh) translateX(-50px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) translateX(50px) rotate(360deg);
                    opacity: 0;
                }
            }
            .got-title-sequence {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: 'Cinzel', serif;
                font-size: 4rem;
                font-weight: 900;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 5px;
                opacity: 0;
                pointer-events: none;
                z-index: 2;
                text-align: center;
                text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            }
            .got-title-sequence.show {
                animation: title-reveal 3s ease-in-out;
            }
            @keyframes title-reveal {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(1.2);
                }
            }
        `;
        document.head.appendChild(gotStyle);

        // Trigger title sequence on scroll
        this.triggerTitleSequence();
    }

    animateGOTText(element, index) {
        let scrollProgress = 0;
        let hasAnimated = false;

        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = window.pageYOffset / scrollHeight;

            // Trigger animation at different scroll positions for each text
            const triggerPoint = (index * 0.15) + 0.1;
            
            if (scrollProgress > triggerPoint && !hasAnimated) {
                hasAnimated = true;
                
                // Random position across screen
                const xPos = Math.random() * window.innerWidth;
                const delay = index * 0.5;
                
                element.style.left = xPos + 'px';
                element.style.animationDelay = delay + 's';
                element.classList.add('got-floating-text');
                
                // Reset for next scroll cycle
                setTimeout(() => {
                    hasAnimated = false;
                }, 15000);
            }
        });
    }

    createFloatingSigils() {
        const sigils = ['⚔️', '🛡️', '👑', '🐉', '🏰', '⚡', '❄️'];
        
        sigils.forEach((sigil, index) => {
            const sigilElement = document.createElement('div');
            sigilElement.className = 'got-sigil';
            sigilElement.textContent = sigil;
            sigilElement.style.left = Math.random() * window.innerWidth + 'px';
            sigilElement.style.animationDelay = (index * 3) + 's';
            document.body.appendChild(sigilElement);
        });
    }

    triggerTitleSequence() {
        let hasShownTitle = false;
        
        window.addEventListener('scroll', () => {
            const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Show title sequence at 25% scroll
            if (scrollProgress > 0.25 && !hasShownTitle) {
                hasShownTitle = true;
                this.showGOTTitle();
                
                // Reset for next scroll cycle
                setTimeout(() => {
                    hasShownTitle = false;
                }, 20000);
            }
        });
    }

    showGOTTitle() {
        const titles = [
            'Full Stack Developer',
            'Rana Shamroz Ishtiaq',
            'Seven Kingdoms',
            'Code & Conquer'
        ];

        titles.forEach((title, index) => {
            setTimeout(() => {
                const titleElement = document.createElement('div');
                titleElement.className = 'got-title-sequence';
                titleElement.textContent = title;
                document.body.appendChild(titleElement);
                
                // Show animation
                setTimeout(() => {
                    titleElement.classList.add('show');
                }, 100);
                
                // Remove after animation
                setTimeout(() => {
                    titleElement.remove();
                }, 3000);
            }, index * 1000);
        });
    }

    setupParallaxEffects() {
        // Parallax effect for background elements
        const decorations = document.querySelectorAll('.map-decoration');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            decorations.forEach((decoration, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                decoration.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Floating compass animation
        const compass = document.querySelector('.floating-compass .compass-needle');
        if (compass) {
            setInterval(() => {
                const randomRotation = Math.random() * 30 - 15;
                compass.style.transform = `rotate(${randomRotation}deg)`;
            }, 4000);
        }

        // Mini compass in hero
        const miniCompass = document.querySelector('.compass-mini .needle');
        if (miniCompass) {
            setInterval(() => {
                const randomRotation = Math.random() * 20 - 10;
                miniCompass.style.transform = `rotate(${randomRotation}deg)`;
            }, 3000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GOTPortfolio();
});

// Add CSS for header hide/show
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    .header {
        transition: transform 0.3s ease;
    }
    .header-hidden {
        transform: translateY(-100%);
    }
    .nav-links a.active {
        color: #FFD700 !important;
        text-shadow: 0 0 15px #FFD700;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(headerStyle);

// Add typing effect for hero title (optional)
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize typing effect on page load (optional)
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        new TypeWriter(heroTitle, originalText, 80);
    }
});

// Add particle effects for ambient atmosphere
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = 15;
        const container = document.querySelector('.got-map-background');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 215, 0, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${10 + Math.random() * 20}s linear infinite;
                pointer-events: none;
                z-index: -1;
            `;
            container.appendChild(particle);
            this.particles.push(particle);
        }

        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animate() {
        // Particles are animated via CSS
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
