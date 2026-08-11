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
const aboutContainer = document.getElementById('aboutContainer');

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
    `,
    roblox: `
        <div class="hint-box">
            <span class="icon">🎮</span>
            <div class="text"><strong>Cari profil Roblox</strong> berdasarkan username, gratis tanpa ribet.
                <div class="examples">
                    <span onclick="setRobloxExample('Baniarjuna2')">Baniarjuna2</span>
                    <span onclick="setRobloxExample('Builderman')">Builderman</span>
                    <span onclick="setRobloxExample('Sanzz2')">Sanzz2</span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input type="text" id="robloxInput" placeholder="Username Roblox..." />
            <button id="robloxBtn">🎮 STALK</button>
        </div>
        <div id="robloxResult" class="result">
            <div id="robloxLoading" class="loading"><div class="spinner"></div><div>Mencari profil...</div></div>
            <div id="robloxContent"></div>
        </div>
    `,
    news: `
        <div class="hint-box">
            <span class="icon">📰</span>
            <div class="text"><strong>Berita terbaru</strong> dari CNN Indonesia, update setiap hari.
                <div class="examples">
                    <span onclick="loadNews()">🔄 Refresh</span>
                </div>
            </div>
        </div>
        <div id="newsResult" class="result show">
            <div id="newsLoading" class="loading"><div class="spinner"></div><div>Memuat berita...</div></div>
            <div id="newsContent"></div>
        </div>
    `
};

function loadPage(page) {
    pageContainer.innerHTML = pages[page] || pages.sosmed;
    if (page === 'sosmed') {
        document.getElementById('sosmedBtn')?.addEventListener('click', processSosmed);
        document.getElementById('sosmedInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') processSosmed(); });
    } else if (page === 'music') {
        document.getElementById('musicBtn')?.addEventListener('click', processMusic);
        document.getElementById('musicInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') processMusic(); });
    } else if (page === 'chat') {
        document.getElementById('aiBtn')?.addEventListener('click', processAI);
        document.getElementById('aiInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') processAI(); });
    } else if (page === 'lyric') {
        document.getElementById('lyricBtn')?.addEventListener('click', processLyric);
        document.getElementById('lyricInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') processLyric(); });
    } else if (page === 'roblox') {
        document.getElementById('robloxBtn')?.addEventListener('click', processRoblox);
        document.getElementById('robloxInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') processRoblox(); });
    } else if (page === 'news') {
        loadNews();
    }
}

// ================================================================
// API FUNCTIONS
// ================================================================
const API_AIO = 'https://api.znn.my.id/aio';
const API_PLAY = 'https://api.znn.my.id/play';
const API_GEMINI = 'https://api.znn.my.id/gemini-chat';
const API_LYRIC = 'https://api.znn.my.id/lyric';
const API_ROBLOX = 'https://api.znn.my.id/roblox-stalk';
const API_NEWS = 'https://api.ikyyxd.my.id/berita/cnn';

function showError(container, msg) {
    container.innerHTML = `<div class="error-msg">❌ ${msg}</div>`;
}

// ===== SOSMED =====
window.setExample = function(url) {
    document.getElementById('sosmedInput').value = url;
    processSosmed();
};

async function processSosmed() {
    const input = document.getElementById('sosmedInput');
    const content = document.getElementById('sosmedContent');
    const loading = document.getElementById('sosmedLoading');
    const result = document.getElementById('sosmedResult');
    const btn = document.getElementById('sosmedBtn');
    const url = input?.value.trim();
    if (!url) return showError(content, 'Masukkan URL dulu!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Loading...'; }
    try {
        const res = await fetch(`${API_AIO}?url=${encodeURIComponent(url)}`);
        const raw = await res.json();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        loading.style.display = 'none';
        content.innerHTML = renderSosmed(raw);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '⬇ DOWNLOAD'; }
    }
}

function renderSosmed(data) {
    let html = '<div class="card">';
    if (data.thumbnail) html += `<img class="thumbnail" src="${data.thumbnail}" onerror="this.style.display='none'">`;
    html += `<div class="info"><strong>Platform</strong> <span class="platform-tag">${data.platform || 'Unknown'}</span></div>`;
    if (data.title) html += `<div class="info"><strong>Judul</strong> ${data.title}</div>`;
    html += '<div class="download-buttons">';
    const d = data.data || {};
    if (d.video) html += `<a href="${d.video}" target="_blank" class="video">▶ Video</a>`;
    if (d.audio) html += `<a href="${d.audio}" target="_blank" class="audio">🎵 Audio</a>`;
    if (d.download_url) html += `<a href="${d.download_url}" target="_blank" class="video">⬇ Download</a>`;
    html += '</div></div>';
    return html;
}

// ===== MUSIC =====
window.setMusicExample = function(q) {
    document.getElementById('musicInput').value = q;
    processMusic();
};

async function processMusic() {
    const input = document.getElementById('musicInput');
    const content = document.getElementById('musicContent');
    const loading = document.getElementById('musicLoading');
    const result = document.getElementById('musicResult');
    const btn = document.getElementById('musicBtn');
    const q = input?.value.trim();
    if (!q) return showError(content, 'Masukkan judul lagu!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    try {
        const res = await fetch(`${API_PLAY}?q=${encodeURIComponent(q)}`);
        const raw = await res.json();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        loading.style.display = 'none';
        content.innerHTML = renderMusic(raw);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '🎵 SEARCH'; }
    }
}

function renderMusic(data) {
    const result = data.result || {};
    const others = data.otherResults || [];
    let html = '<div class="card">';
    if (result.title) {
        html += `<div class="info"><strong>🎵 Judul</strong> ${result.title}</div>`;
        if (result.mp3) html += `<div class="download-buttons"><a href="${result.mp3}" target="_blank" class="music">🎵 Download MP3</a></div>`;
    }
    if (others.length > 0) {
        html += `<div style="margin-top:10px;font-size:10px;color:rgba(255,255,255,0.2);">📋 Lagu lain (${others.length})</div>`;
        others.forEach((item, i) => {
            html += `<div style="background:rgba(255,255,255,0.02);border-radius:8px;padding:6px 10px;margin-top:4px;border:1px solid rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.5);font-size:11px;">${i+1}. ${item.title}</span>
                ${item.url ? `<a href="${item.url}" target="_blank" style="padding:2px 10px;border-radius:6px;background:rgba(29,111,255,0.06);color:#4d8fff;text-decoration:none;font-size:10px;">▶</a>` : ''}
            </div>`;
        });
    }
    html += '</div>';
    return html;
}

// ===== LYRIC =====
window.setLyricExample = function(q) {
    document.getElementById('lyricInput').value = q;
    processLyric();
};

async function processLyric() {
    const input = document.getElementById('lyricInput');
    const content = document.getElementById('lyricContent');
    const loading = document.getElementById('lyricLoading');
    const result = document.getElementById('lyricResult');
    const btn = document.getElementById('lyricBtn');
    const q = input?.value.trim();
    if (!q) return showError(content, 'Masukkan judul lagu!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    try {
        const res = await fetch(`${API_LYRIC}?q=${encodeURIComponent(q)}`);
        const raw = await res.json();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        loading.style.display = 'none';
        content.innerHTML = renderLyric(raw.data);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '📝 CARI'; }
    }
}

function renderLyric(data) {
    if (!data || data.length === 0) return `<div class="error-msg">❌ Lirik tidak ditemukan</div>`;
    let html = '<div class="card">';
    data.forEach((item, i) => {
        html += `<div style="background:rgba(255,255,255,0.02);border-radius:8px;padding:8px 12px;margin-bottom:4px;border:1px solid rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;">
            <div><span style="color:rgba(255,255,255,0.3);font-size:10px;">${i+1}.</span> <span style="color:rgba(255,255,255,0.6);font-size:12px;">${item.title}</span> ${item.artist ? `<span style="color:rgba(255,255,255,0.2);font-size:10px;">- ${item.artist}</span>` : ''}</div>
            ${item.url ? `<a href="${item.url}" target="_blank" style="padding:2px 12px;border-radius:6px;background:rgba(29,111,255,0.06);color:#4d8fff;text-decoration:none;font-size:10px;">🔗</a>` : ''}
        </div>`;
    });
    html += '</div>';
    return html;
}

// ===== ROBLOX =====
window.setRobloxExample = function(u) {
    document.getElementById('robloxInput').value = u;
    processRoblox();
};

async function processRoblox() {
    const input = document.getElementById('robloxInput');
    const content = document.getElementById('robloxContent');
    const loading = document.getElementById('robloxLoading');
    const result = document.getElementById('robloxResult');
    const btn = document.getElementById('robloxBtn');
    const username = input?.value.trim();
    if (!username) return showError(content, 'Masukkan username Roblox!');
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    try {
        const res = await fetch(`${API_ROBLOX}?username=${encodeURIComponent(username)}`);
        const raw = await res.json();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        loading.style.display = 'none';
        content.innerHTML = renderRoblox(raw.data);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '🎮 STALK'; }
    }
}

function renderRoblox(data) {
    if (!data) return `<div class="error-msg">❌ Profil tidak ditemukan</div>`;
    let html = '<div class="card">';
    html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
        ${data.avatar ? `<img src="${data.avatar}" style="width:50px;height:50px;border-radius:50%;border:2px solid rgba(29,111,255,0.2);">` : ''}
        <div><div style="font-size:16px;font-weight:700;color:#fff;">${data.displayName || data.name}</div>
        <div style="color:rgba(255,255,255,0.3);font-size:11px;">@${data.name}</div></div>
    </div>`;
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px;">
        <div style="background:rgba(255,255,255,0.02);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:16px;font-weight:700;color:#00d4ff;">${data.friends || 0}</div><div style="font-size:8px;color:rgba(255,255,255,0.2);">Friends</div></div>
        <div style="background:rgba(255,255,255,0.02);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:16px;font-weight:700;color:#4d8fff;">${data.followers || 0}</div><div style="font-size:8px;color:rgba(255,255,255,0.2);">Followers</div></div>
        <div style="background:rgba(255,255,255,0.02);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:16px;font-weight:700;color:#a855f7;">${data.followings || 0}</div><div style="font-size:8px;color:rgba(255,255,255,0.2);">Following</div></div>
    </div>`;
    if (data.badges && data.badges.length > 0) {
        html += `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">`;
        data.badges.forEach(b => { html += `<span style="background:rgba(29,111,255,0.04);padding:2px 10px;border-radius:10px;font-size:8px;color:rgba(255,255,255,0.3);border:1px solid rgba(29,111,255,0.02);">${b}</span>`; });
        html += `</div>`;
    }
    html += '</div>';
    return html;
}

// ===== NEWS =====
async function loadNews() {
    const content = document.getElementById('newsContent');
    const loading = document.getElementById('newsLoading');
    const result = document.getElementById('newsResult');
    if (!result) return;
    result.className = 'result show';
    if (loading) loading.style.display = 'block';
    if (content) content.innerHTML = '';
    try {
        const res = await fetch(API_NEWS);
        const raw = await res.json();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        if (loading) loading.style.display = 'none';
        if (content) content.innerHTML = renderNews(raw.result);
    } catch (err) {
        if (loading) loading.style.display = 'none';
        if (content) showError(content, err.message);
    }
}

function renderNews(data) {
    if (!data || data.length === 0) return `<div class="error-msg">❌ Tidak ada berita</div>`;
    let html = '<div class="card">';
    data.forEach((item, i) => {
        const time = item.pubDate ? new Date(item.pubDate).toLocaleString('id-ID', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : '';
        html += `<div style="display:flex;gap:10px;background:rgba(255,255,255,0.02);border-radius:10px;padding:10px 12px;margin-bottom:6px;border:1px solid rgba(255,255,255,0.03);cursor:pointer;" onclick="window.open('${item.link || '#'}','_blank')">
            ${item.thumbnail ? `<img src="${item.thumbnail}" style="width:50px;height:50px;border-radius:6px;object-fit:cover;flex-shrink:0;" onerror="this.style.display='none'">` : ''}
            <div style="flex:1;"><div style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:500;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${i+1}. ${item.title}</div>
            ${time ? `<div style="color:rgba(255,255,255,0.1);font-size:8px;margin-top:2px;">🕐 ${time}</div>` : ''}</div>
        </div>`;
    });
    html += '</div>';
    return html;
}

// ===== AI CHAT =====
window.setAiExample = function(q) {
    document.getElementById('aiInput').value = q;
    processAI();
};

function addMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes().toString().padStart(2,'0')}</div>`;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

async function processAI() {
    const input = document.getElementById('aiInput');
    const btn = document.getElementById('aiBtn');
    const q = input?.value.trim();
    if (!q) return;
    addMessage(q, 'user');
    input.value = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳...'; }
    const loadingId = 'loading-' + Date.now();
    const container = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-msg bot';
    loadingDiv.id = loadingId;
    loadingDiv.innerHTML = `<div class="msg-bubble" style="background:rgba(29,111,255,0.04);color:rgba(255,255,255,0.4);"><span class="typing-dots"><span></span><span></span><span></span></span></div><div class="msg-time">...</div>`;
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;
    try {
        const res = await fetch(`${API_GEMINI}?q=${encodeURIComponent(q)}`);
        const raw = await res.json();
        document.getElementById(loadingId)?.remove();
        if (!res.ok) throw new Error(raw.message || `Gagal: ${res.status}`);
        addMessage(raw.data?.message || 'Maaf, saya tidak bisa menjawab.', 'bot');
    } catch (err) {
        document.getElementById(loadingId)?.remove();
        addMessage(`❌ ${err.message}`, 'bot');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '✈️ Kirim'; }
    }
}

// ================================================================
// SIDE NAV (VERTIKAL)
// ================================================================
const sideLists = document.querySelectorAll('.side-list');
const sideIndicator = document.querySelector('.side-indicator');
let currentPage = 'sosmed';

function switchPage(page) {
    aboutContainer.style.display = 'none';
    pageContainer.style.display = 'block';
    if (page === 'about') {
        pageContainer.style.display = 'none';
        aboutContainer.style.display = 'block';
        aboutContainer.innerHTML = `
            <div class="liquid-card">
                <div class="liquid-profile">
                    <div class="liquid-avatar">⬡</div>
                    <div class="liquid-info">
                        <h3>@embun</h3>
                        <p>Developer & Designer</p>
                        <div class="liquid-bio">Membuat sesuatu yang keren dengan kode dan kreativitas.</div>
                    </div>
                </div>
                <div class="liquid-stats">
                    <div class="liquid-stat"><span class="liquid-number">11,7 rb</span><span class="liquid-label">Followers</span></div>
                    <div class="liquid-stat"><span class="liquid-number">77</span><span class="liquid-label">Following</span></div>
                    <div class="liquid-stat"><span class="liquid-number">7,2 rb</span><span class="liquid-label">Likes</span></div>
                </div>
                <div class="liquid-tags"><span>#programming</span><span>#webdevelopment</span><span>#coding</span></div>
                <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.02);">
                    <div style="font-size:10px;color:rgba(255,255,255,0.2);">📌 Tentang Developer</div>
                    <div style="font-size:11px;color:rgba(255,255,255,0.12);margin-top:4px;">AXO ALLFITUR dibuat oleh @embun untuk memudahkan download, cari lirik, chat AI, dan stalk Roblox dalam satu tempat.</div>
                </div>
            </div>
        `;
    } else {
        loadPage(page);
    }
    sideLists.forEach(li => li.classList.remove('active'));
    document.querySelector(`.side-list[data-page="${page}"]`)?.classList.add('active');
    currentPage = page;
    setTimeout(updateIndicator, 50);
}

function updateIndicator() {
    const active = document.querySelector('.side-list.active');
    if (!active || !sideIndicator) return;
    const nav = document.querySelector('.side-nav');
    if (!nav) return;
    const isVertical = window.innerWidth > 768;
    const navRect = nav.getBoundingClientRect();
    const liRect = active.getBoundingClientRect();
    if (isVertical) {
        const centerY = (liRect.top + liRect.height / 2) - navRect.top;
        const h = Math.min(30, liRect.height * 0.7);
        sideIndicator.style.height = h + 'px';
        sideIndicator.style.top = (centerY - h / 2) + 'px';
        sideIndicator.style.left = '4px';
        sideIndicator.style.width = '3px';
        sideIndicator.style.bottom = 'auto';
    } else {
        const centerX = (liRect.left + liRect.width / 2) - navRect.left;
        const w = Math.min(30, liRect.width * 0.5);
        sideIndicator.style.width = w + 'px';
        sideIndicator.style.left = (centerX - w / 2) + 'px';
        sideIndicator.style.top = 'auto';
        sideIndicator.style.bottom = '4px';
        sideIndicator.style.height = '3px';
    }
}

sideLists.forEach(li => {
    li.addEventListener('click', function() {
        const page = this.dataset.page;
        if (page && page !== currentPage) switchPage(page);
    });
});

// ===== INIT =====
setTimeout(() => {
    switchPage('sosmed');
    updateIndicator();
}, 200);
window.addEventListener('resize', updateIndicator);

console.log('🔥 AXO-ALLFITUR siap (nav kiri vertikal), kontol!');