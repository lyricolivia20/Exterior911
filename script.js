// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Add rugged animation to hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'translateY(9px) rotate(45deg)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                    } else if (index === 2) {
                        span.style.transform = 'translateY(-9px) rotate(-45deg)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking a nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
                const spans = hamburgerMenu.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
            mainNav.classList.remove('active');
        });
    });
    
    // Testimonial Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and set active dot
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    // Next/previous controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Dot controls
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            currentSlide = slideIndex;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(function() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
    
    // Form submission
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const service = document.getElementById('service').value;
            
            if (!name || !email || !phone || !address || !service) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Add loading state to button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'PROCESSING...';
            submitBtn.disabled = true;
            
            // Simulate sending data to server
            setTimeout(() => {
                // In a real application, you would send this data to a server
                alert('Thank you for your inquiry! Derek will contact you shortly to discuss your needs.');
                quoteForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced animations on scroll
    const animateOnScroll = function() {
        // Service cards with staggered reveal
        const servicesToAnimate = document.querySelectorAll('.service-card');
        servicesToAnimate.forEach((service, index) => {
            const servicePosition = service.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (servicePosition < screenPosition) {
                setTimeout(() => {
                    service.style.opacity = '1';
                    service.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        // Gallery items with rugged entrance
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) rotate(0deg)';
                }, index * 150);
            }
        });
        
        // About section reveal
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const position = aboutContent.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                aboutContent.style.opacity = '1';
                aboutContent.style.transform = 'translateY(0)';
            }
        }
        
        // Testimonial section reveal
        const testimonialSection = document.querySelector('.testimonials');
        if (testimonialSection) {
            const position = testimonialSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                testimonialSection.style.opacity = '1';
                testimonialSection.style.transform = 'translateY(0)';
            }
        }
        
        // Contact section reveal
        const contactItems = document.querySelectorAll('.contact-item, .emergency-response');
        contactItems.forEach((item, index) => {
            const position = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    };
    
    // Set initial styles for animations
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) rotate(-2deg)';
        item.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    if (document.querySelector('.about-content')) {
        document.querySelector('.about-content').style.opacity = '0';
        document.querySelector('.about-content').style.transform = 'translateY(50px)';
        document.querySelector('.about-content').style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
    
    if (document.querySelector('.testimonials')) {
        document.querySelector('.testimonials').style.opacity = '0';
        document.querySelector('.testimonials').style.transform = 'translateY(50px)';
        document.querySelector('.testimonials').style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
    
    document.querySelectorAll('.contact-item, .emergency-response').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Parallax scrolling effect for the background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.grass-background').style.backgroundPositionY = scrollPosition * 0.1 + 'px';
    });
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Gallery Carousel
    let currentGallerySlide = 0;
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    // Function to show a specific gallery slide
    function showGallerySlide(n) {
        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        galleryDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and set active dot
        gallerySlides[n].classList.add('active');
        galleryDots[n].classList.add('active');
    }
    
    // Next/previous controls for gallery
    if (galleryPrev) {
        galleryPrev.addEventListener('click', function() {
            currentGallerySlide--;
            if (currentGallerySlide < 0) {
                currentGallerySlide = gallerySlides.length - 1;
            }
            showGallerySlide(currentGallerySlide);
            resetGalleryTimer(); // Reset timer when manually navigating
        });
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', function() {
            currentGallerySlide++;
            if (currentGallerySlide >= gallerySlides.length) {
                currentGallerySlide = 0;
            }
            showGallerySlide(currentGallerySlide);
            resetGalleryTimer(); // Reset timer when manually navigating
        });
    }
    
    // Dot controls for gallery
    galleryDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            currentGallerySlide = slideIndex;
            showGallerySlide(currentGallerySlide);
            resetGalleryTimer(); // Reset timer when manually navigating
        });
    });
    
    // Auto-advance gallery slides every 5 seconds
    let galleryTimer;
    
    function startGalleryTimer() {
        galleryTimer = setInterval(function() {
            currentGallerySlide++;
            if (currentGallerySlide >= gallerySlides.length) {
                currentGallerySlide = 0;
            }
            showGallerySlide(currentGallerySlide);
        }, 5000);
    }
    
    function resetGalleryTimer() {
        clearInterval(galleryTimer);
        startGalleryTimer();
    }
    
    // Start the gallery timer
    if (gallerySlides.length > 0) {
        startGalleryTimer();
    }
    
    // Add pause on hover functionality
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        galleryCarousel.addEventListener('mouseenter', function() {
            clearInterval(galleryTimer);
        });
        
        galleryCarousel.addEventListener('mouseleave', function() {
            startGalleryTimer();
        });
    }
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    setTimeout(animateOnScroll, 100);
    
    // Create falling leaves, but don't add them yet - only after 10 minutes
    let leavesActive = false;
    let idleTimer;
    const idleTime = 10 * 60 * 1000; // 10 minutes
    
    function createFallingLeaves() {
        if (leavesActive) return; // Don't add leaves if they're already active
        
        const leafIcons = ['🌿', '🌱'];
        const leafCount = 15; // Number of leaves
        const body = document.querySelector('body');
        
        const leavesContainer = document.createElement('div');
        leavesContainer.classList.add('leaves-container');
        body.appendChild(leavesContainer);
        
        for (let i = 0; i < leafCount; i++) {
            let leaf = document.createElement('div');
            leaf.innerHTML = leafIcons[Math.floor(Math.random() * leafIcons.length)];
            leaf.classList.add('leaf');
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.fontSize = Math.random() * (30 - 15) + 15 + 'px';
            
            // Randomize animation properties
            const duration = Math.random() * (30 - 10) + 10;
            const delay = Math.random() * (20 - 0);
            
            leaf.style.animationDuration = duration + 's';
            leaf.style.animationDelay = delay + 's';
            
            leavesContainer.appendChild(leaf);
        }
        
        leavesActive = true;
    }
    
    function removeFallingLeaves() {
        const leavesContainer = document.querySelector('.leaves-container');
        if (leavesContainer) {
            leavesContainer.remove();
            leavesActive = false;
        }
    }
    
    // Reset timer on user activity
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        // Remove leaves when user becomes active again
        if (leavesActive) {
            removeFallingLeaves();
        }
        // Set new idle timer
        idleTimer = setTimeout(createFallingLeaves, idleTime);
    }
    
    // Set up idle timer and user activity listeners
    idleTimer = setTimeout(createFallingLeaves, idleTime);
    
    // Events that indicate user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
        document.addEventListener(event, resetIdleTimer, true);
    });
    
    // CTA Popup - only on specific interactions
    function showCtaPopup() {
        // Check if popup has already been shown in this session
        if (sessionStorage.getItem('popupShown')) {
            return;
        }
        
        const popup = document.createElement('div');
        popup.classList.add('cta-popup');
        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <h3>CONGRATULATIONS!</h3>
                <p>You've been selected for a <span class="highlight">FREE</span> lawn care makeover!</p>
                <p>Limited time offer for Neillsville residents only.</p>
                <a href="#contact" class="btn btn-primary popup-btn">CLAIM YOUR PRIZE</a>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Show popup with delay
        setTimeout(() => {
            popup.classList.add('show');
        }, 300);
        
        // Close popup
        const closeBtn = document.querySelector('.close-popup');
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 500);
        });
        
        // Close when clicking claim button too
        const claimBtn = document.querySelector('.popup-btn');
        claimBtn.addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 500);
        });
        
        // Mark popup as shown for this session
        sessionStorage.setItem('popupShown', 'true');
    }
    
    // Add popup triggers for specific interactions
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    // Show popup when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', showCtaPopup);
    });
    
    // Show popup when focusing on contact form or email inputs
    if (contactForm) {
        contactForm.addEventListener('focusin', showCtaPopup);
    }
    
    emailInputs.forEach(input => {
        input.addEventListener('focus', showCtaPopup);
    });
});
