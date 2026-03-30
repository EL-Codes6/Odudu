
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        });

        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });
        
        document.querySelectorAll('a, button, .skill-card, .project-card, .testimonial-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Scroll Animations
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => observer.observe(el));

        // Particles Background
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#06b6d4" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#2563eb",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.padding = '0.8rem 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '1.5rem 0';
                navbar.style.boxShadow = 'none';
            }
        });

        // Form Submission with EmailJS
        const contactForm = document.getElementById('contactForm');
        const contactStatus = document.getElementById('contactStatus');

        function showContactStatus(message, isSuccess) {
            if (!contactStatus) return;
            contactStatus.textContent = message;
            contactStatus.style.color = isSuccess ? '#28a745' : '#dc3545';
            contactStatus.style.fontWeight = '600';
        }

        function sendMail(event) {
            event.preventDefault();
            if (!contactForm) return;

            const params = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                number: document.getElementById('number')?.value || '',
                message: document.getElementById('message')?.value || '',
            };

            const serviceID = 'service_phzlq98';
            const templateID = 'template_0w2pt7f';

            if (!params.name || !params.email || !params.message) {
                showContactStatus('Please fill in all required fields before sending.', false);
                return;
            }

            showContactStatus('Sending message...', true);

            emailjs.send(serviceID, templateID, params)
                .then((response) => {
                    contactForm.reset();
                    showContactStatus('Message sent successfully. Thank you!', true);
                    console.log('EmailJS success:', response);
                })
                .catch((error) => {
                    showContactStatus('Failed to send message. Please try again later.', false);
                    console.error('EmailJS error:', error);
                });
        }

        if (contactForm) {
            contactForm.addEventListener('submit', sendMail);
        }

        // Progress bar animation on scroll
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));

        // Animated Counter
        const counters = document.querySelectorAll('.stats-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });

        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Text typing effect for multiple texts
        const texts = [
            "Front-End Web Developer & Tutor",
            "WordPress Specialist | EL Codes",
            "React.js Expert & Consultant",
            "Web Development Instructor",
            // "Digital Solutions Architect"
        ];
        let textIndex = 0;
        let charIndex = 0;
        const typingElement = document.querySelector('.typing-text');
        
        function typeText() {
            if (charIndex < texts[textIndex].length) {
                typingElement.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            } else {
                setTimeout(eraseText, 2000);
            }
        }
        
        function eraseText() {
            if (charIndex > 0) {
                typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseText, 50);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
            }
        }
        
        // Start typing effect after initial animation
        setTimeout(typeText, 3500);

        // Add profile image hover effect
        const profileImg = document.querySelector('.profile-img');
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1) rotate(0deg)';
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
