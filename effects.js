/**
 * EFECTOS Y ANIMACIONES - ACMA PORTFOLIO
 * Gestiona: efecto tipeado, partículas de fondo
 * Librerías: Typed.js, particles.js
 * Autor: ACMA
 * Versión: 2.0
 */

class PortfolioEffects {
  constructor() {
    this.typedInstance = null;
    this.particlesConfig = null;
    this.init();
  }

  /**
   * Inicializa todos los efectos
   */
  init() {
    this.initTypedEffect();
    this.initParticles();
  }

  /**
   * Inicializa el efecto de texto tipeado
   */
  initTypedEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    this.typedInstance = new Typed('#typed-text', {
      strings: [
        'Desarrollador Web Frontend Júnior.',
        'Apasionado por el diseño y la tecnología.',
        'En constante aprendizaje y crecimiento.',
      ],
      typeSpeed: 60,        // velocidad de escritura (ms/carácter)
      backSpeed: 35,        // velocidad de borrado (ms/carácter)
      backDelay: 1500,      // pausa antes de borrar (ms)
      loop: true,           // repetir infinitamente
      startDelay: 500,      // retraso inicial (ms)
      showCursor: true,     // mostrar cursor parpadeante
      cursorChar: '|',      // caracteres del cursor
      autoInsertCss: true,  // insertar CSS automáticamente
    });
  }

  /**
   * Inicializa el efecto de partículas
   */
  initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer || typeof particlesJS === 'undefined') {
      console.warn('Particles.js no está disponible o contenedor no existe');
      return;
    }

    this.particlesConfig = {
      particles: {
        number: {
          value: 70,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#fd0800'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 120,
          color: '#3AB7BF',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          onresize: {
            enable: true,
            density_auto: true,
            density_area: 800
          }
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            particles: {
              number: {
                value: 50
              }
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            particles: {
              number: {
                value: 30
              },
              line_linked: {
                distance: 100
              }
            }
          }
        }
      ]
    };

    particlesJS('particles-js', this.particlesConfig);
  }

  /**
   * Destruye las instancias de efectos
   */
  destroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioEffects();
});

// Reducir movimiento para usuarios con preferencias de movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Desactivar animaciones si es necesario
  document.documentElement.style.scrollBehavior = 'auto';
}



