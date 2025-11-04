// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks).filter(link => link.getAttribute('href').startsWith('#'));

    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.feature-card, .stream-card, .guide-card, .community-card, .roadmap-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add active state styling for navigation (if needed)
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

    // Live stream status check (if needed in future)
    function updateLiveStatus() {
        const liveBadge = document.querySelector('.stream-badge');
        // This can be expanded to check actual stream status via API
        if (liveBadge && liveBadge.textContent.includes('בשידור חי')) {
            liveBadge.style.animation = 'pulse 2s infinite';
        }
    }

    // Add pulse animation for live badge
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    updateLiveStatus();

    // Mobile menu toggle (if needed for future mobile menu)
    const header = document.querySelector('.header');
    if (window.innerWidth <= 768) {
        // Add mobile menu functionality if needed
        const nav = document.querySelector('.nav');
        nav.style.flexDirection = 'column';
    }

    // Console message
    console.log('%c⚡ LightCast – Electric Geula Sessions', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cPowered by Divine Sparks ⚡', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cGitHub: https://github.com/AnLoMinus/LightCast', 'color: #6b7280; font-size: 12px;');
});

// Utility function for external links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        // Open external links in new tab (already handled by target="_blank" in HTML)
        // But we can add analytics or tracking here if needed
    }
});

// Handle form submissions (if any forms are added in future)
document.addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submissions here if needed
});

// Performance optimization: Lazy load images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll to top button (optional enhancement)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
createScrollToTopButton();

