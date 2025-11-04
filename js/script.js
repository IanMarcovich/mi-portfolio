// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let currentFilter = 'all';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ===== MAIN INITIALIZATION =====
function initializePortfolio() {
    initializeAOS();
    initializeNavigation();
    initializeTypedText();
    initializeProjectFilter();
    // initializeContactForm(); // Removed - no contact form
    initializeScrollEffects();
    initializeSubgridAnimation();
    initializeCounters();
    initializeSmoothScroll();
    initializeBackToTop();
    initializeScrollProgress();
}

// ===== AOS ANIMATION INITIALIZATION =====
function initializeAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                isMenuOpen = false;
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== TYPED TEXT EFFECT =====
function initializeTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const textArray = [
        'Desarrollador Frontend',
        'Desarrollador Backend', 
        'Desarrollador Full Stack',
        'Creador de Experiencias'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 75;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// ===== PROJECT FILTER =====
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
            currentFilter = filter;
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Advanced parallax and scroll animations
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const rateHero = scrolled * 0.2;
        
        // Hero parallax effect
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rateHero}px, 0)`;
        }
        
        // Floating animation for cards on scroll
        const cards = document.querySelectorAll('.project-card, .skill-item');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = cardCenter - windowCenter;
            const normalizedDistance = distance / window.innerHeight;
            
            // Apply floating effect based on scroll position
            const floatY = Math.sin(scrolled * 0.002 + index * 0.5) * 5;
            const rotateX = normalizedDistance * 10;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${floatY}px) rotateX(${rotateX}deg)`;
                card.style.transition = 'transform 0.1s ease-out';
            }
        });
        
        // Background elements parallax
        const bgElements = document.querySelectorAll('.section');
        bgElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== SUBGRID SCROLL ANIMATION =====
function initializeSubgridAnimation() {
    const subgridItems = document.querySelectorAll('.scroll-subgrid-item');
    
    if (subgridItems.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const subgridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Optional: trigger shimmer effect after main animation
                setTimeout(() => {
                    entry.target.style.setProperty('--shimmer-delay', '0s');
                }, 800);
                
                subgridObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    subgridItems.forEach(item => {
        subgridObserver.observe(item);
    });
}

// ===== COUNTERS ANIMATION =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        counter.textContent = Math.floor(current) + suffix;

        if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(timer);
        }
    }, 50);
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                // Custom easing function for smooth scroll
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
}

// Custom smooth scroll with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easedProgress = ease(progress);
        window.scrollTo(0, start + (distance * easedProgress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// ===== LAZY LOADING FOR IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME TOGGLE (Optional) =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            this.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(function() {
            updateActiveNavLink();
            // Other scroll-dependent functions
        });
    });

    // Preload critical images
    const criticalImages = [
        'assets/hero-image.svg',
        'assets/about-image.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    showNotification('Se produjo un error inesperado.', 'error');
});

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
    };
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate;
                element.classList.add(`animate-${animationType}`);
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ===== CONTACT FORM VALIDATION =====
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove previous error styling
        field.classList.remove('error');
        
        if (!value) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Ingresa un email válido');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('mobile-menu');
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            isMenuOpen = false;
        }
    });
}

// ===== ANALYTICS (Optional) =====
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
}

// ===== INITIALIZATION CALL =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    optimizePerformance();
    initializeKeyboardNavigation();
    initializeLazyLoading();
    
    // Track page load
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    let ticking = false;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar
        progressBar.style.width = scrollPercent + '%';
        
        // Add glow effect when scrolling
        if (scrollPercent > 0) {
            progressBar.style.boxShadow = `0 0 10px rgba(255, 140, 0, 0.5)`;
        } else {
            progressBar.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initialize on load
    updateProgress();
}

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}