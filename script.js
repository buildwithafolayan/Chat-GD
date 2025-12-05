// --- 1. THEME TOGGLE (LIGHT/DARK MODE) WITH PERSISTENCE ---
document.addEventListener('DOMContentLoaded', () => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
});

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    // Save to local storage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
}

function updateThemeIcon(isLight) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if(isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// --- 2. SCROLL REVEAL ANIMATION ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach((el) => {
    el.classList.add('hidden'); 
    observer.observe(el);
});

// --- 3. FAQ ACCORDION LOGIC ---
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(acc => {
    acc.addEventListener('click', function() {
        // Close others
        accordions.forEach(other => {
            if (other !== this && other.classList.contains('active')) {
                other.classList.remove('active');
                other.nextElementSibling.style.maxHeight = null;
            }
        });
        
        // Toggle current
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// --- 4. DYNAMIC PERSONA SELECTOR ---
const personas = {
    sensei: {
        icon: 'fa-user-astronaut',
        title: 'The Sensei',
        role: 'YOUR STRATEGIC MENTOR',
        desc: '🧠 <strong>The Big Brain.</strong> I help you see the big picture. Use me for business planning, negotiation tactics, and building long-term career roadmaps. <br><br>♟️ <em>Business Planning</em> (Strategy) <br>🤝 <em>Negotiation Tactics</em> (The art of the deal) <br>🗺️ <em>Career Roadmaps</em> (Building your empire). <br><br>"I don\'t just give answers; I give strategy."'
    },
    visionary: {
        icon: 'fa-lightbulb',
        title: 'The Visionary',
        role: 'YOUR CREATIVE MUSE',
        desc: '🎨 <strong>The Spark.</strong> Stuck on an idea? I generate out-of-the-box concepts, write compelling marketing copy, and help you break design norms. <br><br>💡 <em>Wild Concepts</em> (Ideation) <br>✍️ <em>Killer Copy</em> (That actually sells) <br>🎭 <em>Viral Angles</em> (Marketing hooks). <br><br>"Let\'s make something they can\'t ignore."'
    },
    architect: {
        icon: 'fa-code',
        title: 'The Architect',
        role: 'YOUR TECH EXPERT',
        desc: '🏗️ <strong>The Builder.</strong> Scalability is my priority. Ask me to review your code, design a database schema, or explain complex technical concepts in simple terms. <br><br>💻 <em>Code Review</em> (Debug & Optimize) <br>🗄️ <em>System Design</em> (Schema Design) <br>🔧 <em>Tech Simplified</em> (For non-techies). <br><br>"I build systems that last."'
    },
    guide: {
        icon: 'fa-heart',
        title: 'The Guide',
        role: 'YOUR WELLNESS COACH',
        desc: '🧘 <strong>The Anchor.</strong> Mental clarity is my priority. Ask me for mindfulness strategies, resilience training, or work-life balance advice. <br><br>🌿 <em>Mindfulness</em> (Stress reduction) <br>🛡️ <em>Resilience</em> (Mental toughness) <br>⚖️ <em>Balance</em> (Sustainable growth). <br><br>"Success requires a clear mind."'
    }
};

// Initialize the first persona on page load if element exists
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('persona-content')) {
        updatePersonaDisplay('sensei'); 
    }
});

function showPersona(key, event) {
    const buttons = document.querySelectorAll('.p-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Set active button
    let target = event ? event.currentTarget : buttons[0]; 
    if(target) target.classList.add('active');

    const display = document.getElementById('persona-content');
    if(!display) return;

    // 1. Start Fade Out
    display.style.opacity = 0;
    display.style.transform = "translateY(20px)";
    
    // 2. Wait for fade out, then swap text
    setTimeout(() => {
        updatePersonaDisplay(key);

        // 3. Fade In
        display.style.opacity = 1;
        display.style.transform = "translateY(0)";
    }, 250);
}

function updatePersonaDisplay(key) {
    const p = personas[key];
    const display = document.getElementById('persona-content');
    
    if (!p || !display) return;

    // Update Elements by Class Name
    display.querySelector('.persona-title').innerText = p.title;
    display.querySelector('.persona-role').innerHTML = p.role;
    display.querySelector('.persona-desc').innerHTML = p.desc;
    
    // Update Icon
    const icon = display.querySelector('.persona-icon');
    icon.className = `persona-icon fa-solid ${p.icon}`; 

    // Update Button
    const btn = display.querySelector('button');
    if(btn) btn.innerHTML = `Chat with ${p.title} &rarr;`;
}

// --- 5. CHAT POPUP TOGGLE ---
function toggleChatPopup() {
    const popup = document.getElementById('chatPopup');
    if(popup) popup.classList.toggle('active');
}

// --- 6. MOBILE MENU TOGGLE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); 
        hamburger.setAttribute('aria-expanded', isActive);
    });
}

function closeMenu() {
    if(navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if(hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
}

// --- 7. FORM SUBMISSION MOCKUP ---
const contactForm = document.querySelector('form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop page refresh
        
        // Simple Validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if(!input.value) isValid = false;
        });

        if(isValid) {
            // Simulate sending
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                submitBtn.innerText = "Message Sent! ✅";
                submitBtn.style.background = "var(--neon)";
                submitBtn.style.color = "black";
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = "1";
                    // Reset style if needed based on theme
                }, 3000);
            }, 1500);
        } else {
            alert("Please fill in all fields.");
        }
    });
}