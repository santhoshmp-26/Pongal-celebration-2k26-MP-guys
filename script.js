 /**
         * CONFIGURATION
         * Replace the 'src' values below with your local file paths.
         * Example: src: "media/dance/dance_performance.mp4"
         * * For this demo, I am using online placeholder videos/images.
         */
        const festivalData = {
            dance: [
                { title: "Village Folk Dance", type: "video", src: "1.mp4", thumb: "1.png" },
                { title: "Bharatanatyam Solo", type: "video", src: "2.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 1", type: "video", src: "3.mp4", thumb: "1.png" },
                { title: "Kids Group Dance  2", type: "video", src: "4.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 3", type: "video", src: "5.mp4", thumb: "1.png" },
                { title: "Kids Group Dance  4", type: "video", src: "6.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 5", type: "video", src: "7.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 6", type: "video", src: "8.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 7", type: "video", src: "9.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 8", type: "video", src: "10.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 9", type: "video", src: "11.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 10", type: "video", src: "12.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 11", type: "video", src: "13.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 12", type: "video", src: "14.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 13", type: "video", src: "15.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 14", type: "video", src: "16.mp4", thumb: "1.png" },
                { title: "Kids Group Dance 15", type: "video", src: "17.mp4", thumb: "1.png" },
                { title: "Kids Group Dance16 ", type: "video", src: "18.mp4", thumb: "1.png" },


        
            ],
            games: [
                { title: "Uriyadi (Pot Breaking)", type: "video", src: "https://videos.pexels.com/video-files/5465992/5465992-sd_640_360_25fps.mp4", thumb: "https://images.unsplash.com/photo-1620215732159-86927c945147?w=500&q=80" },
                { title: "Tug of War", type: "image", src: "https://images.unsplash.com/photo-1563276662-8e10086d07d4?w=800&q=80", thumb: "https://images.unsplash.com/photo-1563276662-8e10086d07d4?w=500&q=80" },
            ],
            events: [
                { title: "Chief Guest Speech", type: "image", src: "https://images.unsplash.com/photo-1475721027767-4d529c1b6a11?w=800&q=80", thumb: "https://images.unsplash.com/photo-1475721027767-4d529c1b6a11?w=500&q=80" },
                { title: "Prize Distribution", type: "video", src: "https://videos.pexels.com/video-files/8472493/8472493-sd_640_360_25fps.mp4", thumb: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500&q=80" },
            ],
            photos: [
                { title: "Cooking Pongal", type: "image", src: "https://images.unsplash.com/photo-1610363248386-35e6c703d154?w=800&q=80", thumb: "https://images.unsplash.com/photo-1610363248386-35e6c703d154?w=500&q=80" },
                { title: "Family Smiles", type: "image", src: "https://images.unsplash.com/photo-1614945484838-892f39281577?w=800&q=80", thumb: "https://images.unsplash.com/photo-1614945484838-892f39281577?w=500&q=80" },
                { title: "Village Elders", type: "image", src: "https://images.unsplash.com/photo-1543356019-38b827dbd23a?w=800&q=80", thumb: "https://images.unsplash.com/photo-1543356019-38b827dbd23a?w=500&q=80" },
                { title: "Decoration", type: "image", src: "https://images.unsplash.com/photo-1611153725516-7248e3678083?w=800&q=80", thumb: "https://images.unsplash.com/photo-1611153725516-7248e3678083?w=500&q=80" },
            ],
            highlights: [
                { title: "Best Moments Mashup", type: "video", src: "https://videos.pexels.com/video-files/3196296/3196296-sd_640_360_25fps.mp4", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80" }
            ]
        };

        class FestivalApp {
            constructor() {
                this.currentCategory = 'dance';
                this.currentPlaylist = [];
                this.currentIndex = 0;
                this.slideshowInterval = null;
                this.isPlaying = false;
                
                // DOM Elements
                this.tabsContainer = document.getElementById('tabs');
                this.grid = document.getElementById('grid');
                this.loader = document.getElementById('loader');
                this.lightbox = document.getElementById('lightbox');
                
                this.init();
            }

            init() {
                // Simulate loading assets
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.loader.style.opacity = '0';
                        setTimeout(() => this.loader.remove(), 500);
                        this.initParticles();
                    }, 1500);
                });

                this.renderTabs();
                this.loadCategory('dance');
                this.setupEventListeners();
            }

            // --- RENDER LOGIC ---

            renderTabs() {
                const categories = [
                    { key: 'dance', label: '🕺 Dance' },
                    { key: 'games', label: '🎯 Games' },
                    { key: 'events', label: '🎤 Stage' },
                    { key: 'photos', label: '📸 Photos' },
                    { key: 'highlights', label: '⭐ Highlights' }
                ];

                this.tabsContainer.innerHTML = categories.map(cat => `
                    <button class="tab-btn ${cat.key === this.currentCategory ? 'active' : ''}" 
                            data-cat="${cat.key}"
                            onclick="app.loadCategory('${cat.key}')">
                        ${cat.label}
                    </button>
                `).join('');
            }

            loadCategory(category) {
                this.currentCategory = category;
                
                // Update active tab styling
                const btns = document.querySelectorAll('.tab-btn');
                btns.forEach(btn => {
                    const isActive = btn.dataset.cat === category;
                    btn.classList.toggle('active', isActive);
                    // Center active tab
                    if (isActive) {
                         btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });

                // Prepare Data
                this.currentPlaylist = festivalData[category] || [];
                
                // Clear grid with fade out effect if needed, but simple innerHTML is faster
                this.grid.innerHTML = '';

                // Render Grid Items
                if(this.currentPlaylist.length === 0) {
                    this.grid.innerHTML = '<div style="color:var(--text-muted); padding:20px; grid-column:1/-1; text-align:center;">No memories yet. Add files to the folder!</div>';
                    return;
                }

                this.currentPlaylist.forEach((item, index) => {
                    const delay = index * 0.1; // Staggered animation
                    const card = document.createElement('div');
                    card.className = 'media-card';
                    card.style.animationDelay = `${delay}s`;
                    card.onclick = () => this.openLightbox(index);

                    const icon = item.type === 'video' ? '▶' : '🔍';

                    card.innerHTML = `
                        <img src="${item.thumb || item.src}" class="card-thumb" alt="${item.title}" loading="lazy">
                        <div class="play-icon">${icon}</div>
                        <div class="card-overlay">
                            <span class="card-tag">${item.type}</span>
                            <div class="card-title">${item.title}</div>
                        </div>
                    `;
                    this.grid.appendChild(card);
                });
            }

            // --- LIGHTBOX LOGIC ---

            openLightbox(index) {
                this.currentIndex = index;
                this.lightbox.classList.add('active');
                this.updateLightboxContent();
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }

            closeLightbox() {
                this.stopSlideshow();
                this.lightbox.classList.remove('active');
                
                // Clear content to stop videos playing in background
                setTimeout(() => {
                    document.getElementById('lbMain').innerHTML = '';
                    document.body.style.overflow = 'auto';
                }, 300);
            }

            updateLightboxContent() {
                const item = this.currentPlaylist[this.currentIndex];
                const container = document.getElementById('lbMain');
                document.getElementById('lbTitle').innerText = item.title;

                container.innerHTML = ''; // Clear prev

                if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.className = 'lb-content';
                    video.src = item.src;
                    video.controls = true;
                    video.autoplay = true;
                    // iOS plays inline requirement
                    video.setAttribute('playsinline', '');
                    
                    // Auto-advance when video ends
                    video.onended = () => {
                        if(this.isPlaying || true) { // Always smart-advance on video end
                            this.nextMedia();
                        }
                    };
                    
                    container.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.className = 'lb-content';
                    img.src = item.src;
                    container.appendChild(img);
                }

                // Preload next image/video for performance
                this.preloadNext(this.currentIndex + 1);
            }

            nextMedia() {
                this.currentIndex = (this.currentIndex + 1) % this.currentPlaylist.length;
                this.updateLightboxContent();
            }

            prevMedia() {
                this.currentIndex = (this.currentIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
                this.updateLightboxContent();
            }

            preloadNext(idx) {
                const nextIdx = idx % this.currentPlaylist.length;
                const nextItem = this.currentPlaylist[nextIdx];
                if(nextItem.type === 'image') {
                    const img = new Image();
                    img.src = nextItem.src;
                }
            }

            // --- FEATURES: SLIDESHOW & SHARE ---

            toggleSlideshow() {
                if (this.isPlaying) {
                    this.stopSlideshow();
                } else {
                    this.startSlideshow();
                }
            }

            startSlideshow() {
                this.isPlaying = true;
                document.getElementById('playIcon').innerText = '⏸';
                document.getElementById('playText').innerText = 'Pause';
                
                // Check if current is image, if so, setup timer. If video, onended handles it.
                const currentItem = this.currentPlaylist[this.currentIndex];
                if (currentItem.type === 'image') {
                    this.slideshowInterval = setInterval(() => {
                        this.nextMedia();
                        // If we hit a video, the interval needs to pause until video ends.
                        // Simple logic: clear interval, rely on video.onended to restart loop?
                        // For simplicity in this robust script: we clear interval inside updateContent if video
                    }, 3000);
                }
            }

            stopSlideshow() {
                this.isPlaying = false;
                document.getElementById('playIcon').innerText = '▶';
                document.getElementById('playText').innerText = 'Play All';
                clearInterval(this.slideshowInterval);
            }

            downloadMedia() {
                const item = this.currentPlaylist[this.currentIndex];
                const link = document.createElement('a');
                link.href = item.src;
                link.download = `Pongal_${item.title}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            shareMedia() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('✨ Album link copied to clipboard! Share the memories.');
                });
            }

            scrollToGallery() {
                this.tabsContainer.scrollIntoView({ behavior: 'smooth' });
            }

            setupEventListeners() {
                // Keyboard Nav
                document.addEventListener('keydown', (e) => {
                    if (!this.lightbox.classList.contains('active')) return;
                    if (e.key === 'Escape') this.closeLightbox();
                    if (e.key === 'ArrowRight') this.nextMedia();
                    if (e.key === 'ArrowLeft') this.prevMedia();
                });

                // Swipe Detection
                let touchStartX = 0;
                this.lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
                this.lightbox.addEventListener('touchend', e => {
                    let touchEndX = e.changedTouches[0].screenX;
                    if (touchStartX - touchEndX > 50) this.nextMedia();
                    if (touchEndX - touchStartX > 50) this.prevMedia();
                });
            }

            // --- ANIMATION: PARTICLES ---
            initParticles() {
                const canvas = document.getElementById('particleCanvas');
                const ctx = canvas.getContext('2d');
                let width, height;
                let particles = [];

                const resize = () => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = document.querySelector('.hero').offsetHeight;
                };

                class Particle {
                    constructor() {
                        this.reset();
                    }
                    reset() {
                        this.x = Math.random() * width;
                        this.y = Math.random() * height;
                        this.vx = (Math.random() - 0.5) * 0.5;
                        this.vy = (Math.random() - 0.5) * 0.5;
                        this.size = Math.random() * 3 + 1;
                        this.color = `rgba(255, 215, 0, ${Math.random() * 0.5})`; // Gold dust
                    }
                    update() {
                        this.x += this.vx;
                        this.y += this.vy;
                        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
                    }
                    draw() {
                        ctx.fillStyle = this.color;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                const animate = () => {
                    ctx.clearRect(0, 0, width, height);
                    particles.forEach(p => { p.update(); p.draw(); });
                    requestAnimationFrame(animate);
                };

                resize();
                window.addEventListener('resize', resize);
                for(let i=0; i<50; i++) particles.push(new Particle());
                animate();
            }
        }

        // Initialize App
        const app = new FestivalApp();