// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const menu = document.querySelector('.md\\:flex.items-center.space-x-4');

mobileMenuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Dark Mode Toggle
const darkToggle = document.getElementById('dark-toggle');
const html = document.documentElement;

darkToggle.addEventListener('change', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
    darkToggle.checked = true;
}

// Testimonial Carousel
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;
const slideWidth = carouselSlides[0].getBoundingClientRect().width;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselSlides.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
    updateCarousel();
});

// Auto-rotate carousel
setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselSlides.length;
    updateCarousel();
}, 5000);

// Number Counter Animation
const counters = document.querySelectorAll('[data-target]');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            if (entry.target.hasAttribute('data-target')) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.carousel-slide, [data-target]').forEach(el => {
    observer.observe(el);
});

// Form Validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (!emailInput.value || !emailInput.validity.valid) {
            emailInput.classList.add('border-red-500');
            return;
        }
        
        // Simulate form submission
        newsletterForm.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thanks for subscribing! We'll be in touch soon.
            </div>
        `;
    });
}

// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
