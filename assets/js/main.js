// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Set initial language from URL path
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const currentLang = pathParts[0] || localStorage.getItem('language') || 'en';
    
    document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('language', currentLang);
    
    // Update language selector
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }

    // Form validation for booking
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const bookingData = Object.fromEntries(formData);
            
            console.log('Booking submitted:', bookingData);
            alert('Booking request received! We will contact you shortly.');
        });
    }

    // Smooth scroll for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Height of fixed header plus some padding
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navContainer.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
            });
        });
    }
});

function switchLanguage(lang) {
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Get current path
    const currentPath = window.location.pathname;
    
    // Handle root path
    if (currentPath === '/' || currentPath === '/index.html') {
        window.location.href = '/' + lang + '/';
        return;
    }
    
    // Extract current language and path
    const pathParts = currentPath.split('/').filter(Boolean);
    const currentLang = pathParts[0];
    
    // If we're switching languages, use the new language
    // If we're just navigating (like clicking home), use current language
    const targetLang = lang === currentLang ? currentLang : lang;
    
    // Get the rest of the path
    const remainingPath = pathParts.slice(1).join('/');
    
    // Construct new URL
    window.location.href = '/' + targetLang + (remainingPath ? '/' + remainingPath : '') + '/';
} 