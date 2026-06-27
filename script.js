/* ==========================================================================
   SANGITA MUKHWAS - PREMIUM LUXURY LANDING PAGE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initCustomCursor();
    initStickyNavbar();
    initScrollProgressBar();
    initScrollReveal();
    initHeroParallax();
    initProductCardTilt();
    initIngredientsShowcase();
    initTestimonialCarousel();
    initStatsCounters();
    initMagneticButtons();
    initRippleButtons();
    initMobileNav();
});

/* ==========================================================================
   1. CUSTOM CURSOR GLOW
   ========================================================================== */
function initCustomCursor() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Butter-smooth interpolation (lerp) for the glow coordinates
    function animateCursor() {
        const lerpFactor = 0.08;
        currentX += (mouseX - currentX) * lerpFactor;
        currentY += (mouseY - currentY) * lerpFactor;

        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
}

/* ==========================================================================
   2. STICKY NAVBAR TRANSITIONS
   ========================================================================== */
function initStickyNavbar() {
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (!header) return;

    // Check scroll distance to add scroll background styles
    function checkHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Highlight menu links based on active section in viewport
    function activeNavLinkScroll() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        checkHeaderScroll();
        activeNavLinkScroll();
    });

    // Run once on load to ensure initial state matches scroll position
    checkHeaderScroll();
    activeNavLinkScroll();
}

/* ==========================================================================
   3. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once for performance
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Brand story timeline tracking scroll progress
    const timelineStepElements = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.getElementById('timelineProgress');

    if (timelineStepElements.length > 0 && timelineProgress) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepNum = parseInt(entry.target.getAttribute('data-step'), 10);
                    entry.target.classList.add('active');
                    
                    // Update timeline line progress based on step reached
                    const totalSteps = timelineStepElements.length;
                    const percent = ((stepNum) / totalSteps) * 100;
                    timelineProgress.style.height = `${percent}%`;
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        timelineStepElements.forEach(step => {
            timelineObserver.observe(step);
        });
    }
}

/* ==========================================================================
   5. HERO PARALLAX & MOUSE EFFECT
   ========================================================================== */
function initHeroParallax() {
    const heroBg = document.getElementById('heroBg');
    const heroVisual = document.getElementById('heroVisual');
    const floatingSpices = document.querySelectorAll('.floating-spice');

    if (!heroBg || !heroVisual) return;

    // Scroll parallax for background
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Background shifts slower than scroll, creating depth
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
    });

    // Mouse movement parallax for floating spices inside hero visual
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        floatingSpices.forEach(spice => {
            const depth = parseFloat(spice.getAttribute('data-depth')) || 0.1;
            const moveX = x * depth;
            const moveY = y * depth;
            spice.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    heroVisual.addEventListener('mouseleave', () => {
        floatingSpices.forEach(spice => {
            spice.style.transform = 'translate(0, 0)';
            spice.style.transition = 'transform 0.8s ease';
        });
    });
}

/* ==========================================================================
   6. 3D TILT EFFECT ON CARDS
   ========================================================================== */
function initProductCardTilt() {
    const cards = document.querySelectorAll('.product-card, .hero-product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse relative X inside card
            const y = e.clientY - rect.top;  // Mouse relative Y inside card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate coordinates from center (-1 to 1)
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Max degrees of rotation
            const maxRotate = 8; 
            const rotateX = -deltaY * maxRotate;
            const rotateY = deltaX * maxRotate;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });
}

/* ==========================================================================
   7. INGREDIENTS INTERACTIVE SHOWCASE
   ========================================================================== */
function initIngredientsShowcase() {
    const nodes = document.querySelectorAll('.ingredient-node');
    const centerTitle = document.getElementById('ingredientTitle');
    const centerDesc = document.getElementById('ingredientDesc');
    const centerBenefit = document.getElementById('ingredientBenefit');

    if (nodes.length === 0 || !centerTitle || !centerDesc || !centerBenefit) return;

    function activateNode(node) {
        // Remove active state from all nodes
        nodes.forEach(n => n.classList.remove('active'));
        
        // Add active state to current node
        node.classList.add('active');

        // Retrieve data attributes
        const title = node.getAttribute('data-title');
        const desc = node.getAttribute('data-desc');
        const benefit = node.getAttribute('data-benefit');

        // Update content in central circle with elegant fade
        const displayBox = document.getElementById('ingredientCenterContent');
        displayBox.style.opacity = '0';
        displayBox.style.transform = 'scale(0.95)';
        displayBox.style.transition = 'all 0.2s ease';

        setTimeout(() => {
            centerTitle.textContent = title;
            centerDesc.textContent = desc;
            centerBenefit.textContent = benefit;
            
            displayBox.style.opacity = '1';
            displayBox.style.transform = 'scale(1)';
            displayBox.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        }, 200);
    }

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => activateNode(node));
        node.addEventListener('click', () => activateNode(node));
    });
}

/* ==========================================================================
   8. TESTIMONIAL CAROUSEL SLIDER (Touch & Drag support)
   ========================================================================== */
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!carousel || slides.length === 0 || !dotsContainer) return;

    let currentIndex = 0;
    let autoPlayTimer;

    // Generate dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    // Autoplay feature
    function startAutoplay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoPlayTimer);
        startAutoplay();
    }

    startAutoplay();

    // Swipe/Drag gestures (touch/mouse events)
    let startX = 0;
    let isDragging = false;
    let dragMoveX = 0;

    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        carousel.style.transition = 'none';
        clearInterval(autoPlayTimer);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragMoveX = e.clientX - startX;
        // Limit dragging slide transform to maintain smooth limits
        const offset = -currentIndex * carousel.clientWidth + dragMoveX;
        carousel.style.transform = `translateX(${offset}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        
        // Threshold of 80px to switch slides
        if (Math.abs(dragMoveX) > 80) {
            if (dragMoveX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            updateCarousel();
        }
        dragMoveX = 0;
        startAutoplay();
    });

    // Touch events for mobile support
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearInterval(autoPlayTimer);
    });

    carousel.addEventListener('touchmove', (e) => {
        dragMoveX = e.touches[0].clientX - startX;
    });

    carousel.addEventListener('touchend', () => {
        if (Math.abs(dragMoveX) > 50) {
            if (dragMoveX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        dragMoveX = 0;
        startAutoplay();
    });
}

/* ==========================================================================
   9. STATISTICS COUNT-UP COUNTERS
   ========================================================================== */
function initStatsCounters() {
    const statNums = document.querySelectorAll('.stat-num');
    if (statNums.length === 0) return;

    function formatNumber(val, target) {
        if (target === 100) return `${Math.round(val)}%`;
        if (target === 30) return `${Math.round(val)}+`;
        if (val >= 1000000) {
            return `${(val / 1000000).toFixed(0)}M+`;
        }
        if (val >= 1000) {
            return `${Math.round(val / 1000)}k+`;
        }
        return Math.round(val);
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for stats count (easeOutExpo)
            const easeOutProgress = 1 - Math.pow(2, -10 * progress);
            const currentValue = easeOutProgress * target;

            el.textContent = formatNumber(currentValue, target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = formatNumber(target, target);
            }
        }
        requestAnimationFrame(update);
    }

    // Observer to trigger counter animations when scrolled into viewport
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Count once
            }
        });
    }, {
        threshold: 0.5
    });

    statNums.forEach(num => {
        statsObserver.observe(num);
    });
}

/* ==========================================================================
   10. MAGNETIC BUTTON EFFECT
   ========================================================================== */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Shift button slightly towards mouse (e.g. 20% distance)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });
}

/* ==========================================================================
   11. RIPPLE BUTTON CLICK EFFECT
   ========================================================================== */
function initRippleButtons() {
    const rippleBtns = document.querySelectorAll('.ripple-btn');

    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/* ==========================================================================
   12. MOBILE NAVIGATION OVERLAY & BACK TO TOP BUTTON
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const header = document.getElementById('mainHeader');
    const overlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (mobileToggle && overlay) {
        mobileToggle.addEventListener('click', () => {
            header.classList.toggle('nav-open');
            overlay.classList.toggle('open');
            // Disable background scrolling when menu is open
            document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : 'auto';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('nav-open');
                overlay.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll listener for showing back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
