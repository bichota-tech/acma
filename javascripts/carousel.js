/**
 * CARRUSEL VANILLA - ACMA PORTFOLIO
 * Carrusel completamente personalizado sin dependencias
 * Características: autoplay, swipe, keyboard navigation, accesibilidad ARIA
 * Autor: ACMA
 * Versión: 2.0
 */

class CarouselController {
  constructor(containerId) {
    this.root = document.getElementById(containerId);
    if (!this.root) return;

    this.config = {
      interval: 4000, // ms entre cambios automáticos
      transitionSpeed: 600, // ms para la animación
      swipeThreshold: 40, // px mínimos para swipe
    };

    this.state = {
      currentIndex: 0,
      isAnimating: false,
      isHovering: false,
      timer: null,
    };

    this.elements = this.cacheElements();
    if (this.elements.items.length === 0) return;

    this.init();
  }

  /**
   * Cachea los elementos del DOM
   */
  cacheElements() {
    const inner = this.root.querySelector('.carousel-inner');
    if (!inner) return { items: [] };

    // Crear track si no existe
    let track = inner.querySelector('.carousel-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'carousel-track';
      const items = Array.from(inner.querySelectorAll('.carousel-item'));
      items.forEach(item => track.appendChild(item));
      inner.appendChild(track);
    }

    return {
      track,
      items: Array.from(this.root.querySelectorAll('.carousel-item')),
      indicators: Array.from(this.root.querySelectorAll('.carousel-indicators button')),
      prevBtn: this.root.querySelector('[data-action="prev"]'),
      nextBtn: this.root.querySelector('[data-action="next"]'),
      inner,
    };
  }

  /**
   * Inicializa el carrusel
   */
  init() {
    this.setInitialState();
    this.attachEventListeners();
    this.startAutoplay();
  }

  /**
   * Establece el estado inicial
   */
  setInitialState() {
    const activeItem = this.root.querySelector('.carousel-item.active');
    this.state.currentIndex = activeItem
      ? this.elements.items.indexOf(activeItem)
      : 0;
    this.updateCarousel();
  }

  /**
   * Adjunta listeners de eventos
   */
  attachEventListeners() {
    // Botones de control
    if (this.elements.prevBtn) {
      this.elements.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.elements.nextBtn) {
      this.elements.nextBtn.addEventListener('click', () => this.next());
    }

    // Indicadores
    this.elements.indicators.forEach((btn, idx) => {
      btn.addEventListener('click', () => this.goToSlide(idx));
    });

    // Autoplay - pausar en hover
    this.root.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.root.addEventListener('mouseleave', () => this.resumeAutoplay());

    // Swipe en mobile
    this.attachSwipeListeners();

    // Keyboard navigation
    this.attachKeyboardListeners();
  }

  /**
   * Gestiona el swipe/drag en móvil
   */
  attachSwipeListeners() {
    let startX = 0;
    let delta = 0;

    this.root.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.pauseAutoplay();
    }, { passive: true });

    this.root.addEventListener('touchmove', (e) => {
      if (!startX) return;
      delta = e.touches[0].clientX - startX;

      // Efecto visual de arrastre
      if (Math.abs(delta) > 6) {
        this.elements.track.style.transition = 'none';
        const percent = (-this.state.currentIndex * 100) + (delta / this.root.clientWidth) * 100;
        this.elements.track.style.transform = `translateX(${percent}%)`;
      }
    }, { passive: true });

    this.root.addEventListener('touchend', () => {
      this.elements.track.style.transition = '';

      if (Math.abs(delta) > this.config.swipeThreshold) {
        if (delta < 0) this.next();
        else this.prev();
      } else {
        this.updateCarousel();
      }

      startX = 0;
      delta = 0;
      this.resumeAutoplay();
    });
  }

  /**
   * Navegación con teclado
   */
  attachKeyboardListeners() {
    this.root.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
      }
    });
  }

  /**
   * Navega a una slide específica
   * @param {number} index - Índice de la slide
   */
  goToSlide(index) {
    if (this.state.isAnimating) return;
    
    index = (index + this.elements.items.length) % this.elements.items.length;
    this.state.currentIndex = index;
    this.updateCarousel();
    this.restartAutoplay();
  }

  /**
   * Siguiente slide
   */
  next() {
    this.goToSlide(this.state.currentIndex + 1);
  }

  /**
   * Slide anterior
   */
  prev() {
    this.goToSlide(this.state.currentIndex - 1);
  }

  /**
   * Actualiza la posición del carrusel y estados ARIA
   */
  updateCarousel() {
    const translateX = -100 * this.state.currentIndex;
    
    this.state.isAnimating = true;
    this.elements.track.style.transform = `translateX(${translateX}%)`;

    setTimeout(() => {
      this.state.isAnimating = false;
    }, this.config.transitionSpeed);

    // Actualizar items activos
    this.elements.items.forEach((item, idx) => {
      const isActive = idx === this.state.currentIndex;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-hidden', !isActive);
    });

    // Actualizar indicadores
    this.elements.indicators.forEach((btn, idx) => {
      const isActive = idx === this.state.currentIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('aria-current', isActive ? 'page' : undefined);
    });
  }

  /**
   * Inicia el autoplay
   */
  startAutoplay() {
    this.state.timer = setInterval(() => {
      if (!this.state.isHovering) {
        this.next();
      }
    }, this.config.interval);
  }

  /**
   * Pausa el autoplay
   */
  pauseAutoplay() {
    this.state.isHovering = true;
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
  }

  /**
   * Reanuda el autoplay
   */
  resumeAutoplay() {
    this.state.isHovering = false;
    this.startAutoplay();
  }

  /**
   * Reinicia el autoplay
   */
  restartAutoplay() {
    this.pauseAutoplay();
    this.resumeAutoplay();
  }

  /**
   * Destruye la instancia del carrusel
   */
  destroy() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new CarouselController('mycarousel');
  
  // Delegación de eventos para demo buttons
  document.getElementById('mycarousel')?.addEventListener('click', (e) => {
    const demoBtn = e.target.closest('.demo-btn');
    if (demoBtn) {
      const demo = demoBtn.getAttribute('data-demo');
      if (demo) {
        console.log(`Demo activo: ${demo}`);
        // Aquí puedes añadir lógica para modal o navegación
      }
    }
  });
});
