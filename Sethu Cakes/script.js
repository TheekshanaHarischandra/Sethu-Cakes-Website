/* ==========================================================================
   SETHU CAKES - INTERACTIVE SCRIPT & LOGIC
   ========================================================================== */

// Fade in on page load
window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});

// Fade out navigation function
function fadeAndGo(url) {
  document.body.classList.remove("fade-in");
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url || 'menu.html';
  }, 500);
}

// Toggle Navigation Menu on Mobile
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  
  if (navMenu && hamburger) {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  }
});

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
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  currentSlideIndex = 0;
  showSlide(currentSlideIndex, modalId);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
  }
  document.body.style.overflow = 'auto';
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.remove('open');
    modal.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content box or pressing Escape
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});

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
    slide.style.display = i === currentSlideIndex ? 'block' : 'none';
  });
}

function nextImage(modalId) {
  showSlide(currentSlideIndex + 1, modalId);
}

function prevImage(modalId) {
  showSlide(currentSlideIndex - 1, modalId);
}

// WhatsApp Order Generator (Price-Free)
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

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}
