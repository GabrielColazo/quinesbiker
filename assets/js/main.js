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

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedorGaleria');
  const btnPrev = document.getElementById('btnGaleriaPrev');
  const btnNext = document.getElementById('btnGaleriaNext');
  
  // 1. Generar las 33 imágenes automáticamente
  if (contenedor) {
    let htmlContenido = '';
    for (let i = 1; i <= 33; i++) {
      htmlContenido += `
        <div class="galeria-tira__item" data-bs-toggle="modal" data-bs-target="#galeriaModal">
          <img src="./assets/img/galeria-${i}.webp" alt="Quines Biker en Acción - Foto ${i}" class="galeria-tira__img">
          <div class="galeria-tira__overlay">
            <i class="bi bi-zoom-in galeria-tira__icon"></i>
          </div>
        </div>
      `;
    }
    contenedor.innerHTML = htmlContenido;
  }

  // 2. Lógica de las flechas de navegación
  if (btnPrev && btnNext && contenedor) {
    // Calculamos cuánto scroll desplazar (el ancho del contenedor dividido 2 es ideal)
    const calcularDesplazamiento = () => contenedor.clientWidth / 1.5;

    btnNext.addEventListener('click', () => {
      contenedor.scrollBy({ left: calcularDesplazamiento(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      contenedor.scrollBy({ left: -calcularDesplazamiento(), behavior: 'smooth' });
    });
  }
});