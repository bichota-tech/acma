/**
 * APLICACIÓN PRINCIPAL - ACMA PORTFOLIO
 * Gestiona la navegación SPA y el menú hamburguesa
 * Autor: ACMA
 * Versión: 2.0
 */

const PAGE_TITLES = {
  inicio: 'ACMA Portfolio | Desarrolladora Web Frontend',
  proyectos: 'Proyectos Frontend en JavaScript | ACMA Portfolio',
  skills: 'Habilidades Técnicas Frontend | ACMA Portfolio',
  'sobre-mi': 'Sobre mí | ACMA – Desarrolladora Web Frontend',
  contacto: 'Contacto Profesional | ACMA Portfolio'
};
class ACMAPortfolio {
  constructor() {
    this.links = document.querySelectorAll('.nav-menu a');
    this.sections = document.querySelectorAll('.section');
    this.hamburguer = document.getElementById('hamburguer');
    this.navMenu = document.getElementById('nav-menu');
    this.aboutAnimated = false;

    this.init();
  }

  /**
   * Inicializa los event listeners
   */
  init() {
    this.attachNavListeners();
    this.attachHamburguerListener();
    this.attachLogoListeners();
    this.attachHeroButtonListener();
    this.attachCVListeners();
  }

  /**
   * Añade funcionalidad a los enlaces dentro del div.logo
   */
  attachLogoListeners() {
    const logoLinks = document.querySelectorAll('.logo a');
    if (!logoLinks || logoLinks.length === 0) return;

    logoLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Mantener comportamiento SPA: navegar a la sección "inicio"
        e.preventDefault();
        this.navigateTo('inicio');
        this.closeMenu();
      });
    });
  }

  /**
   * Botón "Ver Proyectos" en la sección hero
   */
  attachHeroButtonListener() {
    const heroBtns = document.querySelectorAll('.neon-button[data-section]');
    if (!heroBtns.length) return;

    heroBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-section');
        if (!target) return;

        this.navigateTo(target);
        this.closeMenu();
      });
    });
  }


  /**
   * Mejora la experiencia al descargar el CV desde el nav
   */
  attachCVListeners() {
    const cvLink = document.querySelector('.nav-menu .btn-cv');
    if (!cvLink) return;

    cvLink.addEventListener('click', (e) => {
      // No prevenir el comportamiento por defecto: permitimos la descarga nativa
      // Cerrar el menú (comportamiento SPA)
      this.closeMenu();

      // Evitar múltiples clicks rápidos mientras se muestra el estado
      if (cvLink.dataset.downloading === 'true') return;
      cvLink.dataset.downloading = 'true';

      // Buscar un elemento <span> para el texto; si no existe, crear uno y extraer el texto existente
      let textSpan = cvLink.querySelector('span');
      const icon = cvLink.querySelector('i');

      if (!textSpan) {
        textSpan = document.createElement('span');
        // Mover el texto visible (nodos de texto) dentro del nuevo span
        const childNodes = Array.from(cvLink.childNodes);
        childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const t = node.textContent.trim();
            if (t) {
              textSpan.textContent = t;
              node.textContent = '';
            }
          }
        });
        // Si aún no hay texto, establecer un fallback
        if (!textSpan.textContent) textSpan.textContent = 'Descargar CV';
        cvLink.appendChild(textSpan);
      }

      const originalText = textSpan.textContent;
      // Mostrar texto de estado
      textSpan.textContent = 'Descargando...';

      // Añadir clase de animación al icono si existe
      if (icon) icon.classList.add('rotating');

      // Anuncio accesible para lectores de pantalla
      const label = cvLink.getAttribute('aria-label') || 'Descarga de CV iniciada';
      this.announce(label + '.');

      // Restaurar estado después de un tiempo prudente (2s)
      setTimeout(() => {
        textSpan.textContent = originalText;
        if (icon) icon.classList.remove('rotating');
        delete cvLink.dataset.downloading;
      }, 2000);
    });
  }

  /**
   * Crea un anuncio temporal accesible usando aria-live
   */
  announce(message) {
    try {
      let live = document.getElementById('acma-aria-live');
      if (!live) {
        live = document.createElement('div');
        live.id = 'acma-aria-live';
        live.setAttribute('aria-atomic', 'true');
        live.setAttribute('aria-live', 'polite');
        live.style.position = 'absolute';
        live.style.width = '1px';
        live.style.height = '1px';
        live.style.margin = '-1px';
        live.style.border = '0';
        live.style.padding = '0';
        live.style.overflow = 'hidden';
        live.style.clip = 'rect(0 0 0 0)';
        document.body.appendChild(live);
      }
      live.textContent = message;
      // Limpiar mensaje después de 3s
      setTimeout(() => {
        if (live) live.textContent = '';
      }, 3000);
    } catch (err) {
      // Silencioso si algo falla
      // console.warn('announce failed', err);
    }
  }

  /**
   * Gestiona los clicks en enlaces de navegación
   */
  attachNavListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Solo manejar como navegación SPA los enlaces que declaran `data-section`.
        // Para el resto (descargas, enlaces externos) permitir el comportamiento nativo.
        const target = link.getAttribute('data-section');
        if (target) {
          e.preventDefault();
          this.navigateTo(target);
          this.closeMenu();
        } else {
          // Cerrar el menú para mejorar la UX en móviles, pero no prevenir la acción nativa
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
   **/
  navigateTo(target) {

    // Actualizar title para SEO y UX
    const newTitle = PAGE_TITLES[target];
    if (newTitle) {
      document.title = newTitle;
    }

    const newPath = `/${target}`;
    if (location.pathname !== newPath) {
      history.pushState({ section: target }, '', newPath);
    }
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

      if (isActive) {
        section.removeAttribute('inert');
        section.setAttribute('aria-hidden', 'false');
        video = section.querySelector('video');
        if (video) {
          video.play().catch(() => {
            // Silenciar errores de reproducción automática
          });
        }

        // Focus controlado en el primer heading
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
          // Asegura que el heading pueda recibir foco
          heading.setAttribute('tabindex', '-1');
          setTimeout(() => heading.focus(), 50);
        }
        if (target === 'sobre-mi' && !this.aboutAnimated) {
          const aboutSection = document.getElementById('sobre-mi');
          aboutSection.classList.add('is-animated');
          this.aboutAnimated = true;
        }

        if (section === 'skills') {
          import('./spotlight.js');
        }

      } else {
        section.setAttribute('inert', '');
        section.setAttribute('aria-hidden', 'true');
      }
    });
    // Mostrar u ocultar el footer según la sección
    toggleFooter(target);
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

// Footer solo en contacto
function toggleFooter(sectionId) {
  const footer = document.getElementById('footer-global');
  footer.hidden = sectionId !== 'contacto';
}


// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ACMAPortfolio();
});

// Manejar navegación con el botón atrás/adelante del navegador
window.addEventListener('popstate', (e) => {
  const section = e.state?.section || 'inicio';
  const app = new ACMAPortfolio();
  app.navigateTo(section);
});
