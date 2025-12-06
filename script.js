// --- 1. THEME TOGGLE (LIGHT/DARK MODE) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
    
    // Initialize default persona
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

// --- 5. MOBILE MENU TOGGLE ---
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

// --- 6. CONTACT FORM SIMULATION ---
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

// --- 7. INTELLIGENT AI CHAT LOGIC (HYBRID SYSTEM) ---

const AI_CONFIG = {
    // 1. Set to TRUE to use your Gemini Key
    USE_REAL_AI: true, 
    // 2. Your Gemini Key
    GOOGLE_API_KEY: 'AIzaSyAS4op9mq77whTg_lZXPvrBEOxyYLBYCmc' 
};

// Toggle Widget
function toggleAIWidget() {
    const widget = document.getElementById('aiWidget');
    widget.classList.toggle('active');
    
    if(widget.classList.contains('active')) {
        setTimeout(() => document.getElementById('userInput').focus(), 300);
    }
}

document.querySelector('.chat-widget-trigger').onclick = toggleAIWidget;

// Send Message Logic
const inputField = document.getElementById('userInput');
const chatBox = document.getElementById('chatMessages');

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'user');
    inputField.value = '';

    // 2. Show Typing Indicator
    const typingId = showTyping();
    scrollToBottom();

    // 3. ATTEMPT REAL AI CONNECTION
    if (AI_CONFIG.USE_REAL_AI) {
        try {
            const response = await fetchGeminiAI(text);
            removeTyping(typingId);
            
            // Check for specific triggers in the AI's response (or user's intent)
            handleCommandTriggers(text, response);
            
            addMessage(response, 'ai');
        } catch (error) {
            console.warn("AI Connection failed (CORS/Auth). Switching to Backup Logic.", error);
            // SILENT FAILOVER: Run Mock AI instead of showing error
            runMockFallback(text, typingId); 
        }
    } else {
        runMockFallback(text, typingId);
    }
}

// --- ACTION HANDLER: This makes the "Yes" button work ---
function handleCommandTriggers(userText, aiText) {
    const lowerUser = userText.toLowerCase();
    
    // If user says "Yes" to the portal question
    if (lowerUser.includes('yes') || lowerUser.includes('sure') || lowerUser.includes('take me')) {
        setTimeout(() => {
            // Close widget on mobile so they can see the section
            if(window.innerWidth < 768) toggleAIWidget();
            
            // Scroll to pricing
            document.querySelector('#pricing').scrollIntoView({behavior: 'smooth'});
        }, 1500); // Wait 1.5s after AI speaks to scroll
    }
}

// Fallback Function (Mock AI)
function runMockFallback(text, typingId) {
    if(document.getElementById(typingId)) removeTyping(typingId);
    
    const newType = showTyping();
    scrollToBottom();
    
    setTimeout(() => {
        removeTyping(newType);
        const response = getMockResponse(text);
        
        // Check for redirects in Mock mode too
        handleCommandTriggers(text, response);
        
        addMessage(response, 'ai');
    }, 1000 + Math.random() * 500);
}

// --- REAL AI FUNCTION (GOOGLE GEMINI 1.5 FLASH) ---
async function fetchGeminiAI(userText) {
    // Note: Using gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AI_CONFIG.GOOGLE_API_KEY}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ 
                    text: `You are Chat-GD, a high-tech AI operating system for a SaaS platform. 
                    Your tone is professional, slightly futuristic (Cyberpunk), and concise.
                    
                    CRITICAL INSTRUCTION: If the user asks to sign up, see the price, or go to the portal, 
                    you MUST say: "Access code accepted. Initiating transfer to the Main Portal."
                    
                    User says: ${userText}` 
                }]
            }]
        })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if(data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Invalid Data Structure");
    }
}

// --- MOCK AI FUNCTION (ROBUST BACKUP) ---
function getMockResponse(input) {
    input = input.toLowerCase();
    
    // Redirect Logic
    if (input.includes('yes') || input.includes('sure') || input.includes('ok')) {
        return "Access code accepted. Initiating transfer to the **Main Portal**...";
    }

    // Sales Logic
    if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
        return "Our **Pro Plan** is currently $8/mo (Limited Time). Shall I take you to the signup portal?";
    }
    // Greeting
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return "Systems Online. I am Chat-GD. I can assist with Business Strategy, Coding, or Content Creation. What is your directive?";
    }
    // Features
    if (input.includes('persona') || input.includes('who')) {
        return "We have 24 distinct personas. **The Sensei** for strategy, **The Architect** for code, and **The Visionary** for ideas. Which one do you require?";
    }
    // Default
    return "I am analyzing that request... To give you the best answer, I recommend signing into the full <a href='#pricing' style='color:var(--neon); text-decoration:underline;'>Chat-GD Portal</a> for deep-dive analysis. Shall I take you there?";
}

// UI Helpers
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
    
    chatBox.appendChild(div);
    scrollToBottom();
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'message ai-msg typing-indicator';
    div.id = 'typing-' + Date.now();
    div.innerHTML = `<div class="msg-content"><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
    chatBox.appendChild(div);
    return div.id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
}

function scrollToBottom() { chatBox.scrollTop = chatBox.scrollHeight; }

function formatText(text) { 
    if(!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\n/g, '<br>'); 
}