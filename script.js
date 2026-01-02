document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Animation ---
    const heroText = "AI Engineer & Distributed Systems Architect";
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let i = 0;

    if (heroSubtitle) {
        heroSubtitle.textContent = '';
        function typeWriter() {
            if (i < heroText.length) {
                heroSubtitle.textContent += heroText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // --- Theme Switcher Logic ---
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsPanel = document.querySelector('.settings-panel');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const colorOptions = document.querySelectorAll('.color-option');

    // Toggle Settings Panel
    if (settingsToggle && settingsPanel) {
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.toggle('open');
        });
    }

    // Load Saved Preferences
    const savedColor = localStorage.getItem('portfolio-color');
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedColor) applyAccentColor(savedColor);
    if (savedTheme === 'light') enableLightMode();

    // Color Swatches
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            applyAccentColor(color);
            localStorage.setItem('portfolio-color', color);

            // UI Update
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Dark/Light Mode Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');

            // Update Icon/Text
            updateThemeBtnUI(isLight);

            // Save Preference
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        });
    }

    function applyAccentColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        document.documentElement.style.setProperty('--accent-glow', `${color}80`); // 50% opacity approximation

        // Update active class on swatches
        colorOptions.forEach(opt => {
            if (opt.getAttribute('data-color') === color) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    function enableLightMode() {
        document.body.classList.add('light-mode');
        updateThemeBtnUI(true);
    }

    function updateThemeBtnUI(isLight) {
        const icon = themeToggleBtn.querySelector('i');
        const text = themeToggleBtn.querySelector('span');
        if (isLight) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                targetElem.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations ---
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
});
