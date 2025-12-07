// --- CONFIGURATION ---
// 1. Get your FREE key here: https://aistudio.google.com/app/apikey
// 2. Paste it below inside the quotes.
const API_KEY = "AIzaSyCmr8TCjS-6o1kkIKLqjfnfTAQiC75Ps9M"; 
const DAILY_LIMIT = 10; 

// --- 1. THEME TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
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

// --- 2. SCROLL REVEAL ---
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

// --- 3. FAQ ACCORDION ---
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
        panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
    });
});

// --- 4. DYNAMIC PERSONA SELECTOR ---
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
    if(event) event.currentTarget.classList.add('active');

    const display = document.getElementById('persona-content');
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
    display.querySelector('.persona-title').innerText = p.title;
    display.querySelector('.persona-role').innerHTML = p.role;
    display.querySelector('.persona-desc').innerHTML = p.desc;
    const icon = display.querySelector('.persona-icon');
    icon.className = `persona-icon fa-solid ${p.icon}`; 

    const btn = display.querySelector('button');
    btn.innerHTML = `Chat with ${p.title} &rarr;`;
    btn.onclick = function() {
        toggleAIWidget();
        setTimeout(() => {
            // Activate directly
            currentPersona = key;
            const name = personaDetails[key].name;
            addMessage(`<strong>${name} Connected.</strong> Ready for high-level analysis.`, 'ai');
        }, 500);
    };
}

// --- 5. PERSONA FILTERING ---
function filterPersonas(category) {
    const cards = document.querySelectorAll('.persona-card');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            card.style.animation = 'none';
            card.offsetHeight; 
            card.style.animation = 'fadeIn 0.5s';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- 6. MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if(hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });
}
function closeMenu() {
    navLinks.classList.remove('active');
}

// --- 7. CONTACT FORM ---
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
            setTimeout(() => {
                submitBtn.innerText = "Message Sent! ✅";
                submitBtn.style.background = "var(--neon)";
                submitBtn.style.color = "black";
                contactForm.reset();
                setTimeout(() => { submitBtn.innerText = originalText; }, 3000);
            }, 1500);
        } else {
            alert("Please fill in all fields.");
        }
    });
}

// ======================================================
// ===  SUPERCHARGED AI ENGINE (High Level Thinking)  ===
// ======================================================

const AI_CONFIG = {
    // ⚠️ Ensure your API key is valid. The simulator runs if the key is invalid.
    MODEL_NAME: "gemini-1.5-flash"
};

// --- SOPHISTICATED SYSTEM PROMPTS ---
const SYSTEM_PROMPTS = {
    sensei: `
        You are 'The Sensei'. You are a world-class business strategist and mentor (like a mix of Peter Thiel and Sun Tzu).
        
        GUIDELINES:
        1. **Deep Analysis**: Never give generic advice. Use mental models (First Principles, Leverage, 80/20 Rule, Moats).
        2. **Strategic Tone**: Speak with authority, wisdom, and brevity. Be brutal but constructive.
        3. **Structure**: Use bold text for key concepts. Use bullet points for steps.
        4. **Goal**: Help the user build a scalable empire, not a small job.
        
        If asked about business ideas, analyze Unit Economics and Distribution Channels immediately.
    `,
    executive: `
        You are 'The Executive'. You are a high-performance Operations Lead (COO level).
        
        GUIDELINES:
        1. **Focus on Efficiency**: Your goal is speed, automation, and removing bottlenecks.
        2. **Direct Tone**: No fluff. Be crisp, professional, and action-oriented.
        3. **Frameworks**: Use GTD (Getting Things Done), OKRs, and Agile methodologies.
        4. **Output**: Always provide a numbered action plan (Step 1, Step 2, Step 3).
    `,
    closer: `
        You are 'The Closer'. You are an elite Sales Expert (like Alex Hormozi or Jordan Belfort).
        
        GUIDELINES:
        1. **Psychology First**: Focus on the prospect's pain points and desired outcome.
        2. **Scripts**: Provide specific, word-for-word scripts the user can copy.
        3. **Handling Objections**: aggressive but empathetic. Turn "No" into "Yes".
        4. **Tone**: High energy, confident, persuasive.
    `,
    visionary: `
        You are 'The Visionary'. You are a Creative Director and Brand Genius (like Steve Jobs or Ogilvy).
        
        GUIDELINES:
        1. **Differentiation**: Hate boring. Push the user to be polarizing and unique.
        2. **Viral Thinking**: Focus on hooks, pattern interrupts, and storytelling.
        3. **Tone**: Inspirational, slightly rebellious, artistic.
        4. **Output**: Give 3 distinct, wild ideas for every request.
    `,
    architect: `
        You are 'The Architect'. You are a Senior Staff Engineer at a FAANG company.
        
        GUIDELINES:
        1. **Scalability**: Always think about 10x or 100x scale.
        2. **Trade-offs**: Explain the pros and cons of tech choices (e.g., SQL vs NoSQL).
        3. **Tone**: Analytical, precise, technical (but explain simply).
        4. **Safety**: Prioritize security and clean code structure.
    `,
    guide: `
        You are 'The Guide'. You are a High-Performance Wellness Coach for Founders.
        
        GUIDELINES:
        1. **Sustainable Success**: Success is useless if you burn out. Prioritize sleep, focus, and mental clarity.
        2. **Tone**: Empathetic, calm, grounding.
        3. **Techniques**: Suggest specific breathing exercises, stoic philosophy, or boundary setting techniques.
    `,
    default: `
        You are Chat-GD, the AI Operating System for Founders. 
        You are highly intelligent, concise, and focused on helping the user build, launch, and scale. 
        Never be generic. Always offer a unique insight.
    `
};

let currentPersona = "default";

// --- LIMITS ---
function checkDailyLimit() {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = 'chat_gd_usage_v2';
    let usage = JSON.parse(localStorage.getItem(storageKey)) || { date: today, count: 0 };
    if (usage.date !== today) { usage = { date: today, count: 0 }; localStorage.setItem(storageKey, JSON.stringify(usage)); }
    return usage.count;
}
function incrementUsage() {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = 'chat_gd_usage_v2';
    let usage = JSON.parse(localStorage.getItem(storageKey)) || { date: today, count: 0 };
    usage.count++;
    localStorage.setItem(storageKey, JSON.stringify(usage));
}

// --- WIDGET LOGIC ---
function toggleAIWidget() {
    const widget = document.getElementById('aiWidget');
    widget.classList.toggle('active');
    const chatBox = document.getElementById('chatMessages');
    if(widget.classList.contains('active') && (!chatBox.innerHTML || chatBox.innerHTML.trim() === "")) {
        startChatFlow(); 
    }
}
document.querySelector('.chat-widget-trigger').onclick = toggleAIWidget;

// --- FLOW DATA ---
const chatFlow = {
    start: {
        text: "System Online. I am Chat-GD. To assign the perfect expert, tell me: <strong>What is your current focus?</strong>",
        options: [
            { label: "Business Strategy ♟️", next: "business" },
            { label: "Creative & Design 🎨", next: "creative" },
            { label: "Tech & Coding 💻", next: "tech" },
            { label: "Personal Growth 🌿", next: "life" }
        ]
    },
    business: { text: "Strategy is key. Who do you need?", options: [{ label: "The Sensei (Strategy)", persona: "sensei" }, { label: "The Executive (Ops)", persona: "executive" }, { label: "The Closer (Sales)", persona: "closer" }] },
    creative: { text: "Let's create. Who do you need?", options: [{ label: "The Visionary (Ideas)", persona: "visionary" }, { label: "The Scribe (Copy)", persona: "scribe" }] },
    tech: { text: "Systems Online. Select expert:", options: [{ label: "The Architect (System Design)", persona: "architect" }, { label: "The Sentinel (Security)", persona: "sentinel" }] },
    life: { text: "Balance is essential.", options: [{ label: "The Guide (Wellness)", persona: "guide" }] }
};

const personaDetails = {
    sensei: { name: "The Sensei", icon: "fa-user-astronaut", desc: "Strategic Mentor" },
    executive: { name: "The Executive", icon: "fa-chess-queen", desc: "Operations Lead" },
    closer: { name: "The Closer", icon: "fa-briefcase", desc: "Sales Expert" },
    visionary: { name: "The Visionary", icon: "fa-lightbulb", desc: "Creative Muse" },
    scribe: { name: "The Scribe", icon: "fa-pen-fancy", desc: "Copy Chief" },
    architect: { name: "The Architect", icon: "fa-code", desc: "Tech Expert" },
    sentinel: { name: "The Sentinel", icon: "fa-shield-halved", desc: "Cyber Security" },
    guide: { name: "The Guide", icon: "fa-heart", desc: "Wellness Coach" },
    default: { name: "Chat-GD", icon: "fa-robot", desc: "AI Assistant" }
};

// --- FLOW FUNCTIONS ---
function startChatFlow() {
    document.getElementById('chatMessages').innerHTML = '';
    const typingId = showTyping();
    setTimeout(() => { removeTyping(typingId); showFlowStep('start'); }, 600);
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
        if (option.next) showFlowStep(option.next);
        else if (option.persona) recommendPersona(option.persona);
    }, 600);
}
function recommendPersona(personaKey) {
    const p = personaDetails[personaKey] || personaDetails.default;
    const html = `
        <div class="chat-recommendation">
            <i class="fa-solid ${p.icon} rec-icon"></i>
            <h4 style="margin-bottom:5px; color:white;">${p.name}</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:10px;">${p.desc}</p>
            <div>I have assigned <strong>${p.name}</strong> to your dashboard.</div>
            <button class="rec-btn" onclick="initializePersona('${personaKey}')">Start Chatting</button>
        </div>
    `;
    const div = document.createElement('div');
    div.className = 'message ai-msg';
    div.innerHTML = `<div class="msg-content" style="background:transparent; border:none; padding:0;">${html}</div>`;
    document.getElementById('chatMessages').appendChild(div);
    scrollToBottom();
}

function initializePersona(key) {
    currentPersona = key;
    const p = personaDetails[key] || personaDetails.default;
    addMessage(`<strong>${p.name} Connected.</strong> Ready to analyze. What is your input?`, 'ai');
}

// --- MESSAGING & API ---
const inputField = document.getElementById('userInput');
inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
document.getElementById('sendBtn').addEventListener('click', handleUserMessage);

async function handleUserMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    if (checkDailyLimit() >= DAILY_LIMIT) {
        addMessage(text, 'user');
        inputField.value = '';
        setTimeout(() => {
            const html = `
                <div class="chat-recommendation" style="border-color:#ff3333;">
                    <i class="fa-solid fa-lock rec-icon" style="color:#ff3333;"></i>
                    <h4 style="margin-bottom:5px; color:white;">Daily Limit Reached</h4>
                    <p style="font-size:0.8rem; color:#aaa; margin-bottom:10px;">You used your ${DAILY_LIMIT} free messages.</p>
                    <button class="rec-btn" style="background:#ff3333; color:white;" onclick="activatePersona()">Upgrade to Pro</button>
                </div>`;
            const div = document.createElement('div');
            div.className = 'message ai-msg';
            div.innerHTML = `<div class="msg-content" style="background:transparent; border:none; padding:0;">${html}</div>`;
            document.getElementById('chatMessages').appendChild(div);
            scrollToBottom();
        }, 500);
        return;
    }

    addMessage(text, 'user');
    inputField.value = '';
    const typingId = showTyping();
    scrollToBottom();

    try {
        const aiResponse = await callGeminiAPI(text);
        removeTyping(typingId);
        addMessage(aiResponse, 'ai');
        incrementUsage();
    } catch (error) {
        removeTyping(typingId);
        // SMART SIMULATION IF API FAILS
        const fakeResponse = simulateSmartResponse(currentPersona, text);
        addMessage(fakeResponse, 'ai');
        incrementUsage(); 
    }
}

// --- SMART SIMULATOR (If API Key is Invalid/Missing) ---
function simulateSmartResponse(persona, text) {
    const t = text.toLowerCase();
    
    if (persona === 'sensei') {
        return "To analyze this strategic move, we must look at your **Unit Economics** and **Competitive Moat**. <br><br>1. **Leverage:** How can you achieve this result with 50% less effort? <br>2. **Distribution:** Do you have a channel advantage? <br><br>Focus on high-leverage activities only.";
    }
    if (persona === 'closer') {
        return "Here is a script to handle that objection: <br><br><em>'I completely understand. Most of our best clients felt the same way until they saw [Result]. If we could guarantee [Outcome], would you be open to a 5-minute demo?'</em><br><br>Use silence after asking the question.";
    }
    if (persona === 'architect') {
        return "From a systems perspective, you are introducing complexity too early. <br><br>I recommend a **Monolithic Architecture** for the MVP to reduce latency and dev time. Switch to Microservices only when you hit 100k DAU. Focus on database indexing now.";
    }
    
    return "I have analyzed your request. To provide a high-fidelity answer, I need to know your specific constraints. <br><br>However, generally speaking: **Focus on speed of execution over perfection.** Would you like a step-by-step plan?";
}

// --- API CALL ---
async function callGeminiAPI(userText) {
    if (!API_KEY || API_KEY.startsWith("PASTE")) throw new Error("Missing Key");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    // Inject the High-Level Persona Brain
    const systemInstruction = SYSTEM_PROMPTS[currentPersona] || SYSTEM_PROMPTS.default;
    const fullPrompt = `${systemInstruction}\n\nIMPORTANT: Be concise, smart, and use markdown formatting.\n\nUser: ${userText}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }]
        })
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// --- UTILS ---
function activatePersona() {
    document.getElementById('aiWidget').classList.remove('active');
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}-msg`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if(sender === 'system') {
        div.style.alignSelf = 'center'; div.style.color = '#ff3333'; div.style.fontSize = '0.8rem';
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

function removeTyping(id) { const el = document.getElementById(id); if(el) el.remove(); }
function scrollToBottom() { const chatBox = document.getElementById('chatMessages'); chatBox.scrollTop = chatBox.scrollHeight; }
function formatText(text) { if(!text) return ""; return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'); }