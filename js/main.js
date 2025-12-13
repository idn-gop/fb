/* ========================================
   F.B Talent World - JavaScript
   Premium Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Preloader
    // ========================================
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page loads or after 1.5 seconds max
    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
    
    // Try multiple methods to ensure preloader hides
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        // Fallback: hide after 1.5 seconds regardless
        setTimeout(hidePreloader, 1500);
    }

    // ========================================
    // Create Particles
    // ========================================
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = 15 + Math.random() * 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Mobile Dropdown Toggle
    // ========================================
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // ========================================
    // Theme Toggle
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.service-card, .product-card, .news-card, .contact-card, .about-feature');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you can add your form submission logic
            // For now, we'll just show a success message
            
            // Create success notification
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ========================================
    // Newsletter Form Handling
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you can add your newsletter subscription logic
            showNotification('Thank you for subscribing!', 'success');
            
            this.reset();
        });
    }

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)' : '#1a1a25'};
            color: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(notification);
        
        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            padding: 5px;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ========================================
    // Tilt Effect on Cards (Optional)
    // ========================================
    const tiltCards = document.querySelectorAll('.service-card, .product-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // Typing Effect for Hero Title (Optional)
    // ========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ========================================
    // Initialize Tooltips (if needed)
    // ========================================
    // Add tooltip functionality if needed in the future

    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c🚀 F.B Talent World', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
    console.log('%cProfessional Phone Flash & Repair Services', 'font-size: 14px; color: #7c3aed;');
    console.log('%c© 2025 All Rights Reserved', 'font-size: 12px; color: #888;');

    // ========================================
    // Live Chat Widget
    // ========================================
    const chatToggle = document.getElementById('chatToggle');
    const chatOptions = document.getElementById('chatOptions');
    const liveChatBox = document.getElementById('liveChatBox');
    const openLiveChat = document.getElementById('openLiveChat');
    const closeLiveChat = document.getElementById('closeLiveChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const chatBadge = document.querySelector('.chat-badge');

    // Toggle chat options
    chatToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        chatOptions.classList.toggle('active');
        
        // Hide badge when opened
        if (this.classList.contains('active')) {
            chatBadge.style.display = 'none';
        }
    });

    // Open live chat box
    openLiveChat.addEventListener('click', function() {
        chatOptions.classList.remove('active');
        chatToggle.classList.remove('active');
        liveChatBox.classList.add('active');
    });

    // Close live chat box
    closeLiveChat.addEventListener('click', function() {
        liveChatBox.classList.remove('active');
    });

    // Send message function
    function sendUserMessage(text) {
        if (!text.trim()) return;
        
        // Hide quick replies after first message
        const quickRepliesContainer = document.querySelector('.quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.style.display = 'none';
        }

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Show typing indicator
        showTypingIndicator();
        
        // Bot response after delay
        setTimeout(() => {
            removeTypingIndicator();
            addBotResponse(text);
        }, 1500);
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'message bot typing-message';
        typing.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typing = document.querySelector('.typing-message');
        if (typing) typing.remove();
    }

    // Add bot response
    function addBotResponse(userText) {
        let response = '';
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes('firmware')) {
            response = '📱 For firmware, we provide files for various brands like Samsung, Xiaomi, Oppo, Vivo, etc. Contact us via WhatsApp to request specific firmware!';
        } else if (lowerText.includes('flash tool')) {
            response = '⚡ We provide various flash tools such as SP Flash Tool, Odin, QFIL, UMT, etc. Visit our Flash Tool page to download or contact us!';
        } else if (lowerText.includes('unlock') || lowerText.includes('network')) {
            response = '🔓 Network Unlock service available for all carriers! Fast and permanent process. Send your device IMEI via WhatsApp to check the price.';
        } else if (lowerText.includes('license') || lowerText.includes('credit')) {
            response = '🔑 We sell licenses & credits for various box/dongle: UMT, Miracle, Chimera, Octoplus, etc. Competitive prices! Chat WhatsApp for more info.';
        } else {
            response = '👍 Thank you for your question! For faster response, please contact us directly via WhatsApp or Telegram. Our team is ready to help 24/7!';
        }
        
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${response}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send button click
    sendMessage.addEventListener('click', function() {
        sendUserMessage(chatInput.value);
    });

    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage(this.value);
        }
    });

    // Quick reply buttons
    quickReplies.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            sendUserMessage(message);
        });
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.chat-widget') && !e.target.closest('.livechat-box')) {
            chatOptions.classList.remove('active');
            chatToggle.classList.remove('active');
        }
    });

});
