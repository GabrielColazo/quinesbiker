// ============================================================
// main.js — Quines Biker
// ============================================================


// ─── NAVBAR SCROLL ──────────────────────────────────────────
// Agrega clase .scrolled a la navbar al hacer scroll
const navbar = document.querySelector('.navbar-quines');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ─── ACTIVE LINK ────────────────────────────────────────────
// Marca el link activo según la sección visible
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));


// ─── CERRAR MENÚ MOBILE ─────────────────────────────────────
// Cierra el menú hamburguesa al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.querySelector('#navMenu');
  const toggler = document.querySelector('.navbar-toggler');
  if (!menu.contains(e.target) && !toggler.contains(e.target)) {
    bootstrap.Collapse.getInstance(menu)?.hide();
  }
});