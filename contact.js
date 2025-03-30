// Language switching functionality for contact page
document.addEventListener('DOMContentLoaded', function() {
    // Set default language to English
    let currentLang = 'en';
    
    // Get all language buttons
    const langButtons = document.querySelectorAll('.language-btn');
    
    // Get all elements with multilingual content
    const multilingualElements = document.querySelectorAll('[data-en], [data-fr], [data-sw]');
    
    // Function to update all multilingual elements
    function updateLanguage(lang) {
        // Update button styles
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('bg-green-100', 'text-green-800');
                btn.classList.remove('bg-gray-200', 'text-gray-800');
            } else {
                btn.classList.remove('bg-green-100', 'text-green-800');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            }
        });
        
        // Update all multilingual elements
        multilingualElements.forEach(el => {
            if (el.tagName === 'LABEL' || el.tagName === 'SPAN') {
                el.textContent = el.dataset[lang];
            }
        });
        
        // Update select options
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const options = subjectSelect.options;
            options[0].text = lang === 'en' ? 'General Inquiry' : 
                             lang === 'fr' ? 'Demande Générale' : 'Utafiti wa Jumla';
            options[1].text = lang === 'en' ? 'Services Information' : 
                             lang === 'fr' ? 'Information sur les Services' : 'Taarifa za Huduma';
            options[2].text = lang === 'en' ? 'Partnership Opportunity' : 
                             lang === 'fr' ? 'Opportunité de Partenariat' : 'Fursa ya Ushirikiano';
            options[3].text = lang === 'en' ? 'Careers' : 
                             lang === 'fr' ? 'Carrières' : 'Kazi';
        }
    }
    
    // Add click event listeners to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLang = this.dataset.lang;
            updateLanguage(currentLang);
            // Store language preference
            localStorage.setItem('preferredLang', currentLang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            submitText.classList.add('hidden');
            spinner.classList.remove('hidden');
            
            // Simulate form submission
            setTimeout(() => {
                submitText.classList.remove('hidden');
                spinner.classList.add('hidden');
                alert(currentLang === 'en' ? 'Message sent successfully!' : 
                      currentLang === 'fr' ? 'Message envoyé avec succès!' : 
                      'Ujumbe umepelekwa kikamilifu!');
                this.reset();
            }, 1500);
        });
    }
});