/* ==========================================================================
   SETHU CAKES - INTERACTIVE SCRIPT & LOGIC
   ========================================================================== */

// Fade in on page load
window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});

// URL Sanitization helper to prevent open-redirect and javascript: pseudo-protocol XSS
function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return 'menu.html';
  const trimmed = rawUrl.trim();

  // Block javascript:, data:, vbscript:, and protocol-relative (//) URLs
  if (/^(javascript:|data:|vbscript:|\/\/)/i.test(trimmed)) {
    return 'menu.html';
  }

  // Whitelist safe relative HTML pages used in this site (preserves relative paths for file:// and subfolders)
  const allowedPages = ['menu.html', 'index.html'];
  const baseName = trimmed.split('?')[0].split('#')[0];
  if (allowedPages.includes(baseName)) {
    return trimmed;
  }

  // Safe internal anchor navigation (e.g. #home, #about)
  if (/^#[a-zA-Z0-9_\-]+$/.test(trimmed)) {
    return trimmed;
  }

  return 'menu.html';
}

// Fade out navigation function
function fadeAndGo(url) {
  const safeUrl = sanitizeUrl(url);
  document.body.classList.remove("fade-in");
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = safeUrl;
  }, 500);
}

// Toggle Navigation Menu on Mobile
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// Category Filter System
function filterCategory(category, buttonElement) {
  // Update active state on filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (buttonElement) {
    buttonElement.classList.add('active');
  }

  // Filter cake items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}

// Modal & Gallery Slider Management
let currentSlideIndex = 0;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Close any open modals first
  closeAllModals();

  modal.classList.add('open');
  document.body.classList.add('modal-open');

  currentSlideIndex = 0;
  showSlide(currentSlideIndex, modalId);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
  document.body.classList.remove('modal-open');
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.remove('open');
  });
  document.body.classList.remove('modal-open');
}

// Gallery Slide Navigation
function showSlide(index, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const slides = modal.querySelectorAll('.slides');
  if (slides.length === 0) return;

  if (index >= slides.length) currentSlideIndex = 0;
  else if (index < 0) currentSlideIndex = slides.length - 1;
  else currentSlideIndex = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlideIndex);
  });
}

function nextImage(modalId) {
  showSlide(currentSlideIndex + 1, modalId);
}

function prevImage(modalId) {
  showSlide(currentSlideIndex - 1, modalId);
}

// WhatsApp Order Generator (Price-Free) with noopener noreferrer
function whatsApp(button) {
  const modalContent = button.closest('.modal-content') || button.closest('.modal-text');
  
  const cakeName =
    modalContent?.querySelector('h3')?.textContent.trim() || 'Custom Cake';

  const phoneNumber = "94741421929";

  const firstImage =
    modalContent?.querySelector('.slides')?.src || '';

  let message = `Hi Sethu Cakes! 👋\nI'm interested in ordering the *${cakeName}*.`;
  if (firstImage) {
    message += `\nReference Image: ${firstImage}`;
  }
  message += `\nCould you please let me know availability and details?`;

  const waWindow = window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
  if (waWindow) {
    waWindow.opener = null;
  }
}

// ==========================================================================
// SECURE EVENT LISTENERS (Replaces inline onclick attributes for CSP compliance)
// ==========================================================================
document.addEventListener('click', function(event) {
  // 1. Navigation fade-and-go buttons
  const fadeBtn = event.target.closest('[data-action="fade-nav"]');
  if (fadeBtn) {
    const url = fadeBtn.getAttribute('data-url') || 'menu.html';
    fadeAndGo(url);
    return;
  }

  // 2. Logo click navigation
  const logoBtn = event.target.closest('[data-action="nav-home"]');
  if (logoBtn) {
    window.location.href = '#home';
    return;
  }

  // 3. Hamburger menu toggle
  const hamburger = event.target.closest('.hamburger, [data-action="toggle-menu"]');
  if (hamburger) {
    toggleMenu();
    return;
  }

  // 4. Mobile nav links - close menu upon clicking link
  const navLink = event.target.closest('.nav-menu a');
  if (navLink) {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  }

  // 5. Close mobile menu when clicking outside menu and hamburger
  const navMenu = document.querySelector('.nav-menu');
  const activeHamburger = document.querySelector('.hamburger');
  if (navMenu && activeHamburger && navMenu.classList.contains('active')) {
    if (!activeHamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  }

  // 6. Category filter buttons
  const filterBtn = event.target.closest('.filter-btn');
  if (filterBtn) {
    const category = filterBtn.getAttribute('data-filter') || 'all';
    filterCategory(category, filterBtn);
    return;
  }

  // 7. Modal Prev / Next buttons
  const prevBtn = event.target.closest('.prev, [data-slide="prev"]');
  if (prevBtn) {
    const modal = prevBtn.closest('.modal');
    const modalId = prevBtn.getAttribute('data-modal') || (modal ? modal.id : null);
    if (modalId) {
      prevImage(modalId);
    }
    return;
  }

  const nextBtn = event.target.closest('.next, [data-slide="next"]');
  if (nextBtn) {
    const modal = nextBtn.closest('.modal');
    const modalId = nextBtn.getAttribute('data-modal') || (modal ? modal.id : null);
    if (modalId) {
      nextImage(modalId);
    }
    return;
  }

  // 8. Close modal button (x)
  const closeBtn = event.target.closest('.close, [data-close-modal]');
  if (closeBtn) {
    const modal = closeBtn.closest('.modal');
    const modalId = closeBtn.getAttribute('data-close-modal') || (modal ? modal.id : null);
    if (modalId) {
      closeModal(modalId);
    }
    return;
  }

  // 9. WhatsApp order button inside modal
  const waBtn = event.target.closest('.btn-whatsapp, [data-action="whatsapp"]');
  if (waBtn) {
    whatsApp(waBtn);
    return;
  }

  // 10. Menu card clicked -> open modal
  const menuItem = event.target.closest('.menu-item[data-modal]');
  if (menuItem && !event.target.closest('.modal')) {
    const modalId = menuItem.getAttribute('data-modal');
    if (modalId) {
      openModal(modalId);
    }
    return;
  }

  // 11. Click outside modal content box (backdrop click) closes modal
  if (event.target.classList && event.target.classList.contains('modal')) {
    closeModal(event.target.id);
  }
});

// Close modal on Escape key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});

// Expose functions globally for backward compatibility
window.fadeAndGo = fadeAndGo;
window.toggleMenu = toggleMenu;
window.filterCategory = filterCategory;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;
window.showSlide = showSlide;
window.nextImage = nextImage;
window.prevImage = prevImage;
window.whatsApp = whatsApp;
