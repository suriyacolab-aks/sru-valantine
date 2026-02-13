// ============================================
// 💝 VALENTINE'S WEBSITE LOGIC 💝
// ============================================

const config = window.VALENTINE_CONFIG;

// ── Stage Navigation ──
let currentStage = 1;

function goToStage(n) {
    const current = document.getElementById(`stage${currentStage}`);
    const next = document.getElementById(`stage${n}`);
    if (!current || !next) return;

    current.classList.add('hidden');
    next.classList.remove('hidden');
    currentStage = n;

    if (n === 5) startFireworks('fireworksCanvas');
    if (n === 6) startFireworks('fireworksCanvas2');
}

// ── Floating Hearts ──
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💖', '💝', '💗', '💓', '💕', '🩷'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = 10 + Math.random() * 15 + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        container.appendChild(heart);
    }
}

// ============================================
// STAGE 1: INTRO — Sequential animation
// Like valentine-day-special: text appears, holds, fades, next text appears
// ============================================

function initIntro() {
    const area = document.getElementById('introTextArea');
    const sequence = [];

    // Step 1: Greeting
    sequence.push({
        html: `<span class="intro-greeting-text">${config.intro.greeting} ${config.intro.greetingEmoji || ''}</span>`,
        holdTime: 2500
    });

    // Steps 2+: Each line
    config.intro.lines.forEach(line => {
        let html;
        if (line.style === 'emphasis' && line.emphasisWord) {
            const text = line.text.replace(
                line.emphasisWord,
                `<strong>${line.emphasisWord}</strong>`
            );
            html = `<span class="intro-emphasis-text">${text}</span>`;
        } else if (line.style === 'big') {
            html = `<span class="intro-big-text">${line.text}</span>`;
        } else {
            html = `<span class="intro-normal-text">${line.text}</span>`;
        }
        sequence.push({ html, holdTime: 2500 });
    });

    // Final: Big reveal
    sequence.push({
        html: `<span class="intro-reveal-text">${config.intro.bigReveal}</span>`,
        holdTime: 2000,
        isFinal: true
    });

    let stepIndex = 0;

    function playStep() {
        if (stepIndex >= sequence.length) {
            // After all steps, go to Stage 2
            setTimeout(() => goToStage(2), 500);
            return;
        }

        const step = sequence[stepIndex];

        // Create the element
        const el = document.createElement('div');
        el.className = 'intro-animated';
        el.innerHTML = step.html;
        area.appendChild(el);

        // Small delay then animate in
        requestAnimationFrame(() => {
            el.classList.add('anim-in');
        });

        // After hold, animate out and then play next
        setTimeout(() => {
            el.classList.remove('anim-in');
            el.classList.add('anim-out');

            setTimeout(() => {
                el.remove();
                stepIndex++;
                playStep();
            }, 700); // wait for fade-out animation
        }, step.holdTime);
    }

    // Start the sequence after a brief pause
    setTimeout(playStep, 500);
}

// ============================================
// STAGE 2: First Question
// ============================================

function initFirstQuestion() {
    const q = config.firstQuestion;
    document.getElementById('q1Title').textContent = q.title;
    document.getElementById('q1Subtitle').textContent = q.subtitle;
    document.getElementById('q1Text').textContent = q.question;
    document.getElementById('yesBtn1').textContent = q.yesBtn;
    document.getElementById('noBtn1').textContent = q.noBtn;
}

let noClickCount = 0;

function handleNo(btn) {
    noClickCount++;
    const scale = Math.max(0.2, 1 - noClickCount * 0.15);
    btn.style.transform = `scale(${scale})`;
    if (scale <= 0.2) {
        btn.style.opacity = '0.3';
        btn.disabled = true;
    }
    // Grow the Yes button
    const yesBtn = document.getElementById('yesBtn1');
    const yesScale = 1 + noClickCount * 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.background = '#f06292';
    yesBtn.style.color = 'white';
}

function handleYes() {
    const yesBtn = document.getElementById('yesBtn1');
    yesBtn.style.transform = 'scale(1.5)';
    yesBtn.style.background = '#e91e63';
    yesBtn.style.color = 'white';
    setTimeout(() => goToStage(3), 600);
}

// ============================================
// STAGE 3: Valentine Question
// ============================================

function initValentineQuestion() {
    const q = config.valentineQuestion;
    document.getElementById('vTitle').textContent = q.title;
    document.getElementById('vHeart').textContent = q.heart;

    const hintEl = document.getElementById('vHint');
    if (q.hint) {
        hintEl.textContent = q.hint;
    } else {
        hintEl.style.display = 'none';
    }

    const grid = document.getElementById('optionsGrid');
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-label">${opt.label}</span>
            <span class="option-text">${opt.text}</span>
        `;
        btn.onclick = () => {
            btn.style.background = '#f8bbd0';
            btn.style.borderColor = '#e91e63';
            setTimeout(() => goToStage(4), 500);
        };
        grid.appendChild(btn);
    });
}

// ============================================
// STAGE 4: Love Meter
// ============================================

function initLoveMeter() {
    const m = config.loveMeter;
    document.getElementById('meterTitle').textContent = m.title;
    document.getElementById('meterStartText').textContent = m.startText;
    document.getElementById('meterNextBtn').textContent = m.nextBtn;

    const slider = document.getElementById('loveSlider');
    const valueDisplay = document.getElementById('meterValue');
    const messageEl = document.getElementById('meterMessage');

    slider.addEventListener('input', () => {
        const val = parseInt(slider.value);
        valueDisplay.textContent = val;

        if (val >= 5000) {
            messageEl.textContent = m.messages.extreme;
            messageEl.className = 'meter-message super';
        } else if (val > 1000) {
            messageEl.textContent = m.messages.veryHigh;
            messageEl.className = 'meter-message super';
        } else if (val > 100) {
            messageEl.textContent = m.messages.high;
            messageEl.className = 'meter-message';
        } else if (val > 30) {
            messageEl.textContent = m.messages.normal;
            messageEl.className = 'meter-message';
        } else if (val > 0) {
            messageEl.textContent = m.messages.low;
            messageEl.className = 'meter-message';
        } else {
            messageEl.className = 'meter-message hidden';
        }

        if (val > 100) {
            const overflow = (val - 100) / 9900;
            slider.style.width = `calc(100% + ${overflow * 100}px)`;
        } else {
            slider.style.width = '100%';
        }
    });
}

// ============================================
// STAGE 5: Celebration
// ============================================

function initCelebration() {
    const c = config.celebration;
    document.getElementById('celebTitle').textContent = c.title;
    document.getElementById('withLove').textContent = c.withLove;
    document.getElementById('letterBtn').textContent = c.letterBtn;

    const langList = document.getElementById('languagesList');
    c.languages.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'lang-item';
        div.style.animationDelay = `${i * 0.15}s`;
        div.innerHTML = `
            <p class="lang-label">${item.lang}</p>
            <p class="lang-text">${item.text}</p>
        `;
        langList.appendChild(div);
    });
}

// ============================================
// STAGE 6: Love Letter
// ============================================

function initLoveLetter() {
    const l = config.loveLetter;
    document.getElementById('letterTitle').textContent = l.title;
    document.getElementById('letterClosing').textContent = l.closing;

    const body = document.getElementById('letterBody');
    l.paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        body.appendChild(p);
    });
}

function closeLetter(e) {
    if (e.target.classList.contains('letter-overlay')) {
        document.getElementById('stage6').classList.add('hidden');
        document.getElementById('stage5').classList.remove('hidden');
        currentStage = 5;
    }
}

// ============================================
// Fireworks
// ============================================

function startFireworks(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#ff4081', '#ff80ab', '#f50057', '#ff1744', '#ffeb3b', '#ff9100', '#e040fb', '#7c4dff', '#69f0ae', '#40c4ff'];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = (Math.random() - 0.5) * 8;
            this.alpha = 1;
            this.decay = 0.012 + Math.random() * 0.015;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.size = 2 + Math.random() * 3;
            this.gravity = 0.05;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.alpha -= this.decay;
            this.size *= 0.98;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function explode(x, y) {
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function addSparkles() {
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            const p = new Particle(x, y);
            p.vx = (Math.random() - 0.5) * 1;
            p.vy = (Math.random() - 0.5) * 1;
            p.size = 1 + Math.random() * 2;
            p.decay = 0.02;
            particles.push(p);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) particles.splice(i, 1);
        }
        addSparkles();
        requestAnimationFrame(animate);
    }

    animate();

    function launchFirework() {
        explode(
            canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
            canvas.height * 0.15 + Math.random() * canvas.height * 0.35
        );
    }

    launchFirework();
    setInterval(launchFirework, 1200);
}

// ============================================
// Music Player
// ============================================

function setupMusic() {
    if (!config.music.enabled) {
        document.getElementById('musicControls').style.display = 'none';
        return;
    }

    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');
    const soundToggle = document.getElementById('soundToggle');

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.textContent = '🎵';
                musicToggle.style.borderColor = '#f48fb1';
            }).catch(() => { });
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🎵';
            musicToggle.style.borderColor = 'rgba(255,255,255,0.3)';
        }
    });

    soundToggle.addEventListener('click', () => {
        bgMusic.muted = !bgMusic.muted;
        soundToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    });

    if (config.music.autoplay) {
        bgMusic.play().catch(() => { });
    }
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.title = config.pageTitle;
    createFloatingHearts();
    initIntro();
    initFirstQuestion();
    initValentineQuestion();
    initLoveMeter();
    initCelebration();
    initLoveLetter();
    setupMusic();
});