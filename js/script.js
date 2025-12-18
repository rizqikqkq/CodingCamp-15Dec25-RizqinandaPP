
function visitorName(){
    const visitorName = localStorage.getItem('visitorName');
    if (!visitorName) {
      window.location.href = 'welcome.html';
    }
}

function createNavigation() {
    return `
        <nav id="navbar" class="nav-container border-b px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full flex items-center justify-center">
                <img src="src/image/icon.png" alt="Logo" />
              </div>
            </div>
            
            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-0">
                <button onclick="scrollToSection('hero')" class="nav-btn px-8 py-1 border-2 rounded-l-lg hover:bg-opacity-20 hover:bg-white text-sm">Home</button>
                <button onclick="navigateTo('profile.html')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 hover:bg-opacity-20 hover:bg-white text-sm">Our Profile</button>
                <button onclick="scrollToSection('portfolio')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 hover:bg-opacity-20 hover:bg-white text-sm">Portfolio</button>
                <button onclick="scrollToSection('message')" class="nav-btn px-8 py-1 border-t-2 border-b-2 border-r-2 rounded-r-lg hover:bg-opacity-20 hover:bg-white text-sm">Message Us</button>
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
                    <button onclick="scrollToSection('hero'); toggleMobileMenu()" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Home
                    </button>
                    <button onclick="navigateTo('profile.html')" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Our Profile
                    </button>
                    <button onclick="scrollToSection('portfolio'); toggleMobileMenu()" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        Portfolio
                    </button>
                    <button onclick="scrollToSection('message'); toggleMobileMenu()" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center">
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

function createFooter() {
    return `
        <footer class="footer px-6 py-4 text-right text-sm">
            © Rizqinanda 2025
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

let lastScrollTop = 0;
let scrollTimer = null;

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Don't hide if mobile menu is open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) {
        return;
    }
    
    // Clear any existing timer
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

document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = createNavigation();
    }
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }

    const visitorName = localStorage.getItem('visitorName');
    const heroTitle = document.getElementById('welcome-speech');
    if (heroTitle && visitorName) {
        heroTitle.textContent = `Hello ${visitorName}, Welcome To My Website!`;
    }
    
    window.addEventListener('scroll', function() {
        setActiveNavOnScroll();
        handleNavbarScroll();
    });
});

function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const container = document.getElementById('chatContainer');
    container.innerHTML = '';
    
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'bg-blue-100 rounded p-3 mb-3 text-sm';
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