// --- 1. THEME TOGGLE (LIGHT/DARK MODE) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
    
    // Initialize default persona if on index page
    if(document.getElementById('persona-content')) {
        updatePersonaDisplay('sensei'); 
    }
});

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
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
        accordions.forEach(other => {
            if (other !== this && other.classList.contains('active')) {
                other.classList.remove('active');
                other.nextElementSibling.style.maxHeight = null;
            }
        });
        
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// --- 4. DYNAMIC PERSONA SELECTOR (INDEX PAGE) ---
const personas = {
    sensei: {
        icon: 'fa-user-astronaut',
        title: 'The Sensei',
        role: 'YOUR STRATEGIC MENTOR',
        desc: 'I help you see the big picture. Use me for business planning, negotiation tactics, and building long-term career roadmaps. <br><br>♟️ <em>Business Planning</em> (Strategy) <br>🤝 <em>Negotiation Tactics</em> (The art of the deal) <br>🗺️ <em>Career Roadmaps</em> (Building your empire). <br><br>"I don\'t just give answers; I give strategy."'
    },
    visionary: {
        icon: 'fa-lightbulb',
        title: 'The Visionary',
        role: 'YOUR CREATIVE MUSE',
        desc: 'Stuck on an idea? I generate out-of-the-box concepts, write compelling marketing copy, and help you break design norms. <br><br>💡 <em>Wild Concepts</em> (Ideation) <br>✍️ <em>Killer Copy</em> (That actually sells) <br>🎭 <em>Viral Angles</em> (Marketing hooks). <br><br>"Let\'s make something they can\'t ignore."'
    },
    architect: {
        icon: 'fa-code',
        title: 'The Architect',
        role: 'YOUR TECH EXPERT',
        desc: 'Scalability is my priority. Ask me to review your code, design a database schema, or explain complex technical concepts in simple terms. <br><br>💻 <em>Code Review</em> (Debug & Optimize) <br>🗄️ <em>System Design</em> (Schema Design) <br>🔧 <em>Tech Simplified</em> (For non-techies). <br><br>"I build systems that last."'
    },
    guide: {
        icon: 'fa-heart',
        title: 'The Guide',
        role: 'YOUR WELLNESS COACH',
        desc: 'Burnout kills dreams. I am here to help you manage stress, practice mindfulness, and navigate personal challenges while you build your empire. <br><br>🌿 <em>Mindfulness</em> (Stress reduction) <br>🛡️ <em>Resilience</em> (Mental toughness) <br>⚖️ <em>Balance</em> (Sustainable growth). <br><br>"Success requires balance."'
    }
};

function showPersona(key, event) {
    const buttons = document.querySelectorAll('.p-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    let target = event ? event.currentTarget : buttons[0]; 
    if(target) target.classList.add('active');

    const display = document.getElementById('persona-content');
    if(!display) return;

    display.style.opacity = 0;
    display.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        updatePersonaDisplay(key);
        display.style.opacity = 1;
        display.style.transform = "translateY(0)";
    }, 250);
}

function updatePersonaDisplay(key) {
    const p = personas[key];
    const display = document.getElementById('persona-content');
    if (!p || !display) return;

    display.querySelector('.persona-title').innerText = p.title;
    display.querySelector('.persona-role').innerHTML = p.role;
    display.querySelector('.persona-desc').innerHTML = p.desc;
    
    const icon = display.querySelector('.persona-icon');
    icon.className = `persona-icon fa-solid ${p.icon}`; 

    const btn = display.querySelector('button');
    if(btn) {
        btn.innerHTML = `Chat with ${p.title} &rarr;`;
        btn.onclick = function() {
            toggleAIWidget();
            setTimeout(() => {
                addMessage(`System connection established with ${p.title}. How can I help?`, 'system');
            }, 500);
        };
    }
}

// --- 5. PERSONA FILTERING (PERSONAS PAGE) ---
function filterPersonas(category) {
    const cards = document.querySelectorAll('.persona-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Toggle Button Active State
    buttons.forEach(btn => btn.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            // Trigger animation
            card.style.animation = 'none';
            card.offsetHeight; /* trigger reflow */
            card.style.animation = 'fadeIn 0.5s';
        } else {
            card.style.display = 'none';
        }
    });
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

// --- 7. CONTACT FORM SIMULATION ---
const contactForm = document.querySelector('form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        inputs.forEach(input => { if(!input.value) isValid = false; });

        if(isValid) {
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
                }, 3000);
            }, 1500);
        } else {
            alert("Please fill in all fields.");
        }
    });
}

// --- 8. INTELLIGENT AI CHAT LOGIC (RECOMMENDATION FLOW) ---

const AI_CONFIG = {
    USE_REAL_AI: true, 
    GOOGLE_API_KEY: 'AIzaSyAS4op9mq77whTg_lZXPvrBEOxyYLBYCmc' 
};

// Toggle Widget
function toggleAIWidget() {
    const widget = document.getElementById('aiWidget');
    widget.classList.toggle('active');
    
    const chatBox = document.getElementById('chatMessages');
    
    // Check if chat is empty OR contains only whitespace (fix for "blank" issue)
    if(widget.classList.contains('active') && (!chatBox.innerHTML || chatBox.innerHTML.trim() === "")) {
        startChatFlow(); // Start the automated flow immediately
    }
}

document.querySelector('.chat-widget-trigger').onclick = toggleAIWidget;

// --- THE CONVERSATION FLOW ENGINE ---
const chatFlow = {
    start: {
        text: "System Online. I am Chat-GD. To assign the perfect expert to you, tell me: <strong>What is your current focus?</strong>",
        options: [
            { label: "Business Strategy ♟️", next: "business" },
            { label: "Creative & Design 🎨", next: "creative" },
            { label: "Tech & Coding 💻", next: "tech" },
            { label: "Personal Growth 🌿", next: "life" }
        ]
    },
    business: {
        text: "Understood. Strategy is key. What specifically do you need help with?",
        options: [
            { label: "Long-term Strategy", persona: "sensei" },
            { label: "Managing Operations", persona: "executive" },
            { label: "Closing Deals/Sales", persona: "closer" }
        ]
    },
    creative: {
        text: "Let's create something iconic. What's the blocker?",
        options: [
            { label: "Need New Ideas", persona: "visionary" },
            { label: "Writing Copy/Ads", persona: "scribe" },
            { label: "Visuals & UI", persona: "artist" }
        ]
    },
    tech: {
        text: "Systems and Code. Select your requirement:",
        options: [
            { label: "System Architecture", persona: "architect" },
            { label: "Fixing Bugs", persona: "debugger" },
            { label: "Smart Contracts", persona: "sentinel" }
        ]
    },
    life: {
        text: "Success requires balance. How can we support you?",
        options: [
            { label: "Mental Clarity", persona: "guide" },
            { label: "Fitness/Health", persona: "trainer" },
            { label: "Travel Planning", persona: "nomad" }
        ]
    }
};

const personaDetails = {
    sensei: { name: "The Sensei", icon: "fa-user-astronaut", desc: "Your Strategic Mentor." },
    executive: { name: "The Executive", icon: "fa-chess-queen", desc: "Operations Lead." },
    closer: { name: "The Closer", icon: "fa-briefcase", desc: "Sales Expert." },
    visionary: { name: "The Visionary", icon: "fa-lightbulb", desc: "Creative Muse." },
    scribe: { name: "The Scribe", icon: "fa-pen-fancy", desc: "Copy Chief." },
    artist: { name: "The Artist", icon: "fa-palette", desc: "Design Director." },
    architect: { name: "The Architect", icon: "fa-code", desc: "Tech Expert." },
    debugger: { name: "The Debugger", icon: "fa-bug", desc: "Code Fixer." },
    sentinel: { name: "The Sentinel", icon: "fa-shield-halved", desc: "Cyber Security." },
    guide: { name: "The Guide", icon: "fa-heart", desc: "Wellness Coach." },
    trainer: { name: "The Trainer", icon: "fa-dumbbell", desc: "Fitness Coach." },
    nomad: { name: "The Nomad", icon: "fa-plane", desc: "Travel Planner." }
};

function startChatFlow() {
    document.getElementById('chatMessages').innerHTML = ''; // Ensure clean slate
    const typingId = showTyping();
    setTimeout(() => {
        removeTyping(typingId);
        showFlowStep('start');
    }, 600); // Slight delay for realism
}

function showFlowStep(stepKey) {
    const step = chatFlow[stepKey];
    if(!step) return;
    addMessage(step.text, 'ai');
    addOptions(step.options);
}

function addOptions(options) {
    const chatBox = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-options-container';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = opt.label;
        btn.onclick = () => handleOptionClick(opt, div);
        div.appendChild(btn);
    });

    chatBox.appendChild(div);
    scrollToBottom();
}

function handleOptionClick(option, containerDiv) {
    containerDiv.remove();
    addMessage(option.label, 'user');
    const typingId = showTyping();
    scrollToBottom();

    setTimeout(() => {
        removeTyping(typingId);
        if (option.next) {
            showFlowStep(option.next);
        } else if (option.persona) {
            recommendPersona(option.persona);
        }
    }, 600);
}

function recommendPersona(personaKey) {
    const p = personaDetails[personaKey];
    const html = `
        <div class="chat-recommendation">
            <i class="fa-solid ${p.icon} rec-icon"></i>
            <h4 style="margin-bottom:5px; color:white;">${p.name}</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:10px;">${p.desc}</p>
            <div>I have assigned <strong>${p.name}</strong> to your dashboard.</div>
            <button class="rec-btn" onclick="activatePersona('${personaKey}')">Start Chatting</button>
        </div>
    `;
    const div = document.createElement('div');
    div.className = 'message ai-msg';
    div.innerHTML = `<div class="msg-content" style="background:transparent; border:none; padding:0;">${html}</div>`;
    document.getElementById('chatMessages').appendChild(div);
    scrollToBottom();
}

// --- UPDATED ACTIVATION LOGIC ---
function activatePersona(key) {
    // 1. Close the chat widget
    toggleAIWidget();
    
    // 2. Scroll to the pricing section smoothly
    const pricingSection = document.getElementById('pricing');
    if(pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

const inputField = document.getElementById('userInput');
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    inputField.value = '';

    const typingId = showTyping();
    scrollToBottom();

    setTimeout(() => {
        removeTyping(typingId);
        addMessage("I analyze data better through the selection menu. Please use the options above or click 'Chat with GD' to restart the flow.", 'ai');
    }, 1000);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}-msg`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if(sender === 'system') {
        div.style.alignSelf = 'center';
        div.style.fontSize = '0.8rem';
        div.style.color = 'var(--neon)';
        div.style.opacity = '0.8';
        div.innerHTML = text;
    } else {
        div.innerHTML = `<div class="msg-content">${formatText(text)}</div><div class="msg-time">${time}</div>`;
    }
    
    document.getElementById('chatMessages').appendChild(div);
    scrollToBottom();
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'message ai-msg typing-indicator';
    div.id = 'typing-' + Date.now();
    div.innerHTML = `<div class="msg-content"><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
    document.getElementById('chatMessages').appendChild(div);
    return div.id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
}

function scrollToBottom() { 
    const chatBox = document.getElementById('chatMessages');
    chatBox.scrollTop = chatBox.scrollHeight; 
}

function formatText(text) { 
    if(!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'); 
}