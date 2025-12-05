// --- 1. SCROLL REVEAL ANIMATION ---
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

// --- 2. FAQ ACCORDION LOGIC ---
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(acc => {
    acc.addEventListener('click', function() {
        // Close others (optional - keeps only one open at a time)
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

// --- 3. DYNAMIC PERSONA SELECTOR ---
const personas = {
    sensei: {
        icon: 'fa-user-astronaut',
        title: 'The Sensei',
        role: 'YOUR STRATEGIC MENTOR',
        desc: '🧠 <strong>The Big Brain.</strong> I help you see the map when others see chaos. Use me for: <br><br>♟️ <em>Business Chess</em> (Strategy) <br>🤝 <em>The Art of the Deal</em> (Negotiation) <br>🗺️ <em>Empire Building</em> (Long-term roadmaps). <br><br>"I don\'t just give answers; I give you the winning move."'
    },
    visionary: {
        icon: 'fa-lightbulb',
        title: 'The Visionary',
        role: 'YOUR CREATIVE MUSE',
        desc: '🎨 <strong>The Spark.</strong> Stuck on a blank page? I generate: <br><br>💡 <em>Wild Concepts</em> (Out-of-the-box ideas) <br>✍️ <em>Killer Copy</em> (That actually sells) <br>🎭 <em>Viral Angles</em> (Marketing hooks). <br><br>"Let\'s make something they can\'t ignore."'
    },
    architect: {
        icon: 'fa-code',
        title: 'The Architect',
        role: 'YOUR TECH EXPERT',
        desc: '🏗️ <strong>The Builder.</strong> Scalability is my religion. Ask me to: <br><br>💻 <em>Review Code</em> (Debug & Optimize) <br>🗄️ <em>Design Systems</em> (Database Schemas) <br>🔧 <em>Explain Complexity</em> (Tech for non-techies). <br><br>"I build systems that don\'t break."'
    },
    guide: {
        icon: 'fa-heart',
        title: 'The Guide',
        role: 'YOUR WELLNESS COACH',
        desc: '🧘 <strong>The Anchor.</strong> Burnout kills dreams. I am here for: <br><br>🌿 <em>Mindfulness</em> (Stress reduction) <br>🛡️ <em>Resilience</em> (Mental toughness) <br>⚖️ <em>Balance</em> (Work-Life harmony). <br><br>"Success requires a clear mind."'
    }
};

function showPersona(key, event) {
    const buttons = document.querySelectorAll('.p-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find button to activate
    let target = event ? event.currentTarget : buttons[0]; 
    if(target) target.classList.add('active');

    const p = personas[key];
    const display = document.getElementById('persona-content');
    
    // 1. Fade out current content
    display.style.opacity = 0;
    display.style.transform = "translateY(20px)";
    
    // 2. Swap content & Fade In after brief delay
    setTimeout(() => {
        display.innerHTML = `
            <i class="fa-solid ${p.icon}" style="font-size:4rem; color:var(--neon); margin-bottom:25px; filter:drop-shadow(0 0 15px var(--neon-glow));"></i>
            <h3 style="color:var(--text-main); font-size:2.5rem; margin-bottom:10px; font-weight:800;">${p.title}</h3>
            <p class="text-neon uppercase" style="margin-bottom:25px; letter-spacing:2px; font-weight:800;">${p.role}</p>
            <p style="color:var(--text-muted); font-size:1.1rem; line-height: 1.7; max-width: 90%;">${p.desc}</p>
            <button class="btn-nav" style="margin-top:40px; align-self:flex-start; padding:15px 30px;">Chat with ${p.title} &rarr;</button>
        `;
        // Trigger reflow/repaint for transition
        display.style.opacity = 1;
        display.style.transform = "translateY(0)";
    }, 250);
}

// --- 4. CHAT POPUP TOGGLE ---
function toggleChatPopup() {
    const popup = document.getElementById('chatPopup');
    popup.classList.toggle('active');
}

// --- 5. MOBILE MENU TOGGLE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); 
    });
}

// Helper to close menu when a link is clicked
function closeMenu() {
    if(navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if(hamburger) hamburger.classList.remove('active');
    }
}

// --- 6. THEME TOGGLE (LIGHT/DARK MODE) ---
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if(document.body.classList.contains('light-mode')) {
            // Switch to Sun icon
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            // Switch back to Moon icon
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}