document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) { // Trigger earlier for smoother effect
            header.style.background = 'rgba(15, 20, 25, 0.98)';
        } else {
            header.style.background = 'rgba(15, 20, 25, 0.95)';
        }
    });

    // Animate elements on scroll using IntersectionObserver for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation a bit sooner
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';

                // If it's a skill card, also animate the bar
                if (entry.target.classList.contains('skill-card')) {
                    const proficiency = entry.target.dataset.proficiency;
                    const skillBar = entry.target.querySelector('.skill-bar');
                    const skillPercentage = entry.target.querySelector('.skill-percentage');
                    
                    if (skillBar) {
                        skillBar.style.width = proficiency + '%';
                        skillPercentage.textContent = proficiency + '%';
                    }
                }
                
                // Stop observing the element after it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .education-item').forEach(element => {
        observer.observe(element);
    });

    // Project Modal Logic
    const projectModal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalRole = document.getElementById('modal-role');
    const modalSolution = document.getElementById('modal-solution');
    const modalTech = document.getElementById('modal-tech');
    const modalImpact = document.getElementById('modal-impact');
    const modalScreenshots = document.getElementById('modal-screenshots');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            modalTitle.textContent = this.querySelector('h3').textContent;
            modalProblem.textContent = this.dataset.problem || 'N/A';
            modalRole.textContent = this.dataset.role || 'N/A';
            modalSolution.textContent = this.dataset.solution || 'N/A';
            modalTech.textContent = this.dataset.technologies || 'N/A';
            modalImpact.textContent = this.dataset.impact || 'N/A';

            modalScreenshots.innerHTML = '';
            const screenshots = (this.dataset.screenshots || '').split(',').filter(s => s.trim() !== '');
            if (screenshots.length > 0) {
                screenshots.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src.trim();
                    img.alt = 'Project Screenshot';
                    modalScreenshots.appendChild(img);
                });
                modalScreenshots.style.display = 'grid';
            } else {
                modalScreenshots.style.display = 'none';
            }

            projectModal.style.display = 'block';
        });
    });

    if(closeButton) {
        closeButton.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });
    }

    // Lightbox Logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const aboutMeImage = document.getElementById('about-me-image');

    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', function() {
            lightboxModal.style.display = 'block';
            lightboxImg.src = this.src;
        });
    });

    if (aboutMeImage) {
        aboutMeImage.addEventListener('click', function() {
            lightboxModal.style.display = 'block';
            lightboxImg.src = this.src;
        });
    }

    if(lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightboxModal.style.display = 'none';
        });
    }

    // Close modals on outside click
    window.addEventListener('click', function(event) {
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
        }
        if (event.target == lightboxModal) {
            lightboxModal.style.display = 'none';
        }
        if (event.target == statusModal) {
            statusModal.style.display = 'none';
        }
    });

    // Optimized Animated Background for Hero Section
    const animatedBackground = document.querySelector('.animated-background');
    if (animatedBackground) {
        const icons = [
            'fas fa-router', 'fas fa-ethernet', 'fas fa-server', 'fas fa-desktop',
            'fas fa-firewall', 'fas fa-laptop', 'fas fa-hdd', 'fas fa-microchip',
            'fas fa-cloud', 'fas fa-database'
        ];

        function createAnimatedIcon() {
            const iconElement = document.createElement('i');
            iconElement.className = icons[Math.floor(Math.random() * icons.length)];
            
            const size = Math.random() * 15 + 15; // Size between 15px and 30px
            iconElement.style.fontSize = size + 'px';
            iconElement.style.left = Math.random() * 100 + '%';
            iconElement.style.top = Math.random() * 100 + '%';
            iconElement.style.animationDuration = Math.random() * 10 + 15 + 's'; // 15-25s
            iconElement.style.animationDelay = Math.random() * 5 + 's';

            animatedBackground.appendChild(iconElement);

            iconElement.addEventListener('animationend', () => {
                iconElement.remove();
            });
        }

        // Create a smaller number of initial icons
        for (let i = 0; i < 10; i++) {
            createAnimatedIcon();
        }

        // Add new icons less frequently
        setInterval(createAnimatedIcon, 4000); // Add a new icon every 4 seconds
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const statusModal = document.getElementById('status-modal');
    const statusModalTitle = document.getElementById('status-modal-title');
    const statusModalMessage = document.getElementById('status-modal-message');
    const statusCloseButton = document.querySelector('.status-close');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    statusModalTitle.textContent = 'Success!';
                    statusModalMessage.textContent = 'Thanks for your submission!';
                    statusModal.style.display = 'flex';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        statusModalTitle.textContent = 'Error!';
                        statusModalMessage.textContent = data.errors ? data.errors.map(e => e.message).join(', ') : 'Oops! There was a problem.';
                        statusModal.style.display = 'flex';
                    })
                }
            }).catch(error => {
                statusModalTitle.textContent = 'Error!';
                statusModalMessage.textContent = 'Oops! There was a problem submitting your form.';
                statusModal.style.display = 'flex';
            });
        });
    }

    if (statusCloseButton) {
        statusCloseButton.addEventListener('click', function() {
            statusModal.style.display = 'none';
        });
    }
});
