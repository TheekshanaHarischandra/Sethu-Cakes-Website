window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".circle").classList.add("show");
    document.querySelector(".h1").classList.add("show");
    document.querySelector(".h3").classList.add("show");
    document.querySelector(".p").classList.add("show");
    document.querySelector(".btn").classList.add("show");
  }, 1000);
});


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn");

  btn.addEventListener("click", () => {
    // Animate OUT — remove the show class
    document.querySelector(".circle").classList.remove("show");
    document.querySelector(".h1").classList.remove("show");
    document.querySelector(".h3").classList.remove("show");
    document.querySelector(".p").classList.remove("show");
    document.querySelector(".btn").classList.remove("show");

    // Wait for animations to complete (match CSS transition: 1.5s)
    setTimeout(() => {
      // Open a new page
      window.open("newpage.html", "_self"); // "_self" = same tab, "_blank" = new tab
    }, 1500);
  });
});

function fadeAndGo(){
  document.body.classList.add('fade-out');
  setTimeout(()=>{
    window.location.href='menu.html';
  },800);}

   // fade in when page loads
window.addEventListener('load', () => {
  document.body.classList.add('fade-in');
  });

/*function openModal(){
  document.getElementById('cakeModal').style.display='block';
  showSlide(currentSlide);
}

function closeModal(){
  document.getElementById('cakeModal').style.display='none';
}

window.onclick = function(event) {
  const modal = document.getElementById('cakeModal');
  if (event.target === modal) {
    closeModal();
  }
}
*/
// Hamb buger menu close

//function toggleMenu() {
//  document.querySelector('.nav-menu').classList.toggle('active');
//}

// ===== Image Slider Logic =====
 function toggleMenu() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.toggle('active');
    }

    // Optional: Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
      }
    });

    // Fade in effect
    window.addEventListener('load', function() {
      document.body.classList.add('fade-in');
    });

let currentSlide = 0;

function openModal(id) {
  document.getElementById(id).style.display = 'block';
  showSlide(currentSlide, id);
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) modal.style.display = 'none';
  });
};

function showSlide(index, modalId) {
  const modal = document.getElementById(modalId);
  const slides = modal.querySelectorAll(".slides");

  if (slides.length === 0) return;

  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlide ? 'block' : 'none';
  });
}

function nextImage(modalId) {
  showSlide(currentSlide + 1, modalId);
}

function prevImage(modalId) {
  showSlide(currentSlide - 1, modalId);
}


/*whts app connect*/



function whatsApp(button) {
  const modalText = button.closest('.modal-text');
  const modalContent = button.closest('.modal-content');

  const cakeName =
    modalText?.querySelector('h3')?.textContent.trim() || 'a cake';

  const price =
    modalText?.querySelector('.b')?.textContent.trim() || '';

  const phoneNumber = "94766839188";

  const firstImage =
    modalContent?.querySelector('.slides')?.src || '';

  let message = `Hi! I'm interested in the ${cakeName}.`;
  if (price) message += `\n${price}`;
  if (firstImage) message += `\nPhoto: ${firstImage}`;

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

