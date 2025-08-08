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

let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  
  // Reset timer
  clearInterval(slideInterval);
  slideInterval = setInterval(() => plusSlides(1), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // ... (rest of the DOMContentLoaded event listener)

    // Slideshow controls
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if(prevButton && nextButton){
        prevButton.addEventListener("click", () => plusSlides(-1));
        nextButton.addEventListener("click", () => plusSlides(1));
    }
});
