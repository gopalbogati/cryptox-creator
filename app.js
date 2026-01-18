// CryptoX Creator - Main Application
// Viral Content Generator for X/Twitter

// ===== App State =====
const AppState = {
    currentSection: 'dashboard',
    generatedContent: '',
    contentType: 'tweet',
    library: JSON.parse(localStorage.getItem('cryptox_library') || '[]'),
    scheduled: JSON.parse(localStorage.getItem('cryptox_scheduled') || '[]'),
    stats: JSON.parse(localStorage.getItem('cryptox_stats') || '{"posts":0,"threads":0,"scheduled":0}')
};

// ===== Crypto Content Templates =====
const ContentTemplates = {
    bullishTweet: [
        "🚀 {coin} is showing incredible strength right now.\n\nHere's why the next leg up could be massive:\n\n• Strong support at current levels\n• Volume increasing significantly\n• Smart money accumulating\n\nThis is not financial advice, but I'm watching closely. 👀",
        "The {coin} chart is screaming one thing:\n\nACCUMULATION ZONE 📈\n\nWhales are loading up while retail sleeps.\n\nDon't say I didn't warn you when this pumps 50%+ 🔥",
        "If you're not paying attention to {coin} right now, you're missing out.\n\n✅ Strong fundamentals\n✅ Active development\n✅ Growing community\n✅ Institutional interest\n\nThe next 6 months will be interesting... 🎯"
    ],
    educationalTweet: [
        "Let me explain {topic} in simple terms 🧵\n\nMost people get this wrong.\n\nHere's what you need to know:\n\n1️⃣ The basics matter\n2️⃣ Risk management is key\n3️⃣ DYOR always\n\nBookmark this for later 📚",
        "{topic} 101:\n\nIf you don't understand this, you'll lose money.\n\n• Start with fundamentals\n• Learn market cycles\n• Never invest more than you can afford to lose\n\nSave this thread 💾",
        "The biggest mistake in {topic}?\n\nNot understanding the technology.\n\nHere's a 2-minute crash course:\n\n🔹 Key concept 1\n🔹 Key concept 2\n🔹 Key concept 3\n\nNow you're ahead of 90% of people 🎓"
    ],
    analyticalTweet: [
        "📊 {coin} Technical Analysis\n\nKey levels to watch:\n\n• Resistance: $XX,XXX\n• Support: $XX,XXX\n\nRSI showing bullish divergence.\nMACD crossing bullish.\n\nMy take: Cautiously optimistic.\n\nNFA 📈",
        "Let's break down the {coin} chart:\n\n🔍 What I'm seeing:\n• Price consolidating in a triangle\n• Volume decreasing (typical before breakout)\n• Key moving averages converging\n\nBreakout imminent? Time will tell 🎯",
        "{coin} On-Chain Analysis:\n\n📈 Addresses: Growing\n💰 Whale wallets: Accumulating  \n🔄 Exchange outflows: Increasing\n\nThe data doesn't lie.\n\nWhat does this tell us? 🤔"
    ],
    newsTweet: [
        "🚨 BREAKING: {topic}\n\nThis could be huge for crypto.\n\nHere's what you need to know:\n\n• Impact on markets\n• What it means for investors\n• Next steps to watch\n\nStay tuned for updates 📡",
        "Just in: {topic}\n\nThe crypto market is reacting.\n\n⬆️ Winners: \n⬇️ Losers: \n\nWhat's your take on this? 👇",
        "MAJOR NEWS: {topic}\n\nThis changes everything.\n\nWhy it matters:\n1. Institutional implications\n2. Regulatory considerations\n3. Market sentiment shift\n\nBuckle up 🎢"
    ],
    controversialTweet: [
        "Hot take: {topic} is overrated.\n\nHear me out before you rage in the comments 👇\n\nThe problem is...\n\nChange my mind in the replies 🔥",
        "99% of crypto influencers won't tell you this about {topic}.\n\nWhy? Because it hurts their bags.\n\nBut I'm going to be real with you...\n\nThread 🧵👇",
        "Unpopular opinion:\n\n{topic}\n\nI know this will upset some people, but someone needs to say it.\n\nRoast me in the replies 🔥"
    ],
    humorousTweet: [
        "Me checking my {coin} portfolio every 5 minutes:\n\n😐📱\n😟📱\n🥺📱\n😭📱\n🤡📱\n\nWe're all gonna make it... right? 😅",
        "POV: You just explained {topic} to your family at dinner\n\nThem: 👁️👄👁️\n\nMe: \"So anyway, that's why I'm not selling\" 🚀",
        "Crypto Twitter at 3am:\n\n{topic}\n\nMe: *sets alarm for 4am to check charts*\n\nWe're definitely not addicted 🤡"
    ]
};

// ===== Viral Templates =====
const ViralTemplates = [
    {
        id: 'hook-story-offer',
        icon: '🎣',
        title: 'Hook-Story-Offer',
        desc: 'The classic viral formula: capture attention, tell a story, make an offer',
        preview: '[HOOK that stops scrolling]\n\n[Your STORY or insight]\n\n[Clear OFFER or CTA]'
    },
    {
        id: 'contrarian',
        icon: '🔥',
        title: 'Contrarian Take',
        desc: 'Challenge popular opinion to spark engagement and debate',
        preview: 'Unpopular opinion:\n\n[Your contrarian view]\n\n[Evidence/reasoning]\n\nChange my mind 👇'
    },
    {
        id: 'listicle',
        icon: '📋',
        title: '7 Things List',
        desc: 'Numbered lists perform extremely well and are easy to consume',
        preview: '7 things I wish I knew about [TOPIC]:\n\n1. [Point]\n2. [Point]\n...\n7. [Point]\n\nBookmark this 🔖'
    },
    {
        id: 'before-after',
        icon: '📈',
        title: 'Before & After',
        desc: 'Show transformation to inspire and build credibility',
        preview: '2020: [Before state]\n2024: [After state]\n\nWhat changed:\n\n• [Key action]\n• [Key decision]\n• [Key mindset shift]'
    },
    {
        id: 'prediction',
        icon: '🔮',
        title: 'Bold Prediction',
        desc: 'Make predictions to position yourself as a thought leader',
        preview: 'My prediction for [TOPIC] in 2025:\n\n🔮 [Prediction 1]\n🔮 [Prediction 2]\n🔮 [Prediction 3]\n\nScreenshot this.'
    },
    {
        id: 'alpha-thread',
        icon: '🧵',
        title: 'Alpha Thread',
        desc: 'Share valuable insights that make people want to follow you',
        preview: 'I spent 100 hours researching [TOPIC].\n\nHere\'s what 99% of people miss:\n\n🧵 A thread 👇'
    },
    {
        id: 'personal-story',
        icon: '📖',
        title: 'Personal Story',
        desc: 'Stories create emotional connection and are highly shareable',
        preview: 'In [YEAR], I [situation].\n\nEveryone told me [common advice].\n\nI did the opposite.\n\nHere\'s what happened...'
    },
    {
        id: 'simple-truth',
        icon: '💡',
        title: 'Simple Truth',
        desc: 'Share obvious truths that resonate deeply',
        preview: 'Simple truth about [TOPIC]:\n\n[One powerful statement]\n\nThat\'s it. That\'s the tweet.'
    }
];

// ===== Trending Topics =====
const TrendingTopics = [
    { rank: 1, topic: 'Bitcoin ETF', volume: '125K tweets', trend: 'up' },
    { rank: 2, topic: 'Ethereum 2.0', volume: '89K tweets', trend: 'up' },
    { rank: 3, topic: 'Solana DeFi', volume: '67K tweets', trend: 'stable' },
    { rank: 4, topic: 'AI + Crypto', volume: '54K tweets', trend: 'up' },
    { rank: 5, topic: 'Meme Coins', volume: '48K tweets', trend: 'down' },
    { rank: 6, topic: 'Bitcoin Halving', volume: '42K tweets', trend: 'up' },
    { rank: 7, topic: 'Layer 2 Solutions', volume: '38K tweets', trend: 'up' },
    { rank: 8, topic: 'NFT Revival', volume: '31K tweets', trend: 'stable' }
];

const ContentIdeas = [
    { topic: 'Bitcoin ETF', suggestion: 'Explain the impact of ETF inflows on BTC price' },
    { topic: 'Market Analysis', suggestion: 'Share your weekly crypto market recap' },
    { topic: 'DeFi Alpha', suggestion: 'Highlight undervalued DeFi protocols' },
    { topic: 'Trading Tips', suggestion: 'Share risk management strategies' },
    { topic: 'Crypto News', suggestion: 'Break down the latest regulatory updates' }
];

// ===== Section HTML Templates =====
const SectionTemplates = {
    dashboard: `
        <section class="section active" id="section-dashboard">
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon">📝</div><div class="stat-info"><span class="stat-value" id="totalPosts">0</span><span class="stat-label">Posts Created</span></div></div>
                <div class="stat-card"><div class="stat-icon">🧵</div><div class="stat-info"><span class="stat-value" id="totalThreads">0</span><span class="stat-label">Threads Built</span></div></div>
                <div class="stat-card"><div class="stat-icon">📅</div><div class="stat-info"><span class="stat-value" id="scheduledPosts">0</span><span class="stat-label">Scheduled</span></div></div>
                <div class="stat-card"><div class="stat-icon">💾</div><div class="stat-info"><span class="stat-value" id="savedContent">0</span><span class="stat-label">Saved Content</span></div></div>
            </div>
            <div class="dashboard-grid">
                <div class="dashboard-card quick-actions">
                    <h3 class="card-title">⚡ Quick Actions</h3>
                    <div class="quick-action-buttons">
                        <button class="quick-btn" data-action="tweet"><span class="quick-btn-icon">✍️</span><span>Generate Tweet</span></button>
                        <button class="quick-btn" data-action="thread"><span class="quick-btn-icon">🧵</span><span>Create Thread</span></button>
                        <button class="quick-btn" data-action="reply"><span class="quick-btn-icon">💬</span><span>Generate Reply</span></button>
                        <button class="quick-btn" data-action="trending"><span class="quick-btn-icon">🔥</span><span>View Trending</span></button>
                    </div>
                </div>
                <div class="dashboard-card recent-content">
                    <h3 class="card-title">📄 Recent Content</h3>
                    <div class="recent-list" id="recentContent"><div class="empty-state"><span class="empty-icon">📝</span><p>No content generated yet</p><small>Start creating viral crypto content!</small></div></div>
                </div>
            </div>
        </section>
    `,
    generator: `
        <section class="section" id="section-generator">
            <div class="generator-container">
                <div class="generator-form">
                    <h2 class="section-title">✨ AI Content Generator</h2>
                    <p class="section-subtitle">Generate viral crypto content in seconds</p>
                    <div class="form-group"><label class="form-label">Content Type</label>
                        <div class="content-type-selector">
                            <button class="type-btn active" data-type="tweet"><span>📝</span> Tweet</button>
                            <button class="type-btn" data-type="thread"><span>🧵</span> Thread</button>
                            <button class="type-btn" data-type="article"><span>📰</span> Article</button>
                        </div>
                    </div>
                    <div class="form-group"><label class="form-label">Topic / Coin</label><input type="text" class="form-input" id="topicInput" placeholder="e.g., Bitcoin, Ethereum, DeFi, NFTs..."></div>
                    <div class="form-group"><label class="form-label">Tone</label>
                        <select class="form-select" id="toneSelect">
                            <option value="bullish">🚀 Bullish & Excited</option>
                            <option value="educational">📚 Educational</option>
                            <option value="analytical">📊 Analytical</option>
                            <option value="news">📰 Breaking News</option>
                            <option value="controversial">🔥 Controversial</option>
                            <option value="humorous">😂 Humorous</option>
                        </select>
                    </div>
                    <div class="form-group"><label class="form-label">Additional Context (Optional)</label><textarea class="form-textarea" id="contextInput" placeholder="Add specific details or angle..."></textarea></div>
                    <button class="btn-primary generate-btn" id="generateBtn"><span>✨</span><span>Generate Content</span></button>
                </div>
                <div class="generator-output">
                    <div class="output-header"><h3>Generated Content</h3><div class="output-actions"><button class="btn-sm" id="regenerateBtn" title="Regenerate">🔄</button><button class="btn-sm" id="saveContentBtn" title="Save">💾</button><button class="btn-sm" id="scheduleContentBtn" title="Schedule">📅</button></div></div>
                    <div class="output-content" id="generatedContent"><div class="output-placeholder"><span class="placeholder-icon">✨</span><p>Your viral content will appear here</p><small>Fill in the form and click Generate</small></div></div>
                    <div class="output-footer" id="outputFooter" style="display: none;"><div class="char-count"><span id="charCount">0</span>/280 characters</div><button class="btn-copy" id="copyBtn"><span>📋</span><span>Copy to Clipboard</span></button></div>
                </div>
            </div>
        </section>
    `,
    threads: `
        <section class="section" id="section-threads">
            <h2 class="section-title">🧵 Thread Builder</h2>
            <p class="section-subtitle">Create engaging Twitter threads that go viral</p>
            <div class="thread-controls">
                <div class="form-group"><label class="form-label">Thread Topic</label><input type="text" class="form-input" id="threadTopic" placeholder="e.g., 5 reasons why Bitcoin will hit $200k"></div>
                <div class="thread-options">
                    <div class="option-group"><label>Tweets:</label><select class="form-select-sm" id="threadLength"><option value="5">5</option><option value="7" selected>7</option><option value="10">10</option></select></div>
                    <button class="btn-primary" id="generateThread"><span>🧵</span> Generate Thread</button>
                </div>
            </div>
            <div class="thread-preview" id="threadPreview"><div class="empty-state"><span class="empty-icon">🧵</span><p>Your thread will appear here</p></div></div>
            <div class="thread-actions" id="threadActions" style="display: none;">
                <button class="btn-secondary" id="copyThread"><span>📋</span> Copy Entire Thread</button>
                <button class="btn-secondary" id="saveThread"><span>💾</span> Save Thread</button>
            </div>
        </section>
    `,
    templates: `
        <section class="section" id="section-templates">
            <h2 class="section-title">🔥 Viral Templates</h2>
            <p class="section-subtitle">Proven frameworks that get engagement</p>
            <div class="templates-grid" id="templatesGrid"></div>
        </section>
    `,
    scheduler: `
        <section class="section" id="section-scheduler">
            <h2 class="section-title">📅 Post Scheduler</h2>
            <p class="section-subtitle">Plan your content for optimal timing</p>
            <div class="scheduler-container">
                <div class="scheduler-form">
                    <div class="form-group"><label class="form-label">Content</label><textarea class="form-textarea" id="scheduleContent" placeholder="Enter or paste your content..."></textarea></div>
                    <div class="form-row">
                        <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input" id="scheduleDate"></div>
                        <div class="form-group"><label class="form-label">Time</label><input type="time" class="form-input" id="scheduleTime"></div>
                    </div>
                    <button class="btn-primary" id="addSchedule"><span>📅</span> Schedule Post</button>
                </div>
                <div class="scheduler-optimal">
                    <h4>⚡ Optimal Posting Times</h4>
                    <div class="optimal-times">
                        <div class="time-slot"><span class="time">8:00 AM</span><span class="desc">Morning check</span></div>
                        <div class="time-slot highlight"><span class="time">12:00 PM</span><span class="desc">Lunch peak</span></div>
                        <div class="time-slot"><span class="time">5:00 PM</span><span class="desc">After work</span></div>
                        <div class="time-slot highlight"><span class="time">9:00 PM</span><span class="desc">Evening</span></div>
                    </div>
                </div>
            </div>
            <div class="scheduled-posts"><h3>📋 Scheduled Posts</h3><div class="scheduled-list" id="scheduledList"></div></div>
        </section>
    `,
    library: `
        <section class="section" id="section-library">
            <div class="library-header">
                <div><h2 class="section-title">📁 Content Library</h2><p class="section-subtitle">Your saved content collection</p></div>
                <div class="library-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="tweet">Tweets</button>
                    <button class="filter-btn" data-filter="thread">Threads</button>
                </div>
            </div>
            <div class="library-grid" id="libraryGrid"></div>
        </section>
    `,
    trending: `
        <section class="section" id="section-trending">
            <h2 class="section-title">📈 Trending Crypto Topics</h2>
            <p class="section-subtitle">Hot topics to create content about</p>
            <div class="trending-grid" id="trendingGrid"></div>
            <div class="trending-ideas"><h3>💡 Content Ideas</h3><div class="ideas-list" id="contentIdeas"></div></div>
        </section>
    `,
    replies: `
        <section class="section" id="section-replies">
            <h2 class="section-title">💬 Smart Reply Generator</h2>
            <p class="section-subtitle">Generate engaging replies to boost visibility</p>
            <div class="reply-container">
                <div class="reply-form">
                    <div class="form-group"><label class="form-label">Original Tweet</label><textarea class="form-textarea" id="originalTweet" placeholder="Paste the tweet you want to reply to..."></textarea></div>
                    <div class="form-group"><label class="form-label">Reply Style</label>
                        <select class="form-select" id="replyStyle">
                            <option value="agree">👍 Agree & Add Value</option>
                            <option value="question">❓ Thought-Provoking</option>
                            <option value="insight">💡 Share Insight</option>
                            <option value="humor">😂 Witty</option>
                        </select>
                    </div>
                    <button class="btn-primary" id="generateReply"><span>💬</span> Generate Replies</button>
                </div>
                <div class="reply-suggestions" id="replySuggestions"><div class="empty-state"><span class="empty-icon">💬</span><p>Reply suggestions appear here</p></div></div>
            </div>
        </section>
    `
};

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderSection('dashboard');
    setupNavigation();
    setupMobileMenu();
    fetchCryptoPrices();
    updateStats();
}

// ===== Navigation =====
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    const titles = {
        dashboard: 'Dashboard', generator: 'Content Generator', threads: 'Thread Builder',
        templates: 'Viral Templates', scheduler: 'Post Scheduler', library: 'Content Library',
        trending: 'Trending Topics', replies: 'Reply Generator'
    };
    document.getElementById('pageTitle').textContent = titles[section];

    AppState.currentSection = section;
    renderSection(section);

    // Close mobile menu
    document.getElementById('sidebar').classList.remove('active');
}

function renderSection(section) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.innerHTML = SectionTemplates[section];

    // Initialize section-specific functionality
    setTimeout(() => {
        switch (section) {
            case 'dashboard': initDashboard(); break;
            case 'generator': initGenerator(); break;
            case 'threads': initThreadBuilder(); break;
            case 'templates': initTemplates(); break;
            case 'scheduler': initScheduler(); break;
            case 'library': initLibrary(); break;
            case 'trending': initTrending(); break;
            case 'replies': initReplies(); break;
        }
    }, 0);
}

// ===== Mobile Menu =====
function setupMobileMenu() {
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

// ===== Crypto Prices =====
async function fetchCryptoPrices() {
    try {
        const btcEl = document.getElementById('btcPrice');
        const ethEl = document.getElementById('ethPrice');
        // Simulated prices for demo (in production, use CoinGecko API)
        btcEl.innerHTML = '<span class="ticker-icon">₿</span><span>$97,450</span>';
        ethEl.innerHTML = '<span class="ticker-icon">Ξ</span><span>$3,280</span>';
    } catch (e) {
        console.log('Price fetch error:', e);
    }
}

// ===== Stats =====
function updateStats() {
    const el = (id) => document.getElementById(id);
    if (el('totalPosts')) el('totalPosts').textContent = AppState.stats.posts;
    if (el('totalThreads')) el('totalThreads').textContent = AppState.stats.threads;
    if (el('scheduledPosts')) el('scheduledPosts').textContent = AppState.scheduled.length;
    if (el('savedContent')) el('savedContent').textContent = AppState.library.length;
}

function incrementStat(type) {
    AppState.stats[type]++;
    localStorage.setItem('cryptox_stats', JSON.stringify(AppState.stats));
    updateStats();
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Copy to Clipboard =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    });
}

// ===== Dashboard =====
function initDashboard() {
    updateStats();
    renderRecentContent();

    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const sectionMap = { tweet: 'generator', thread: 'threads', reply: 'replies', trending: 'trending' };
            navigateToSection(sectionMap[action]);
        });
    });
}

function renderRecentContent() {
    const container = document.getElementById('recentContent');
    if (!container) return;

    const recent = AppState.library.slice(-3).reverse();
    if (recent.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">📝</span><p>No content yet</p></div>';
        return;
    }

    container.innerHTML = recent.map(item => `
        <div class="scheduled-item">
            <div class="scheduled-content">
                <p>${item.content.substring(0, 60)}...</p>
                <span class="scheduled-time">${item.type} • ${new Date(item.date).toLocaleDateString()}</span>
            </div>
            <button class="action-btn" onclick="copyToClipboard(\`${item.content.replace(/`/g, "'")}\`)">📋</button>
        </div>
    `).join('');
}

// ===== Content Generator =====
function initGenerator() {
    // Type selector
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.contentType = btn.dataset.type;
        });
    });

    // Generate button
    document.getElementById('generateBtn').addEventListener('click', generateContent);
    document.getElementById('regenerateBtn').addEventListener('click', generateContent);
    document.getElementById('copyBtn').addEventListener('click', () => copyToClipboard(AppState.generatedContent));
    document.getElementById('saveContentBtn').addEventListener('click', saveGeneratedContent);
    document.getElementById('scheduleContentBtn').addEventListener('click', openScheduleModal);
}

function generateContent() {
    const topic = document.getElementById('topicInput').value || 'Bitcoin';
    const tone = document.getElementById('toneSelect').value;
    const context = document.getElementById('contextInput').value;

    let templates;
    switch (tone) {
        case 'bullish': templates = ContentTemplates.bullishTweet; break;
        case 'educational': templates = ContentTemplates.educationalTweet; break;
        case 'analytical': templates = ContentTemplates.analyticalTweet; break;
        case 'news': templates = ContentTemplates.newsTweet; break;
        case 'controversial': templates = ContentTemplates.controversialTweet; break;
        case 'humorous': templates = ContentTemplates.humorousTweet; break;
        default: templates = ContentTemplates.bullishTweet;
    }

    let content = templates[Math.floor(Math.random() * templates.length)];
    content = content.replace(/{coin}/g, topic).replace(/{topic}/g, topic);

    if (context) {
        content += `\n\n${context}`;
    }

    AppState.generatedContent = content;

    const outputEl = document.getElementById('generatedContent');
    outputEl.textContent = content;

    const charCount = document.getElementById('charCount');
    charCount.textContent = content.length;
    charCount.style.color = content.length > 280 ? '#ef4444' : '';

    document.getElementById('outputFooter').style.display = 'flex';
    incrementStat('posts');
}

function saveGeneratedContent() {
    if (!AppState.generatedContent) return;

    const item = {
        id: Date.now(),
        type: AppState.contentType,
        content: AppState.generatedContent,
        date: new Date().toISOString()
    };

    AppState.library.push(item);
    localStorage.setItem('cryptox_library', JSON.stringify(AppState.library));
    showToast('Content saved to library!');
}

// ===== Thread Builder =====
function initThreadBuilder() {
    document.getElementById('generateThread').addEventListener('click', generateThread);
    document.getElementById('copyThread')?.addEventListener('click', copyEntireThread);
    document.getElementById('saveThread')?.addEventListener('click', saveThread);
}

function generateThread() {
    const topic = document.getElementById('threadTopic').value || 'Why Crypto Will Change Everything';
    const length = parseInt(document.getElementById('threadLength').value);

    const threadTweets = [
        `🧵 ${topic}\n\nA thread on what most people are getting wrong:\n\n(Save this for later)`,
        `1/ Let's start with the basics.\n\nMost people think they understand ${topic.split(' ')[0]}, but they only see the surface.\n\nHere's what's really happening...`,
        `2/ The first thing to understand:\n\nThis isn't about short-term gains.\n\nIt's about a fundamental shift in how the world works.`,
        `3/ Here's what the data shows:\n\n📈 Adoption is accelerating\n💰 Institutions are entering\n🌍 Global interest is rising\n\nThe trend is undeniable.`,
        `4/ But here's what nobody talks about:\n\nThe technology is evolving faster than most realize.\n\nBy the time mainstream catches on, early adopters will be years ahead.`,
        `5/ My prediction:\n\nIn the next 2-3 years, we'll see:\n\n• Mass adoption\n• Regulatory clarity\n• New use cases we can't imagine\n\nGet positioned now.`,
        `6/ What you should do:\n\n✅ Educate yourself\n✅ Start small\n✅ Think long-term\n✅ Don't panic sell\n\nPatience is the key.`,
        `7/ Final thoughts:\n\nWe're still early.\n\nThe opportunity is massive for those who take action.\n\nIf you found this valuable:\n• Like this thread\n• Follow me for more\n• Retweet to help others`,
        `That's a wrap!\n\nIf you enjoyed this thread, you'll love my other content.\n\nFollow for daily crypto insights 🚀\n\n@YourHandle`,
        `BONUS:\n\nHere's my top resource for learning more about ${topic}:\n\n[Resource/Link]\n\nBookmark this thread for reference 📚`
    ];

    const preview = document.getElementById('threadPreview');
    preview.innerHTML = threadTweets.slice(0, length).map((tweet, i) => `
        <div class="thread-tweet">
            <span class="tweet-number">${i + 1}</span>
            <button class="tweet-copy" onclick="copyToClipboard(\`${tweet.replace(/`/g, "'")}\`)">Copy</button>
            <div class="tweet-content">${tweet}</div>
        </div>
    `).join('');

    document.getElementById('threadActions').style.display = 'flex';
    incrementStat('threads');
}

function copyEntireThread() {
    const tweets = document.querySelectorAll('.tweet-content');
    const thread = Array.from(tweets).map(t => t.textContent).join('\n\n---\n\n');
    copyToClipboard(thread);
}

function saveThread() {
    const tweets = document.querySelectorAll('.tweet-content');
    const thread = Array.from(tweets).map(t => t.textContent).join('\n\n');

    AppState.library.push({
        id: Date.now(),
        type: 'thread',
        content: thread,
        date: new Date().toISOString()
    });
    localStorage.setItem('cryptox_library', JSON.stringify(AppState.library));
    showToast('Thread saved to library!');
}

// ===== Templates =====
function initTemplates() {
    const grid = document.getElementById('templatesGrid');
    grid.innerHTML = ViralTemplates.map(t => `
        <div class="template-card">
            <div class="template-header"><span class="template-icon">${t.icon}</span><span class="template-title">${t.title}</span></div>
            <p class="template-desc">${t.desc}</p>
            <div class="template-preview">${t.preview}</div>
            <button class="template-use" onclick="useTemplate('${t.id}')">Use Template</button>
        </div>
    `).join('');
}

window.useTemplate = function (id) {
    const template = ViralTemplates.find(t => t.id === id);
    if (template) {
        copyToClipboard(template.preview);
        showToast('Template copied! Customize and post.');
    }
};

// ===== Scheduler =====
function initScheduler() {
    // Set default date/time
    const now = new Date();
    document.getElementById('scheduleDate').value = now.toISOString().split('T')[0];
    document.getElementById('scheduleTime').value = '12:00';

    document.getElementById('addSchedule').addEventListener('click', addScheduledPost);
    renderScheduledPosts();
}

function addScheduledPost() {
    const content = document.getElementById('scheduleContent').value;
    const date = document.getElementById('scheduleDate').value;
    const time = document.getElementById('scheduleTime').value;

    if (!content) {
        showToast('Please enter content');
        return;
    }

    AppState.scheduled.push({
        id: Date.now(),
        content,
        datetime: `${date}T${time}`,
        posted: false
    });

    localStorage.setItem('cryptox_scheduled', JSON.stringify(AppState.scheduled));
    document.getElementById('scheduleContent').value = '';
    renderScheduledPosts();
    showToast('Post scheduled!');
}

function renderScheduledPosts() {
    const container = document.getElementById('scheduledList');
    if (!container) return;

    if (AppState.scheduled.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">📅</span><p>No scheduled posts</p></div>';
        return;
    }

    container.innerHTML = AppState.scheduled.map(post => `
        <div class="scheduled-item">
            <div class="scheduled-content">
                <p>${post.content.substring(0, 80)}...</p>
                <span class="scheduled-time">📅 ${new Date(post.datetime).toLocaleString()}</span>
            </div>
            <div class="scheduled-actions">
                <button class="action-btn" onclick="copyToClipboard(\`${post.content.replace(/`/g, "'")}\`)">📋</button>
                <button class="action-btn delete" onclick="deleteScheduled(${post.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

window.deleteScheduled = function (id) {
    AppState.scheduled = AppState.scheduled.filter(p => p.id !== id);
    localStorage.setItem('cryptox_scheduled', JSON.stringify(AppState.scheduled));
    renderScheduledPosts();
    showToast('Post deleted');
};

// ===== Library =====
function initLibrary() {
    renderLibrary('all');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLibrary(btn.dataset.filter);
        });
    });
}

function renderLibrary(filter) {
    const container = document.getElementById('libraryGrid');
    let items = AppState.library;

    if (filter !== 'all') {
        items = items.filter(i => i.type === filter);
    }

    if (items.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">📁</span><p>No saved content</p></div>';
        return;
    }

    container.innerHTML = items.reverse().map(item => `
        <div class="library-item">
            <div class="library-item-header">
                <span class="library-item-type">${item.type}</span>
                <span class="library-item-date">${new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div class="library-item-content">${item.content.substring(0, 150)}...</div>
            <div class="library-item-actions">
                <button class="action-btn" onclick="copyToClipboard(\`${item.content.replace(/`/g, "'")}\`)">📋 Copy</button>
                <button class="action-btn delete" onclick="deleteFromLibrary(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

window.deleteFromLibrary = function (id) {
    AppState.library = AppState.library.filter(i => i.id !== id);
    localStorage.setItem('cryptox_library', JSON.stringify(AppState.library));
    renderLibrary('all');
    showToast('Content deleted');
};

// ===== Trending =====
function initTrending() {
    const grid = document.getElementById('trendingGrid');
    grid.innerHTML = TrendingTopics.map(t => `
        <div class="trending-item" onclick="useTrendingTopic('${t.topic}')">
            <div class="trending-rank">#${t.rank} Trending</div>
            <div class="trending-topic">${t.topic}</div>
            <div class="trending-volume">${t.volume}</div>
        </div>
    `).join('');

    const ideas = document.getElementById('contentIdeas');
    ideas.innerHTML = ContentIdeas.map(idea => `
        <div class="idea-item">
            <div class="idea-content">
                <div class="idea-topic">${idea.topic}</div>
                <div class="idea-suggestion">${idea.suggestion}</div>
            </div>
            <button class="idea-use" onclick="useIdea('${idea.topic}')">Use</button>
        </div>
    `).join('');
}

window.useTrendingTopic = function (topic) {
    navigateToSection('generator');
    setTimeout(() => {
        document.getElementById('topicInput').value = topic;
    }, 100);
};

window.useIdea = window.useTrendingTopic;

// ===== Replies =====
function initReplies() {
    document.getElementById('generateReply').addEventListener('click', generateReplies);
}

function generateReplies() {
    const original = document.getElementById('originalTweet').value;
    const style = document.getElementById('replyStyle').value;

    if (!original) {
        showToast('Please paste the original tweet');
        return;
    }

    const replyTemplates = {
        agree: [
            "100% this. Most people underestimate how important this is.",
            "Couldn't agree more. Been saying this for months.",
            "This is the way. More people need to understand this."
        ],
        question: [
            "Interesting perspective. What do you think about the long-term implications?",
            "Great point. But have you considered...?",
            "This makes sense. How do you see this evolving in 2025?"
        ],
        insight: [
            "Adding to this: the data actually shows...",
            "Great thread. One thing I'd add is...",
            "This is spot on. From my experience, I've also noticed..."
        ],
        humor: [
            "My portfolio after reading this: 📈📈📈 (for 5 minutes) 📉📉📉",
            "Instructions unclear. Bought more Bitcoin.",
            "This is the alpha I needed at 3am. My sleep schedule thanks you."
        ]
    };

    const replies = replyTemplates[style];
    const container = document.getElementById('replySuggestions');

    container.innerHTML = replies.map(reply => `
        <div class="reply-option">
            <div class="reply-text">${reply}</div>
            <button class="reply-copy" onclick="copyToClipboard('${reply}')">📋 Copy Reply</button>
        </div>
    `).join('');
}

// ===== Schedule Modal =====
function openScheduleModal() {
    if (!AppState.generatedContent) return;

    const modal = document.getElementById('scheduleModal');
    modal.classList.add('active');

    document.getElementById('modalContentPreview').textContent = AppState.generatedContent;
    document.getElementById('modalScheduleDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('modalScheduleTime').value = '12:00';

    document.getElementById('closeModal').onclick = () => modal.classList.remove('active');
    document.getElementById('cancelSchedule').onclick = () => modal.classList.remove('active');
    document.querySelector('.modal-overlay').onclick = () => modal.classList.remove('active');

    document.getElementById('confirmSchedule').onclick = () => {
        const date = document.getElementById('modalScheduleDate').value;
        const time = document.getElementById('modalScheduleTime').value;

        AppState.scheduled.push({
            id: Date.now(),
            content: AppState.generatedContent,
            datetime: `${date}T${time}`,
            posted: false
        });

        localStorage.setItem('cryptox_scheduled', JSON.stringify(AppState.scheduled));
        modal.classList.remove('active');
        showToast('Post scheduled!');
    };
}
