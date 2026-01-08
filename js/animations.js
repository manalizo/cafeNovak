


// EXERCISE 1: FADE-IN ANIMATION ON PAGE LOAD


document.addEventListener('DOMContentLoaded', function() {
    console.log('Café Novak animations loaded!');
    
    // Fade-in animation for hero title and slogan
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero .buttons');
    
    if (heroTitle) {
        // Add fade-in class
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroButtons.style.transition = 'opacity 1s ease, transform 1s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Initialize all other features
    initHoverAnimations();
    initToggleSection();
    initScrollAnimations();
    initGalleryAnimations();
    initCardAnimations();
});


// EXERCISE 2: HOVER ANIMATIONS ON BUTTONS


function initHoverAnimations() {
    const buttons = document.querySelectorAll('button, .btn, .btn-outline, .btn-submit');
    
    buttons.forEach(button => {
        // Mouse enter animation
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        // Mouse leave animation
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        // Click animation (press effect)
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
    });
    
    console.log('Hover animations initialized on', buttons.length, 'buttons');
}


// EXERCISE 3: TOGGLE SECTION (SHOW/HIDE)


function initToggleSection() {
    // Create a toggle button for café info
    const section = document.querySelector('.section');
    
    if (section) {
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '📋 Afficher les horaires';
        toggleBtn.className = 'toggle-hours-btn';
        toggleBtn.style.cssText = `
            background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            margin: 20px auto;
            display: block;
            box-shadow: 0 4px 15px rgba(139, 154, 126, 0.3);
            transition: all 0.3s ease;
        `;
        
        // Create hours section (hidden by default)
        const hoursSection = document.createElement('div');
        hoursSection.className = 'hours-section';
        hoursSection.style.cssText = `
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease;
            opacity: 0;
            background: linear-gradient(135deg, #FAF7F4 0%, #FFFFFF 100%);
            border-radius: 16px;
            border: 2px solid #E5DDD7;
            margin: 0;
        `;
        
        hoursSection.innerHTML = `
            <div style="padding: 30px;">
                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin-bottom: 20px; color: #2C2C2C; text-align: center;">
                     Horaires d'ouverture
                </h3>
                <div style="display: grid; gap: 15px; max-width: 500px; margin: 0 auto;">
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #D97757;">
                        <span style="font-weight: 600;">Lundi - Vendredi</span>
                        <span style="color: #6B6B6B;">08:00 - 22:00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #8B9A7E;">
                        <span style="font-weight: 600;">Samedi</span>
                        <span style="color: #6B6B6B;">09:00 - 23:00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #E8C4A0;">
                        <span style="font-weight: 600;">Dimanche</span>
                        <span style="color: #6B6B6B;">09:00 - 21:00</span>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 20px; color: #6B6B6B; font-style: italic;">
             
                </p>
            </div>
        `;
        
        let isVisible = false;
        
        // Toggle functionality
        toggleBtn.addEventListener('click', function() {
            isVisible = !isVisible;
            
            if (isVisible) {
                hoursSection.style.maxHeight = hoursSection.scrollHeight + 'px';
                hoursSection.style.opacity = '1';
                hoursSection.style.marginTop = '20px';
                toggleBtn.textContent = 'Masquer les horaires';
                toggleBtn.style.background = 'linear-gradient(135deg, #D97757, #B85C3F)';
            } else {
                hoursSection.style.maxHeight = '0';
                hoursSection.style.opacity = '0';
                hoursSection.style.marginTop = '0';
                toggleBtn.textContent = ' Afficher les horaires';
                toggleBtn.style.background = 'linear-gradient(135deg, #8B9A7E, #6B7A5E)';
            }
            
            // Animate button
            toggleBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 100);
        });
        
        // Insert after the first section
        const firstSection = document.querySelector('.section');
        if (firstSection && firstSection.parentNode) {
            firstSection.parentNode.insertBefore(toggleBtn, firstSection.nextSibling);
            firstSection.parentNode.insertBefore(hoursSection, toggleBtn.nextSibling);
        }
        
        console.log('✅ Toggle section initialized');
    }
}


// EXERCISE 4: SCROLL ANIMATIONS


function initScrollAnimations() {
    // Get all sections and cards
    const animatedElements = document.querySelectorAll('.section, .card, .feature-card, .contact-info-box');
    
    // Set initial state
    animatedElements.forEach(element => {
        element.classList.add('scroll-hidden');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                entry.target.classList.remove('scroll-hidden');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Alternative: Manual scroll detection for older browsers
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('scroll-visible');
                element.classList.remove('scroll-hidden');
            }
        });
    }
    
    // Fallback for scroll detection
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    console.log('Scroll animations initialized on', animatedElements.length, 'elements');
}


// EXERCISE 5: INTERACTIVE GALLERY


function initGalleryAnimations() {
    // Gallery image hover effects
    const galleryImages = document.querySelectorAll('.card img, .carousel-container img');
    
    galleryImages.forEach(img => {
        // Zoom on hover
        img.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Click to enlarge (modal effect)
        img.addEventListener('click', function(e) {
            createImageModal(this.src, this.alt);
        });
        
        // Add pointer cursor
        img.style.cursor = 'pointer';
    });
    
    console.log('✅ Gallery animations initialized on', galleryImages.length, 'images');
}

// Create modal for image enlargement
function createImageModal(imageSrc, imageAlt) {
    // Check if modal already exists
    let existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: white;
        color: #2C2C2C;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 10000;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(90deg)';
        this.style.background = '#D97757';
        this.style.color = 'white';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.background = 'white';
        this.style.color = '#2C2C2C';
    });
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}


//  CARD ANIMATIONS


function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Staggered animation on page load
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log(' Card animations initialized on', cards.length, 'cards');
}

//  SMOOTH SCROLL FOR NAVIGATION


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// BONUS: PARALLAX EFFECT ON HERO


window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = (scrolled * parallaxSpeed) + 'px';
    }
});

// LOADING ANIMATION


window.addEventListener('load', function() {
    console.log(' All animations loaded successfully!');
    
    // Add a subtle pulse to the logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.animation = 'pulse 2s ease-in-out infinite';
    }
});

console.log(' Café Novak JavaScript initialized');
