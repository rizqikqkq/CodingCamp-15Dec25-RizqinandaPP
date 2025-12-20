
let lastScrollTop = 0;
let scrollTimer = null;
let isZoomed = false;
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");




function visitorName(){
    const visitorName = localStorage.getItem('visitorName');
    if (!visitorName) {
      window.location.href = 'welcome.html';
    }
}
function clearVisitorName() {
    localStorage.removeItem('visitorName');
    window.location.href = 'welcome.html';
}
function createImagePreview() {
    return `
      <div id="imageModal" class="hidden fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onclick="closeImagePreview()">
        <div class="relative max-w-4xl max-h-96" onclick="event.stopPropagation()">
          <img id="previewImage" src="" alt="Preview" class="w-full h-auto cursor-zoom-in" onclick="toggleZoom(event)">
          <button onclick="closeImagePreview()" class="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <p class="text-white text-center mt-2 text-sm">Click image to zoom</p>
        </div>
      </div>
      `;
}


function createNavigation() {
    return `
        <nav id="navbar" class="nav-container border-b px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300">
            <a href="index.html" class="flex items-center cursor-pointer hover:opacity-80 transition"
                aria-label="Go to homepage">
                <div class="w-10 h-10 flex items-center justify-center">
                    <img src="src/image/icon.png" alt="Logo" />
                </div>
            </a>
            
            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-0">
                <button onclick="handleNavClick('hero')" class="nav-btn px-8 py-1 border-2 rounded-l-lg text-sm">Home</button>
                <button onclick="navigateTo('profile.html')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 text-sm">Our Profile</button>
                <button onclick="handleNavClick('portfolio')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 text-sm">Portfolio</button>
                <button onclick="handleNavClick('message')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 rounded-r-lg text-sm">Message Us</button>
            </div>
            
            <!-- Mobile Hamburger Button -->
            <button id="hamburger" class="md:hidden flex flex-col space-y-1.5 p-2 z-50" onclick="toggleMobileMenu()">
                <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
            </button>
        </nav>
        
        <!-- Mobile Sidebar Overlay -->
        <div id="mobileOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden" onclick="toggleMobileMenu()"></div>
        
        <!-- Mobile Sidebar Menu -->
        <div id="mobileMenu" class="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 md:hidden">
            <div class="flex flex-col h-full">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between p-6 border-b">
                    <h2 class="text-lg font-bold">Menu</h2>
                    <button onclick="toggleMobileMenu()" class="text-gray-600 hover:text-gray-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Sidebar Menu Items -->
                <div class="flex flex-col p-4 space-y-2 flex-1">
                    <button onclick="handleNavClick('hero'); toggleMobileMenu()" class="mobile-menu-btn w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Home
                    </button>
                    <button onclick="navigateTo('profile.html'); toggleMobileMenu()" class="mobile-menu-btn w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Our Profile
                    </button>
                    <button onclick="handleNavClick('portfolio'); toggleMobileMenu()" class="mobile-menu-btn w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        Portfolio
                    </button>
                    <button onclick="handleNavClick('message'); toggleMobileMenu()" class="mobile-menu-btn w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Message Us
                    </button>
                </div>
                
                <!-- Sidebar Footer -->
                <div class="p-4 border-t text-center text-sm text-gray-600">
                    © Rizqinanda 2025 
                </div>
            </div>
        </div>
    `;
}
function isIndexPage() {
    const currentPage = window.location.pathname;
    return currentPage.endsWith('index.html') || currentPage.endsWith('/') || currentPage === '';
}
function handleNavClick(sectionId) {
    if (isIndexPage()) {
        scrollToSection(sectionId);
    } else {
        window.location.href = `index.html#${sectionId}`;
    }
}

function setActiveNav() {
    const currentPage = window.location.pathname;
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    if (currentPage.includes('profile.html')) {
        navButtons[1].classList.add('active');
    } else {
        navButtons[0].classList.add('active');
    }
}

function initMessageForm() {
    const messageForm = document.getElementById('messageForm');
    if (!messageForm) {
        console.log('Message form not found');
        return;
    }
    
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation(); 

        const nama = document.getElementById('nama').value.trim();
        const tanggal_lahir = document.getElementById('tanggal_lahir').value;
        const jenis_kelamin = document.querySelector('input[name="jenis_kelamin"]:checked');
        const pesan = document.getElementById('pesan').value.trim();

        if (!jenis_kelamin) {
            alert('Harap pilih gender.');
            return false;
        } if (!nama || !tanggal_lahir || !jenis_kelamin || !pesan) {
            alert('Semua field harus diisi');
            return false;
        }

        const message = {
            nama,
            tanggal_lahir,
            jenis_kelamin: jenis_kelamin.value,
            pesan,
            timestamp: new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta'
            })
        };

        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        this.reset();
        displayMessages();
        
        return false;
    });
    
    displayMessages();
}

function createFooter() {
    return `
        <footer class="footer px-6 py-4">
            <div class="flex flex-col md:flex-row items-left justify-between gap-4">
                <div class="flex items-center gap-4">
                    <a href="https://www.linkedin.com/in/rizqin-pp" target="_blank" rel="noopener noreferrer" 
                       class="text-gray-600 hover:text-blue-600 transition-colors duration-200" 
                       title="LinkedIn">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                    </a>
                    <a href="https://github.com/rizqikqkq" target="_blank" rel="noopener noreferrer" 
                       class="text-gray-600 hover:text-gray-900 transition-colors duration-200" 
                       title="GitHub">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                        </svg>
                    </a>
                </div>
                <span class="text-xs text-gray-500">
                    Disclaimer : This Website is just for Education Purpose Only
                </span>
                <div class="text-sm">
                    © Rizqinanda 2025
                </div>
            </div>
        </footer>
    `;
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const hamburger = document.getElementById('hamburger');
    const body = document.body;
    
    if (mobileMenu.classList.contains('translate-x-0')) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileOverlay.classList.add('opacity-100', 'pointer-events-auto');
        hamburger.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function navigateTo(page) {
    window.location.href = page;
}

function setActiveNavOnScroll() {
    const sections = ['hero', 'portfolio', 'message'];
    const navButtons = document.querySelectorAll('.nav-btn[data-section]');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navButtons.forEach(btn => {
        const section = btn.getAttribute('data-section');
        if (section === currentSection) {
            btn.classList.add('bg-gray-200', 'font-semibold');
        } else {
            btn.classList.remove('bg-gray-200', 'font-semibold');
        }
    });
}


function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Don't hide if mobile menu is open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) {
        return;
    }
    
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else { 
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    scrollTimer = setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
    }, 1000);
}

function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const container = document.getElementById('chatContainer');
    container.innerHTML = '';
    
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'bg-green-200 rounded p-3 mb-3 text-sm';
        div.innerHTML = `
            <p><strong>Nama:</strong> ${msg.nama}</p>
            <p><strong>Tanggal Lahir:</strong> ${msg.tanggal_lahir}</p>
            <p><strong>Jenis Kelamin:</strong> ${msg.jenis_kelamin}</p>
            <p><strong>Pesan:</strong> ${msg.pesan}</p>
            <p class="text-xs text-gray-600 mt-2">${msg.timestamp}</p>
        `;
        container.appendChild(div);
    });
}

        
function openImagePreview(src) {
    const modal = document.getElementById('imageModal');
    const previewImage = document.getElementById('previewImage');
    
    previewImage.src = src;
    modal.classList.remove('hidden');
    
    requestAnimationFrame(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        previewImage.style.transform = 'scale(0.8) translateY(20px)';
        previewImage.style.opacity = '0';
        
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.4s ease-out';
            previewImage.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            modal.classList.remove('opacity-0', 'pointer-events-none');
            previewImage.style.transform = 'scale(1) translateY(0)';
            previewImage.style.opacity = '1';
        });
    });
    
    isZoomed = false;
}

function closeImagePreview() {
    const modal = document.getElementById('imageModal');
    const previewImage = document.getElementById('previewImage');
    
    previewImage.style.transition = 'transform 0.4s ease';
    previewImage.style.transform = 'scale(0.8)';
    
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        isZoomed = false;
        previewImage.style.transform = 'scale(1)';
        modal.classList.remove('opacity-0'); 
    }, 400); 
}

function toggleZoom(event) {
    const img = event.target;
    const modal = document.getElementById('imageModal');
    
    isZoomed = !isZoomed;
    
    if (isZoomed) {
        img.style.cursor = 'grab';
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1.5)';
        img.style.transition = 'transform 0.3s ease';
        
        modal.addEventListener('wheel', handleZoomScroll, { passive: false });
        
        img.addEventListener('mousemove', handleImagePan);
    } else {
        img.style.cursor = 'zoom-in';
        img.style.transform = 'scale(1) translate(0, 0)';
        img.style.transition = 'transform 0.3s ease';
        
        modal.removeEventListener('wheel', handleZoomScroll);
        img.removeEventListener('mousemove', handleImagePan);
    }
}

let currentZoom = 1.5;

function handleZoomScroll(event) {
    if (!isZoomed) return;
    
    event.preventDefault();
    const img = document.getElementById('previewImage');
    const zoomStep = 0.2;
    
    currentZoom += event.deltaY > 0 ? -zoomStep : zoomStep;
    currentZoom = Math.max(1, Math.min(currentZoom, 3));
    
    img.style.transform = `scale(${currentZoom})`;
}

function handleImagePan(event) {
    if (!isZoomed || currentZoom <= 1) return;
    
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;
    
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = `scale(${currentZoom})`;
}

function skipWelcome() {
    localStorage.setItem('visitorName', 'Guest');
    window.location.href = 'index.html';
}
function initWelcomePage() {
    // Check if visitor already has a name stored
    const visitorName = localStorage.getItem('visitorName');
    if (visitorName) {
        window.location.href = 'index.html';
    }
    
    // Setup welcome form submission
    const welcomeForm = document.getElementById('welcomeForm');
    if (welcomeForm) {
        welcomeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('visitorName').value.trim();
            
            if (name) {
                localStorage.setItem('visitorName', name);
                
                const form = this;
                form.style.opacity = '0';
                form.style.transform = 'scale(0.9)';
                form.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('welcome.html')) {
        initWelcomePage();
        return; // Exit early for welcome page
    }
    
    const hash = window.location.hash.substring(1);
    if (hash && isIndexPage()) {
        setTimeout(() => {
            scrollToSection(hash);
        }, 100);
    }

    const birthDateInput = document.getElementById('tanggal_lahir');
    if (birthDateInput) {
        // Set max date to 5 years ago
        const today = new Date();
        const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
        birthDateInput.max = fiveYearsAgo.toISOString().split('T')[0];
    }

    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = createNavigation();
    }
    
    const portfolio = document.getElementById('img_preview');
    if (portfolio) {
        portfolio.innerHTML = createImagePreview();
    }
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }

    const visitorName = localStorage.getItem('visitorName');
    const heroTitle = document.getElementById('welcome-speech');
    if (heroTitle && visitorName) {
        heroTitle.textContent = `Hello ${visitorName},`;
    }

    const slides = document.querySelectorAll(".slide");
    if (slides.length) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("hidden", i !== index);
            });
        }

        // Expose globally for inline onclick
        window.nextSlide = function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        window.prevSlide = function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };
    }

    initMessageForm();
    
    window.addEventListener('scroll', function() {
        setActiveNavOnScroll();
        handleNavbarScroll();
    });
});