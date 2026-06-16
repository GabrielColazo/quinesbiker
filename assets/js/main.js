// ============================================================
// main.js — Quines Biker
// Lógica e interactividad del sitio (Integrado con Tabs)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedorGelaria'); // Nota: asegurate si es contenedorGaleria o contenedorGelaria en tu HTML
  const contenedorReal = contenedor || document.getElementById('contenedorGaleria');
  const btnPrev = document.getElementById('btnGaleriaPrev');
  const btnNext = document.getElementById('btnGaleriaNext');
  const galeriaModal = document.getElementById('galeriaModal');
  const modalImg = document.getElementById('modalGaleriaImg');
  
  // ============================================================
  // 1. GENERAR LAS 33 IMÁGENES AUTOMÁTICAMENTE
  // ============================================================
  if (contenedorReal) {
    let htmlContenido = '';
    for (let i = 1; i <= 26; i++) {
      htmlContenido += `
        <div class="galeria-tira__item" data-bs-toggle="modal" data-bs-target="#galeriaModal">
          <img src="./assets/img/galeria-${i}.webp" alt="Quines Biker en Acción - Foto ${i}" class="galeria-tira__img">
          <div class="galeria-tira__overlay">
            <i class="bi bi-zoom-in galeria-tira__icon"></i>
          </div>
        </div>
      `;
    }
    contenedorReal.innerHTML = htmlContenido;
  }

  // ============================================================
  // 2. LÓGICA DE LAS FLECHAS DE NAVEGACIÓN (PC)
  // ============================================================
  if (btnPrev && btnNext && contenedorReal) {
    const calcularDesplazamiento = () => contenedorReal.clientWidth / 1.5;

    btnNext.addEventListener('click', () => {
      contenedorReal.scrollBy({ left: calcularDesplazamiento(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      contenedorReal.scrollBy({ left: -calcularDesplazamiento(), behavior: 'smooth' });
    });
  }

  // ============================================================
  // 3. LÓGICA DINÁMICA DEL MODAL (VERSIÓN SEGURA COMPATIBLE)
  // ============================================================
  if (galeriaModal && modalImg) {
    galeriaModal.addEventListener('show.bs.modal', (event) => {
      const tarjetaClickada = event.relatedTarget;
      
      // Intentamos buscar primero si es una foto de la galería
      let imagenInterna = tarjetaClickada.querySelector('.galeria-tira__img');
      
      // Si no la encuentra, buscamos la imagen dentro del certificado del coach
      if (!imagenInterna) {
        imagenInterna = tarjetaClickada.querySelector('img');
      }
      
      if (imagenInterna) {
        // Copia la ruta exacta de la imagen para agrandarla en el modal
        modalImg.src = imagenInterna.src;
        modalImg.alt = imagenInterna.alt;
      }
    });
  }

  // ============================================================
  // 4. CONTROL DEL SCROLL DE LA NAVBAR (Evita parpadeos)
  // ============================================================
  const navbar = document.querySelector('.navbar-quines');
  
  if (navbar) {
    const controlarNavbar = () => {
      if (window.scrollY > 50) {
        if (!navbar.classList.contains('scrolled')) {
          navbar.classList.add('scrolled');
        }
      } else {
        if (navbar.classList.contains('scrolled')) {
          navbar.classList.remove('scrolled');
        }
      }
    };

    // Ejecuta al mover el scroll
    window.addEventListener('scroll', controlarNavbar);
    // Ejecuta una vez al cargar por si el usuario actualizó la página abajo
    controlarNavbar();
  }

  // ============================================================
  // 5. CERRAR MENÚ HAMBURGUESA AL TOCAR AFUERA (Mobile)
  // ============================================================
  const navbarCollapse = document.getElementById('navMenu');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapse && navbarToggler) {
    document.addEventListener('click', (event) => {
      // Verificamos si el menú móvil está desplegado
      const menuEstaAbierto = navbarCollapse.classList.contains('show');
      
      // Verificamos si el click fue fuera del botón hamburguesa y del menú desplegable
      const clickAdentroDelMenu = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

      if (menuEstaAbierto && !clickAdentroDelMenu) {
        // Si Bootstrap está cargado de forma global, usamos su método nativo para cerrarlo sin romper nada
        if (window.bootstrap && window.bootstrap.Collapse) {
          const instance = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
          instance.hide();
        } else {
          // Si no, un click virtual en el botón de la hamburguesa lo cierra al instante
          navbarToggler.click();
        }
      }
    });
  }

  // ============================================================
  // 6. NAVEGACIÓN INTELIGENTE DE PESTAÑAS (NUEVO)
  // ============================================================
  const tabLinks = document.querySelectorAll('.nav-tab-link');

  tabLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Capturamos el ID de la pestaña que queremos prender
      const tabId = this.getAttribute('data-to-tab');
      const targetTabButton = document.getElementById(tabId);

      // Si el botón de la pestaña existe, lo activamos usando la API de Bootstrap
      if (targetTabButton) {
        const tabInstance = window.bootstrap 
          ? (window.bootstrap.Tab.getInstance(targetTabButton) || new window.bootstrap.Tab(targetTabButton))
          : new bootstrap.Tab(targetTabButton);
          
        tabInstance.show();
      }
    });
  });

  // ============================================================
  // 7. MENSAJES DIRECTOS A WHATSAPP DESDE LOS ATLETAS (NUEVO)
  // ============================================================
  const WHATSAPP_NUMBER = "2664818711"; // Número oficial de Quines Biker
  const botonesWhatsappCoach = document.querySelectorAll('.btn-whatsapp-coach');

  botonesWhatsappCoach.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const nombreCoach = e.currentTarget.getAttribute('data-coach');
      const mensaje = `Hola! Quiero contactarme con el profesional: ${nombreCoach}.`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
      
      window.open(urlWhatsapp, '_blank');
    });
  });

}); // Aquí termina el DOMContentLoaded general