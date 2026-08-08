// ================================================================
// PARTICLES BACKGROUND
// ================================================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29,111,255,${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(29,111,255,${0.03 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ================================================================
// SOUND DASHBOARD
// ================================================================
const dashboardSound = document.getElementById('dashboardSound');
let isDashboardPlaying = false;

function playDashboardSound() {
    if (isDashboardPlaying) return;
    try {
        isDashboardPlaying = true;
        dashboardSound.currentTime = 0;
        dashboardSound.loop = true;
        dashboardSound.play().catch(() => {});
    } catch (e) {}
}

// ================================================================
// SPLASH SCREEN
// ================================================================
const splashScreen = document.getElementById('splashScreen');
const mainContent = document.getElementById('mainContent');
const skipBtn = document.getElementById('skipBtn');
const splashVideo = document.getElementById('splashVideo');
let isDashboardShown = false;

window.showMain = function() {
    if (isDashboardShown) return;
    isDashboardShown = true;
    setTimeout(() => { playDashboardSound(); }, 1000);
    splashScreen.style.transition = 'opacity 0.5s ease';
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
        loadPage('sosmed');
    }, 500);
};

splashVideo.addEventListener('ended', window.showMain);
if (skipBtn) skipBtn.addEventListener('click', window.showMain);

// ================================================================
// PAGE LOADER
// ================================================================
const pageContainer = document.getElementById('pageContainer');
const tabBtns = document.querySelectorAll('.tab-btn');

const pages = {
    sosmed: `
        <div class="hint-box">
            <span class="icon">💡</span>
            <div class="text"><strong>Tempelin link</strong> video dari sosmed, klik download.
                <div class="examples">
                    <span onclick="setExample('https://vm.tiktok.com/ZS4VPSg5F/')">TikTok</span>
                    <span onclick="setExample('https://www.instagram.com/reel/xxxxx/')">IG</span>
                    <span onclick="setExample('https://x.com/qrivasi/status/1958338070765592805')">X</span>
                    <span onclick="setExample('https://youtu.be/xxxxx')">YouTube</span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input type="url" id="sosmedInput" placeholder="https://www.tiktok.com/..." />
            <button id="sosmedBtn">⬇ DOWNLOAD</button>
        </div>
        <div id="sosmedResult" class="result">
            <div id="sosmedLoading" class="loading"><div class="spinner"></div><div>Mengambil data...</div></div>
            <div id="sosmedContent"></div>
        </div>
    `,
    music: `
        <div class="hint-box">
            <span class="icon">🎵</span>
            <div class="text"><strong>Cari judul lagu</strong> atau artis, nanti gue kasih link download MP3 + rekomendasi.
                <div class="examples">
                    <span onclick="setMusicExample('komang')">Komang</span>
                    <span onclick="setMusicExample('dangdut koplo')">Dangdut</span>
                    <span onclick="setMusicExample('bohemian rhapsody')">Bohemian</span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input type="text" id="musicInput" placeholder="Cari judul lagu..." />
            <button id="musicBtn">🎵 SEARCH</button>
        </div>
        <div id="musicResult" class="result">
            <div id="musicLoading" class="loading"><div class="spinner"></div><div>Mencari lagu...</div></div>
            <div id="musicContent"></div>
        </div>
    `,
    chat: `
        <div class="hint-box">
            <span class="icon">🤖</span>
            <div class="text"><strong>Tanya apa aja</strong> ke AI Gemini, gratis tanpa ribet.
                <div class="examples">
                    <span onclick="setAiExample('Halo, apa kabar?')">Sapa</span>
                    <span onclick="setAiExample('Apa itu black hole?')">Sains</span>
                    <span onclick="setAiExample('Buatkan puisi tentang malam')">Puisi</span>
                </div>
            </div>
        </div>
        <div class="chat-container">
            <div class="chat-messages" id="chatMessages">
                <div class="chat-msg bot"><div class="msg-bubble">Halo! Ada yang bisa saya bantu? 😊</div><div class="msg-time">Sekarang</div></div>
            </div>
            <div class="input-group chat-input-group">
                <input type="text" id="aiInput" placeholder="Tanya apa aja..." />
                <button id="aiBtn">✈️ Kirim</button>
            </div>
        </div>
    `,
    lyric: `
        <div class="hint-box">
            <span class="icon">📝</span>
            <div class="text"><strong>Cari lirik lagu</strong> berdasarkan judul atau artis.
                <div class="examples">
                    <span onclick="setLyricExample('komang')">Komang</span>
                    <span onclick="setLyricExample('bohemian rhapsody')">Bohemian</span>
                    <span onclick="setLyricExample('imagine')">Imagine</span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input type="text" id="lyricInput" placeholder="Cari lirik lagu..." />
            <button id="lyricBtn">📝 CARI</button>
        </div>
        <div id="lyricResult" class="result">
            <div id="lyricLoading" class="loading"><div class="spinner"></div><div>Mencari lirik...</div></div>
            <div id="lyricContent"></div>
        </div>
    `
};

function loadPage(page) {
    pageContainer.innerHTML = pages[page] || pages.sosmed;
    // Re-attach event listeners
    if (page === 'sosmed') {
        const input = document.getElementById('sosmedInput');
        const btn = document.getElementById('sosmedBtn');
        if (btn) btn.addEventListener('click', processSosmed);
        if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processSosmed(); });
    } else if (page === 'music') {
        const input = document.getElementById('musicInput');
        const btn = document.getElementById('musicBtn');
        if (btn) btn.addEventListener('click', processMusic);
        if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processMusic(); });
    } else if (page === 'chat') {
        const input = document.getElementById('aiInput');
        const btn = document.getElementById('aiBtn');
        if (btn) btn.addEventListener('click', processAI);
        if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processAI(); });
    } else if (page === 'lyric') {
        const input = document.getElementById('lyricInput');
        const btn = document.getElementById('lyricBtn');
        if (btn) btn.addEventListener('click', processLyric);
        if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processLyric(); });
    }
}

// ===== TAB NAV =====
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPage(btn.dataset.page);
    });
});

// ================================================================
// API FUNCTIONS
// ================================================================
const API_AIO = 'https://api.znn.my.id/aio';
const API_PLAY = 'https://api.znn.my.id/play';
const API_GEMINI = 'https://api.znn.my.id/gemini-chat';
const API_LYRIC = 'https://api.znn.my.id/lyric';

function detectPlatform(url) {
    if (!url) return 'Unknown';
    const u = url.toLowerCase();
    if (u.includes('instagram.com') || u.includes('instagr.am')) return 'Instagram';
    if (u.includes('tiktok.com') || u.includes('vt.tiktok')) return 'TikTok';
    if (u.includes('youtube.com') || u.includes('youtu.be')) return 'YouTube';
    if (u.includes('x.com') || u.includes('twitter.com')) return 'Twitter/X';
    if (u.includes('facebook.com') || u.includes('fb.com')) return 'Facebook';
    if (u.includes('pinterest.com') || u.includes('pin.it')) return 'Pinterest';
    return 'Unknown';
}

function showError(container, msg) {
    container.innerHTML = `<div class="error-msg">${msg}</div>`;
}

// ===== SOSMED =====
window.setExample = function(url) {
    const input = document.getElementById('sosmedInput');
    if (input) input.value = url;
    processSosmed();
};

async function processSosmed() {
    const input = document.getElementById('sosmedInput');
    const result = document.getElementById('sosmedResult');
    const loading = document.getElementById('sosmedLoading');
    const content = document.getElementById('sosmedContent');
    const btn = document.getElementById('sosmedBtn');
    
    const url = input?.value.trim();
    if (!url) return showError(content, 'Masukkan URL dulu, bego!');
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return showError(content, 'URL harus pake http:// atau https://, kontol!');
    }
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Loading...'; }
    try {
        const response = await fetch(`${API_AIO}?url=${encodeURIComponent(url)}`);
        const raw = await response.json();
        if (!response.ok) throw new Error(raw.message || raw.error || `Gagal: ${response.status}`);
        let normalized = { platform: detectPlatform(url), _raw: raw };
        if (raw && typeof raw === 'object') {
            if (raw.platform) normalized.platform = raw.platform;
            if (raw.title) normalized.title = raw.title;
            if (raw.thumbnail) normalized.thumbnail = raw.thumbnail;
            if (raw.duration) normalized.duration = raw.duration;
            const d = raw.data || {};
            if (d.video || d.videoWM || d.audio || d.download_url) normalized._raw = raw;
        }
        loading.style.display = 'none';
        content.innerHTML = renderSosmedResult(normalized);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, `❌ ${err.message}`);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '⬇ DOWNLOAD'; }
    }
}

function renderSosmedResult(data) {
    let html = '<div class="card">';
    if (data.thumbnail) html += `<img class="thumbnail" src="${data.thumbnail}" alt="Thumbnail" onerror="this.style.display='none'">`;
    html += `<div class="info"><strong>Platform</strong> <span class="platform-tag">${data.platform || 'Unknown'}</span></div>`;
    if (data.title) html += `<div class="info"><strong>Judul</strong> ${data.title}</div>`;
    if (data.duration) html += `<div class="info"><strong>Durasi</strong> ${data.duration}</div>`;
    html += '<div class="download-buttons">';
    const raw = data._raw || {};
    const d = raw.data || {};
    if (d.video) html += `<a href="${d.video}" target="_blank" class="video">▶ Video (No WM)</a>`;
    if (d.videoWM) html += `<a href="${d.videoWM}" target="_blank" class="video">💧 Video (WM)</a>`;
    if (d.audio) html += `<a href="${d.audio}" target="_blank" class="audio">🎵 Audio</a>`;
    if (d.download_url) html += `<a href="${d.download_url}" target="_blank" class="video">⬇ Download</a>`;
    html += '</div></div>';
    return html;
}

// ===== MUSIC =====
window.setMusicExample = function(query) {
    const input = document.getElementById('musicInput');
    if (input) input.value = query;
    processMusic();
};

async function processMusic() {
    const input = document.getElementById('musicInput');
    const result = document.getElementById('musicResult');
    const loading = document.getElementById('musicLoading');
    const content = document.getElementById('musicContent');
    const btn = document.getElementById('musicBtn');
    
    const q = input?.value.trim();
    if (!q) return showError(content, 'Masukkan judul lagu dulu, bego!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    try {
        const response = await fetch(`${API_PLAY}?q=${encodeURIComponent(q)}`);
        const raw = await response.json();
        if (!response.ok) throw new Error(raw.message || raw.error || `Gagal: ${response.status}`);
        if (raw.status !== true) throw new Error(raw.message || 'Lagu tidak ditemukan');
        loading.style.display = 'none';
        content.innerHTML = renderMusicResult(raw);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, `❌ ${err.message}`);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '🎵 SEARCH'; }
    }
}

function renderMusicResult(data) {
    const result = data.result || {};
    const others = data.otherResults || [];
    let html = '<div class="card">';
    if (result.title || result.mp3) {
        html += `<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.04);">`;
        html += `<div style="font-size:11px;color:rgba(255,255,255,0.2);margin-bottom:8px;">🎯 HASIL UTAMA</div>`;
        if (result.thumbnail) html += `<img class="thumbnail" src="${result.thumbnail}" alt="Thumbnail" onerror="this.style.display='none'">`;
        html += `<div class="info"><strong>🎵 Judul</strong> ${result.title || 'Unknown'}</div>`;
        if (result.duration) html += `<div class="info"><strong>⏱ Durasi</strong> ${result.duration}</div>`;
        html += '<div class="download-buttons">';
        if (result.mp3) html += `<a href="${result.mp3}" target="_blank" class="music">🎵 Download MP3</a>`;
        html += '</div></div>';
    }
    if (others.length > 0) {
        html += `<div style="font-size:11px;color:rgba(255,255,255,0.2);margin-bottom:8px;">📋 LAGU LAINNYA (${others.length})</div>`;
        html += '<div style="display:flex;flex-direction:column;gap:8px;">';
        others.forEach((item, index) => {
            html += `
                <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:10px 14px;border:1px solid rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                    <div><div style="color:rgba(255,255,255,0.7);font-size:13px;font-weight:500;">${index + 1}. ${item.title || 'Unknown'}</div>
                    ${item.duration ? `<div style="color:rgba(255,255,255,0.25);font-size:11px;">⏱ ${item.duration}</div>` : ''}</div>
                    ${item.url ? `<a href="${item.url}" target="_blank" style="flex:0;padding:4px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:11px;background:rgba(29,111,255,0.08);color:#4d8fff;border:1px solid rgba(29,111,255,0.06);">▶ YouTube</a>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }
    html += '</div>';
    return html;
}

// ================================================================
// LYRIC
// ================================================================
window.setLyricExample = function(query) {
    const input = document.getElementById('lyricInput');
    if (input) input.value = query;
    processLyric();
};

async function processLyric() {
    const input = document.getElementById('lyricInput');
    const result = document.getElementById('lyricResult');
    const loading = document.getElementById('lyricLoading');
    const content = document.getElementById('lyricContent');
    const btn = document.getElementById('lyricBtn');
    
    const q = input?.value.trim();
    if (!q) return showError(content, 'Masukkan judul lagu dulu, bego!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    try {
        const response = await fetch(`${API_LYRIC}?q=${encodeURIComponent(q)}`);
        const raw = await response.json();
        if (!response.ok) throw new Error(raw.message || raw.error || `Gagal: ${response.status}`);
        if (raw.status !== true) throw new Error(raw.message || 'Lirik tidak ditemukan');
        loading.style.display = 'none';
        content.innerHTML = renderLyricResult(raw.data);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, `❌ ${err.message}`);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '📝 CARI'; }
    }
}

function renderLyricResult(data) {
    if (!data || data.length === 0) {
        return `<div class="error-msg">❌ Lirik tidak ditemukan, coba kata kunci lain, kontol!</div>`;
    }
    let html = '<div class="card">';
    html += `<div class="info"><strong>📝 Hasil pencarian:</strong> ${data.length} ditemukan</div>`;
    html += '<div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">';
    data.forEach((item, index) => {
        html += `
            <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:12px 16px;border:1px solid rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <div>
                    <div style="color:rgba(255,255,255,0.7);font-size:13px;font-weight:500;">${index + 1}. ${item.title || 'Unknown'}</div>
                    ${item.artist ? `<div style="color:rgba(255,255,255,0.3);font-size:11px;">${item.artist}</div>` : ''}
                </div>
                                ${item.url ? `<a href="${item.url}" target="_blank" class="lyric" style="flex:0;padding:6px 16px;border-radius:10px;text-decoration:none;font-weight:600;font-size:12px;background:rgba(29,111,255,0.08);color:#4d8fff;border:1px solid rgba(29,111,255,0.06);">🔗 Lihat Lirik</a>` : ''}
            </div>
        `;
    });
    html += '</div></div>';
    return html;
}

// ================================================================
// AI CHAT
// ================================================================
window.setAiExample = function(query) {
    const input = document.getElementById('aiInput');
    if (input) input.value = query;
    processAI();
};

function addMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;
    const time = document.createElement('div');
    time.className = 'msg-time';
    const now = new Date();
    time.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

async function processAI() {
    const input = document.getElementById('aiInput');
    const btn = document.getElementById('aiBtn');
    const q = input?.value.trim();
    if (!q) return;
    addMessage(q, 'user');
    if (input) input.value = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳...'; }
    const loadingId = 'loading-' + Date.now();
    const container = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-msg bot';
    loadingDiv.id = loadingId;
    loadingDiv.innerHTML = `<div class="msg-bubble" style="background:rgba(29,111,255,0.04);color:rgba(255,255,255,0.4);"><span class="typing-dots"><span></span><span></span><span></span></span></div><div class="msg-time">...</div>`;
    if (container) container.appendChild(loadingDiv);
    if (container) container.scrollTop = container.scrollHeight;
    try {
        const response = await fetch(`${API_GEMINI}?q=${encodeURIComponent(q)}`);
        const raw = await response.json();
        document.getElementById(loadingId)?.remove();
        if (!response.ok) throw new Error(raw.message || `Gagal: ${response.status}`);
        if (raw.status !== true) throw new Error(raw.message || 'AI tidak merespon');
        addMessage(raw.data?.message || 'Maaf, saya tidak bisa menjawab itu.', 'bot');
    } catch (err) {
        document.getElementById(loadingId)?.remove();
        addMessage(`❌ ${err.message}`, 'bot');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '✈️ Kirim'; }
    }
}

// ================================================================
// AUTO LOAD
// ================================================================
console.log('🔥 AXO-ALLFITUR siap (multi page + particles + liquid glass), kontol!');