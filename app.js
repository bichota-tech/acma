/**
 * APLICACIÓN PRINCIPAL - ACMA PORTFOLIO
 * Gestiona la navegación SPA y el menú hamburguesa
 * Autor: ACMA
 * Versión: 2.0
 */

class ACMAPortfolio {
  constructor() {
    this.links = document.querySelectorAll('.nav-menu a');
    this.sections = document.querySelectorAll('.section');
    this.hamburguer = document.getElementById('hamburguer');
    this.navMenu = document.getElementById('nav-menu');
    
    this.init();
  }

  /**
   * Inicializa los event listeners
   */
  init() {
    this.attachNavListeners();
    this.attachHamburguerListener();
  }

  /**
   * Gestiona los clicks en enlaces de navegación
   */
  attachNavListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-section');
        
        if (target) {
          this.navigateTo(target);
          this.closeMenu();
        }
      });
    });
  }

  /**
   * Gestiona el toggle del menú hamburguesa
   */
  attachHamburguerListener() {
    this.hamburguer.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && this.navMenu.classList.contains('show')) {
        this.closeMenu();
      }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navMenu.classList.contains('show')) {
        this.closeMenu();
      }
    });
  }

  /**
   * Navega a una sección específica
   * @param {string} target - ID de la sección destino
   */
  navigateTo(target) {
    // Actualizar elementos activos
    this.links.forEach(link => {
      const isActive = link.getAttribute('data-section') === target;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Cambiar secciones visibles
    this.sections.forEach(section => {
      const isActive = section.id === target;
      section.classList.toggle('active', isActive);
      
      // Mejorar accesibilidad
      if (isActive) {
        section.setAttribute('aria-hidden', 'false');
        // Focus en el primer heading de la sección
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
          setTimeout(() => heading.focus(), 100);
        }
      } else {
        section.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Toggle del menú
   */
  toggleMenu() {
    this.navMenu.classList.toggle('show');
    this.hamburguer.classList.toggle('active');
    
    // Actualizar atributo aria-expanded
    const isOpen = this.navMenu.classList.contains('show');
    this.hamburguer.setAttribute('aria-expanded', isOpen);
  }

  /**
   * Cierra el menú hamburguesa
   */
  closeMenu() {
    this.navMenu.classList.remove('show');
    this.hamburguer.classList.remove('active');
    this.hamburguer.setAttribute('aria-expanded', 'false');
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ACMAPortfolio();
});
