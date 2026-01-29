// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animation hamburger
            if (mobileMenu.classList.contains('hidden')) {
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            } else {
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            });
        });
    }
    
    // Animation au scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Validation de formulaire
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Validation simple
            if (!name.value.trim()) {
                showError(name, 'Veuillez entrer votre nom');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Veuillez entrer un email valide');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Veuillez entrer votre message');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // Simulation d'envoi
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Merci pour votre message! Nous vous répondrons dans les plus brefs délais.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Simulation paiement
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = paymentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Traitement en cours...';
            submitBtn.disabled = true;
            
            // Simulation de traitement de paiement
            setTimeout(() => {
                document.getElementById('payment-success').classList.remove('hidden');
                paymentForm.classList.add('hidden');
            }, 2000);
        });
    }
    
    // Fonctions utilitaires
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('border-red-500');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('border-red-500');
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});