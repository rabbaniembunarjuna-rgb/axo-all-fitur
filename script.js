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
// PAGE LOADER (5 TAB - TANPA TAB BAWAH)
// ================================================================
const pageContainer = document.getElementById('pageContainer');

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
    } else if (page === 'roblox') {
        const input = document.getElementById('robloxInput');
        const btn = document.getElementById('robloxBtn');
        if (btn) btn.addEventListener('click', processRoblox);
        if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processRoblox(); });
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

// ===== LYRIC =====
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

// ===== ROBLOX STALK =====
window.setRobloxExample = function(username) {
    const input = document.getElementById('robloxInput');
    if (input) input.value = username;
    processRoblox();
};

async function processRoblox() {
    const input = document.getElementById('robloxInput');
    const result = document.getElementById('robloxResult');
    const loading = document.getElementById('robloxLoading');
    const content = document.getElementById('robloxContent');
    const btn = document.getElementById('robloxBtn');
    
    const username = input?.value.trim();
    if (!username) return showError(content, 'Masukkan username Roblox dulu, bego!');
    
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Searching...'; }
    
    try {
        const response = await fetch(`${API_ROBLOX}?username=${encodeURIComponent(username)}`);
        const raw = await response.json();
        if (!response.ok) throw new Error(raw.message || raw.error || `Gagal: ${response.status}`);
        if (raw.status !== true) throw new Error(raw.message || 'Profil tidak ditemukan');
        
        loading.style.display = 'none';
        content.innerHTML = renderRobloxResult(raw.data);
    } catch (err) {
        loading.style.display = 'none';
        showError(content, `❌ ${err.message}`);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = '🎮 STALK'; }
    }
}

function renderRobloxResult(data) {
    if (!data) return `<div class="error-msg">❌ Profil tidak ditemukan, kontol!</div>`;
    
    let html = '<div class="card">';
    
    // Avatar & Basic Info
    html += `<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">`;
    if (data.avatar) {
        html += `<img src="${data.avatar}" alt="Avatar" style="width:80px;height:80px;border-radius:50%;border:2px solid rgba(29,111,255,0.2);object-fit:cover;">`;
    }
    html += `<div>
        <div style="font-size:18px;font-weight:700;color:#fff;">${data.displayName || data.name || 'Unknown'}</div>
        <div style="color:rgba(255,255,255,0.3);font-size:12px;">@${data.name || 'Unknown'}</div>
        <div style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:4px;">ID: ${data.id || '-'}</div>
    </div>`;
    html += `</div>`;
    
    // Stats
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">`;
    html += `<div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:10px;text-align:center;border:1px solid rgba(255,255,255,0.03);">
        <div style="font-size:18px;font-weight:700;color:#00d4ff;">${data.friends || 0}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.2);">Friends</div>
    </div>`;
    html += `<div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:10px;text-align:center;border:1px solid rgba(255,255,255,0.03);">
        <div style="font-size:18px;font-weight:700;color:#4d8fff;">${data.followers || 0}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.2);">Followers</div>
    </div>`;
    html += `<div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:10px;text-align:center;border:1px solid rgba(255,255,255,0.03);">
        <div style="font-size:18px;font-weight:700;color:#a855f7;">${data.followings || 0}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.2);">Following</div>
    </div>`;
    html += `</div>`;
    
    // Badges
    if (data.badges && data.badges.length > 0) {
        html += `<div style="margin-bottom:12px;">`;
        html += `<div style="font-size:11px;color:rgba(255,255,255,0.2);margin-bottom:6px;">🏅 BADGES</div>`;
        html += `<div style="display:flex;gap:6px;flex-wrap:wrap;">`;
        data.badges.forEach(badge => {
            html += `<span style="background:rgba(29,111,255,0.06);padding:2px 12px;border-radius:12px;font-size:10px;color:rgba(255,255,255,0.4);border:1px solid rgba(29,111,255,0.04);">${badge}</span>`;
        });
        html += `</div></div>`;
    }
    
    // Games
    if (data.games && data.games.length > 0) {
        html += `<div style="margin-bottom:12px;">`;
        html += `<div style="font-size:11px;color:rgba(255,255,255,0.2);margin-bottom:6px;">🎮 GAMES (${data.games.length})</div>`;
        data.games.forEach(game => {
            html += `<div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:8px 12px;border:1px solid rgba(255,255,255,0.03);margin-bottom:4px;">
                <div style="color:rgba(255,255,255,0.6);font-size:12px;">${game.name || 'Unknown'}</div>
                <div style="color:rgba(255,255,255,0.15);font-size:9px;">Visits: ${game.placeVisits || 0}</div>
            </div>`;
        });
        html += `</div>`;
    }
    
    // Created
    if (data.created) {
        const date = new Date(data.created);
        html += `<div style="font-size:10px;color:rgba(255,255,255,0.1);text-align:center;margin-top:8px;">📅 Bergabung: ${date.toLocaleDateString()}</div>`;
    }
    
    // Banned Status
    if (data.isBanned !== undefined) {
        html += `<div style="font-size:10px;text-align:center;margin-top:4px;color:${data.isBanned ? '#ff4444' : 'rgba(74,222,128,0.5)'};">${data.isBanned ? '🚫 BANNED' : '✅ Active'}</div>`;
    }
    
    html += '</div>';
    return html;
}

// ===== AI CHAT =====
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
// LIQUID NAVIGATION (GEDE + DI BAWAH DASHBOARD)
// ================================================================
const liquidLists = document.querySelectorAll('.liquid-list');
const liquidIndicator = document.querySelector('.liquid-indicator');
let currentLiquidPage = 'sosmed';

function switchLiquidPage(page) {
    document.querySelectorAll('.liquid-page-content').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`liquid-${page}`);
    if (target) target.classList.add('active');
    liquidLists.forEach(li => li.classList.remove('active'));
    const activeLi = document.querySelector(`.liquid-list[data-page="${page}"]`);
    if (activeLi) activeLi.classList.add('active');
    currentLiquidPage = page;
    setTimeout(updateLiquidIndicator, 50);
}

liquidLists.forEach(li => {
    li.addEventListener('click', function() {
        const page = this.dataset.page;
        if (page && page !== currentLiquidPage) {
            if (page === 'about') {
                document.getElementById('pageContainer').style.display = 'none';
                document.getElementById('aboutContainer').style.display = 'block';
                switchLiquidPage(page);
                return;
            }
            if (page === 'news') {
                document.getElementById('pageContainer').style.display = 'block';
                document.getElementById('aboutContainer').style.display = 'none';
                loadPage(page);
                switchLiquidPage(page);
                return;
            }
            document.getElementById('pageContainer').style.display = 'block';
            document.getElementById('aboutContainer').style.display = 'none';
            loadPage(page);
            switchLiquidPage(page);
        }
    });
});

// ===== Inject About Dev =====
function injectAboutPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    if (document.getElementById('aboutContainer')) return;
    
    const aboutDiv = document.createElement('div');
    aboutDiv.id = 'aboutContainer';
    aboutDiv.className = 'liquid-page-content';
    aboutDiv.style.display = 'none';
    aboutDiv.innerHTML = `
        <div class="liquid-card">
            <div class="liquid-profile">
                <div class="liquid-avatar">⬡</div>
                <div class="liquid-info">
                    <h3>@embun</h3>
                    <p>Developer &amp; Designer</p>
                    <div class="liquid-bio">Membuat sesuatu yang keren dengan kode dan kreativitas.</div>
                </div>
            </div>
            <div class="liquid-stats">
                <div class="liquid-stat"><span class="liquid-number">11,7 rb</span><span class="liquid-label">Followers</span></div>
                <div class="liquid-stat"><span class="liquid-number">77</span><span class="liquid-label">Following</span></div>
                <div class="liquid-stat"><span class="liquid-number">7,2 rb</span><span class="liquid-label">Likes</span></div>
            </div>
            <div class="liquid-tags">
                <span>#programming</span>
                <span>#webdevelopment</span>
                <span>#coding</span>
            </div>
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.02);">
                <div style="font-size:11px;color:rgba(255,255,255,0.2);">📌 Tentang Developer</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.15);margin-top:4px;">AXO ALLFITUR dibuat oleh @embun untuk memudahkan download, cari lirik, chat AI, dan stalk Roblox dalam satu tempat.</div>
            </div>
        </div>
    `;
    
    const pageContainer = document.getElementById('pageContainer');
    if (pageContainer) {
        pageContainer.parentNode.insertBefore(aboutDiv, pageContainer.nextSibling);
    }
}

// ===== Inject Liquid Styles =====
function injectLiquidStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .liquid-page-content{animation:fadeUp 0.4s ease}
        .liquid-card{background:rgba(20,20,40,0.3);backdrop-filter:blur(16px);border-radius:16px;padding:20px 18px;border:1px solid rgba(255,255,255,0.02)}
        .liquid-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
        .liquid-stat{text-align:center;padding:10px 6px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.02)}
        .liquid-number{display:block;font-size:17px;font-weight:700;color:#fff;letter-spacing:-0.5px}
        .liquid-label{font-size:8px;color:rgba(255,255,255,0.15);text-transform:uppercase;letter-spacing:1px;margin-top:2px}
        .liquid-profile{display:flex;align-items:center;gap:14px;margin-bottom:16px}
        .liquid-avatar{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#1d6fff,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff;font-weight:900;flex-shrink:0;box-shadow:0 4px 20px rgba(29,111,255,0.15)}
        .liquid-info h3{font-size:16px;color:#fff;font-weight:700}
        .liquid-info p{font-size:11px;color:rgba(255,255,255,0.15);margin-top:1px}
        .liquid-bio{font-size:11px;color:rgba(255,255,255,0.1);margin-top:2px;font-style:italic}
        .liquid-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.02)}
        .liquid-tags span{background:rgba(29,111,255,0.04);border:1px solid rgba(29,111,255,0.02);padding:3px 12px;border-radius:16px;font-size:9px;color:rgba(255,255,255,0.15);letter-spacing:0.5px}
        @media(max-width:480px){.liquid-stats{grid-template-columns:repeat(3,1fr);gap:6px}.liquid-number{font-size:14px}.liquid-stat{padding:8px 4px}.liquid-avatar{width:40px;height:40px;font-size:18px}.liquid-info h3{font-size:14px}}
    `;
    document.head.appendChild(style);
}

// ===== Init Liquid Nav =====
function initLiquidNav() {
    injectLiquidStyles();
    injectAboutPage();
    setTimeout(() => {
        // Set default page
        document.getElementById('pageContainer').style.display = 'block';
        document.getElementById('aboutContainer').style.display = 'none';
        switchLiquidPage('sosmed');
        updateLiquidIndicator();
    }, 200);
    window.addEventListener('resize', updateLiquidIndicator);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidNav);
} else {
    initLiquidNav();
}

// ===== NEWS =====
async function loadNews() {
    const result = document.getElementById('newsResult');
    const loading = document.getElementById('newsLoading');
    const content = document.getElementById('newsContent');
    
    result.className = 'result show';
    loading.style.display = 'block';
    content.innerHTML = '';
    
    try {
        const response = await fetch(API_NEWS);
        const raw = await response.json();
        
        if (!response.ok) throw new Error(raw.message || `Gagal: ${response.status}`);
        if (raw.status !== true) throw new Error(raw.message || 'Gagal memuat berita');
        
        loading.style.display = 'none';
        content.innerHTML = renderNews(raw.result);
    } catch (err) {
        loading.style.display = 'none';
        content.innerHTML = `<div class="error-msg">❌ ${err.message}</div>`;
    }
}

function renderNews(data) {
    if (!data || data.length === 0) {
        return `<div class="error-msg">❌ Tidak ada berita, kontol!</div>`;
    }
    
    let html = '<div class="card">';
    html += `<div class="info"><strong>📰 Total Berita:</strong> ${data.length}</div>`;
    html += '<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;">';
    
    data.forEach((item, index) => {
        const time = item.pubDate ? new Date(item.pubDate).toLocaleString('id-ID', { 
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
        }) : 'Waktu tidak diketahui';
        
        html += `
            <div style="display:flex;gap:12px;background:rgba(255,255,255,0.02);border-radius:12px;padding:12px;border:1px solid rgba(255,255,255,0.03);cursor:pointer;transition:0.3s;" onclick="window.open('${item.link || '#'}', '_blank')">
                ${item.thumbnail ? `<img src="${item.thumbnail}" alt="Thumbnail" style="width:70px;height:70px;border-radius:8px;object-fit:cover;flex-shrink:0;border:1px solid rgba(255,255,255,0.03);" onerror="this.style.display='none'">` : ''}
                <div style="flex:1;min-width:0;">
                    <div style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:500;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${index + 1}. ${item.title || 'Tidak ada judul'}</div>
                    <div style="color:rgba(255,255,255,0.15);font-size:9px;margin-top:4px;">🕐 ${time}</div>
                </div>
                <div style="display:flex;align-items:center;color:rgba(255,255,255,0.1);font-size:12px;">↗</div>
            </div>
        `;
    });
    
    html += '</div></div>';
    return html;
}

// ================================================================
// AUTO LOAD
// ================================================================
console.log('🔥 AXO-ALLFITUR siap (liquid nav gede + about terpisah), kontol!');