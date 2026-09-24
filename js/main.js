/* ============================================
   School Digital Hub - Main JavaScript
   Navigation and interactivity
   ============================================ */

(function () {
    'use strict';

    // --- DOM Elements ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar__toggle');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mobileMenuButton = document.querySelector('.header__menu-btn');

    // --- State (Default to closed/collapsed) ---
    let isCollapsed = true;
    let isMobileMenuOpen = false;

    // --- Initialize ---
    function init() {
        bindEvents();
        handleResize();
        setActiveLink();
    }

    // --- Event Binding ---
    function bindEvents() {
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeMobileMenu);
        }

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', openMobileMenu);
        }

        window.addEventListener('resize', debounce(handleResize, 150));

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // --- Sidebar Functions ---
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            // Mobile behavior: toggle drawer
            if (isMobileMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return;
        }

        // Desktop behavior: collapse / expand
        isCollapsed = !isCollapsed;
        applyDesktopState();
    }

    function applyDesktopState() {
        if (isCollapsed) {
            if (sidebar) sidebar.classList.add('sidebar--collapsed');
            if (mainContent) mainContent.classList.add('expanded');
            if (footer) footer.classList.add('footer--expanded');
        } else {
            if (sidebar) sidebar.classList.remove('sidebar--collapsed');
            if (mainContent) mainContent.classList.remove('expanded');
            if (footer) footer.classList.remove('footer--expanded');
        }
    }

    function openMobileMenu() {
        isMobileMenuOpen = true;
        if (sidebar) sidebar.classList.add('sidebar--mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.add('sidebar-overlay--visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
        if (sidebar) sidebar.classList.remove('sidebar--mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('sidebar-overlay--visible');
        document.body.style.overflow = '';
    }

    // --- Responsive Handling ---
    function handleResize() {
        const width = window.innerWidth;

        if (width > 768) {
            // Desktop
            closeMobileMenu();
            applyDesktopState();
        } else {
            // Mobile
            if (sidebar) sidebar.classList.remove('sidebar--collapsed');
            if (mainContent) mainContent.classList.remove('expanded');
            if (footer) footer.classList.remove('footer--expanded');
            closeMobileMenu();
        }
    }

    // --- Active Link ---
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.sidebar__nav-link');

        links.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href)) {
                link.classList.add('sidebar__nav-link--active');
            } else {
                link.classList.remove('sidebar__nav-link--active');
            }
        });
    }

    // --- Utility ---
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }

    // --- Initialize when DOM is ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();