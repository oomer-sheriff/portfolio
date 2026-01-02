document.addEventListener('DOMContentLoaded', () => {
    // Typing animation for Hero
    const heroText = "AI Engineer & Distributed Systems Architect";
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let i = 0;

    // Clear initial content in case
    if (heroSubtitle) {
        heroSubtitle.textContent = '';

        function typeWriter() {
            if (i < heroText.length) {
                heroSubtitle.textContent += heroText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a small delay
        setTimeout(typeWriter, 500);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.experience-card, .project-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class logic via CSS or inline styles for simplicity here
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
