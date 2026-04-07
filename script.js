// ====================== CONFIG ======================
const MY_EMAIL = "mrmithra2006@gmail.com"; // ← You can keep or change this (only used for Hire Me)

// EmailJS Credentials (CHANGE THESE!)
const EMAILJS_PUBLIC_KEY = "KBQ0Wwng7lFyUteR5";     // ← Paste from EmailJS
const EMAILJS_SERVICE_ID = "service_k5eh6cp";     // ← Paste from EmailJS
const EMAILJS_TEMPLATE_ID = "template_2hdwv74";   // ← Paste from EmailJS

// ====================== INITIALIZE EMAILJS ======================
emailjs.init(EMAILJS_PUBLIC_KEY);

// ====================== TYPEWRITER ======================
function typewriterEffect() {
    const phrases = [
        "Front-End Developer",
        "UI/UX Enthusiast",
        "React Specialist",
        "JavaScript Expert",
        "Creative Coder"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById("typewriter");
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 60;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 300;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ====================== TOAST ======================
function showToast(message, icon = "✓") {
    const toast = document.getElementById("toast");
    toast.innerHTML = `${icon} ${message}`;
    toast.style.display = "flex";
    
    setTimeout(() => {
        toast.style.animation = "toastIn 0.4s ease reverse";
        setTimeout(() => {
            toast.style.display = "none";
            toast.style.animation = "";
        }, 300);
    }, 2800);
}

// ====================== HIRE ME BUTTON (still uses mailto) ======================
function setupHireMe() {
    const hireBtn = document.getElementById("hire-me-btn");
    
    hireBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        const subject = "Hiring Inquiry — Let's Work Together";
        const body = `Hi Alex,%0A%0AI'm reaching out because I'd love to discuss a potential project/opportunity with you.%0A%0A[Your details here]%0A%0ABest regards,%0A[Your Name]`;
        
        const mailtoLink = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailtoLink;
        
        showToast("Opening your email client...", "📧");
        
        setTimeout(() => {
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        }, 800);
    });
}

// ====================== CONTACT FORM - NOW SENDS REAL EMAIL ======================
function setupContactForm() {
    const form = document.getElementById("contact-form");
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (!name || !email || !message) {
            showToast("Please fill all required fields", "⚠️");
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector("button");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Send via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    name: name,
    email: email,
    title: subject,
    message: message,
    date: new Date().toLocaleString()   
})
            .then(() => {
                showToast("Message sent successfully! 🎉", "📤");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                showToast("Failed to send. Please try again.", "❌");
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ====================== ALL OTHER FUNCTIONS (unchanged) ======================
function setupBackToTop() { /* ... same as before ... */ }
function animateProgressBars() { /* ... same as before ... */ }
function setupCardTilt() { /* ... same as before ... */ }
function setupTechTags() { /* ... same as before ... */ }
function setupMobileNav() { /* ... same as before ... */ }
function smoothScrollLinks() { /* ... same as before ... */ }

function initializePortfolio() {
    console.log("%c🚀 Mithra Portfolio loaded successfully with JavaScript!", "color: #00d4ff; font-size: 14px; font-weight: bold");
    
    typewriterEffect();
    setupHireMe();
    setupContactForm();
    setupBackToTop();
    animateProgressBars();
    setupCardTilt();
    setupTechTags();
    setupMobileNav();
    smoothScrollLinks();
    
    console.log("✅ Real email sending is now active via EmailJS!");
}

window.addEventListener("load", initializePortfolio);