document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedorGaleria');
  const btnPrev = document.getElementById('btnGaleriaPrev');
  const btnNext = document.getElementById('btnGaleriaNext');
  const galeriaModal = document.getElementById('galeriaModal');
  const modalImg = document.getElementById('modalGaleriaImg');
  
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

  // 2. Lógica de las flechas de navegación (PC)
  if (btnPrev && btnNext && contenedor) {
    const calcularDesplazamiento = () => contenedor.clientWidth / 1.5;

    btnNext.addEventListener('click', () => {
      contenedor.scrollBy({ left: calcularDesplazamiento(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      contenedor.scrollBy({ left: -calcularDesplazamiento(), behavior: 'smooth' });
    });
  }

  // 3. Lógica dinámica del Modal
  if (galeriaModal && modalImg) {
    galeriaModal.addEventListener('show.bs.modal', (event) => {
      const tarjetaClickada = event.relatedTarget;
      const srcImg = tarjetaClickada.querySelector('.galeria-tira__img').getAttribute('src');
      const altImg = tarjetaClickada.querySelector('.galeria-tira__img').getAttribute('alt');
      
      modalImg.setAttribute('src', srcImg);
      modalImg.setAttribute('alt', altImg);
    });
  }
});