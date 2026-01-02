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
            document.documentElement.classList.toggle('light-mode');
            const isLight = document.documentElement.classList.contains('light-mode');

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
        document.documentElement.classList.add('light-mode');
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


    // --- Architecture Modal Logic ---
    const modal = document.getElementById('arch-modal');
    const viewArchBtn = document.getElementById('view-arch-btn');
    const closeModalBtn = document.getElementById('close-modal');

    if (modal && viewArchBtn && closeModalBtn) {
        viewArchBtn.addEventListener('click', () => {
            modal.showModal();
        });

        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom) {
                modal.close();
            }
        });
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

    // --- Starry Background Logic ---
    const canvas = document.getElementById('bg-stars');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, stars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.opacity = Math.random();
                this.speedX = Math.random() * 0.05 - 0.025; // Subtle movement
                this.speedY = Math.random() * 0.05 - 0.025;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Twinkle
                this.opacity += (Math.random() - 0.5) * 0.05;
                if (this.opacity < 0.1) this.opacity = 0.1;
                if (this.opacity > 1) this.opacity = 1;
            }

            draw() {
                // Adaptive Star Color based on Theme
                const isLight = document.documentElement.classList.contains('light-mode');
                ctx.fillStyle = isLight ? `rgba(0, 0, 0, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            const starCount = Math.floor((width * height) / 6000); // Density
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animateStars);
        }

        window.addEventListener('resize', resize);
        resize();
        animateStars();
    }
});
