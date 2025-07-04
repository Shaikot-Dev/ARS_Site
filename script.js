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
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 20, 25, 0.98)';
            } else {
                header.style.background = 'rgba(15, 20, 25, 0.95)';
            }
        });

        // Animate skill cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card, .project-card, section').forEach(card => {
            observer.observe(card);
        });

        // Skill Bar Animation
        document.querySelectorAll('.skill-card').forEach(skillCard => {
            const proficiency = skillCard.dataset.proficiency;
            const skillBar = skillCard.querySelector('.skill-bar');
            const skillPercentage = skillCard.querySelector('.skill-percentage');

            // Animate the bar width
            skillBar.style.width = proficiency + '%';
            skillPercentage.textContent = proficiency + '%';
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

                // Clear previous screenshots
                modalScreenshots.innerHTML = '';
                const screenshots = (this.dataset.screenshots || '').split(',').filter(s => s.trim() !== '');
                screenshots.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src.trim();
                    img.alt = 'Project Screenshot';
                    modalScreenshots.appendChild(img);
                });

                projectModal.style.display = 'block';
            });
        });

        closeButton.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == projectModal) {
                projectModal.style.display = 'none';
            }
        });

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

        lightboxClose.addEventListener('click', function() {
            lightboxModal.style.display = 'none';
        });

        lightboxModal.addEventListener('click', function(event) {
            if (event.target == lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });

        // Animated Background for Hero Section
        const animatedBackground = document.querySelector('.animated-background');
        const icons = [
            'fas fa-router',
            'fas fa-ethernet', // Represents a switch
            'fas fa-server',
            'fas fa-desktop',
            'fas fa-firewall', // Assuming a firewall icon exists or using a generic security icon
            'fas fa-laptop',
            'fas fa-hdd',
            'fas fa-microchip',
            'fas fa-cloud',
            'fas fa-database'
        ];

        function createAnimatedIcon() {
            const iconElement = document.createElement('i');
            iconElement.className = icons[Math.floor(Math.random() * icons.length)];
            
            const size = Math.random() * 20 + 20; // Size between 20px and 40px
            iconElement.style.fontSize = size + 'px';
            iconElement.style.left = Math.random() * 100 + '%';
            iconElement.style.top = Math.random() * 100 + '%';
            iconElement.style.animationDuration = Math.random() * 10 + 10 + 's'; // 10-20s
            iconElement.style.animationDelay = Math.random() * 5 + 's'; // 0-5s delay
            iconElement.style.opacity = 0; // Start invisible

            animatedBackground.appendChild(iconElement);

            // Remove icon after animation to prevent DOM bloat
            iconElement.addEventListener('animationend', () => {
                iconElement.remove();
            });
        }

        // Create initial icons
        for (let i = 0; i < 30; i++) {
            createAnimatedIcon();
        }

        // Continuously add new icons
        setInterval(createAnimatedIcon, 1000); // Add a new icon every 1 second