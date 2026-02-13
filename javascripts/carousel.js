/*========================
 * CAROUSEL 3D CONTROLLER
 * ========================
 * Gestiona el carrusel 3D con loop infinito
 * pausa automática, eventos táctiles
 * modal informativo
 * teclado y sincronización de indicadores.
*/

let projectsData = {};

async function loadProjectsData() {
  try {
    const res = await fetch('assets/data/projects.json');
    projectsData = await res.json();
    console.log('✓ Projects data cargado');
  } catch (err) {
    console.error('Error cargando projects.json', err);
  }
}

/* =====================
*   LÓGICA DE MODAL
*  ======================*/

const modal = document.getElementById('project-modal');
const overlay = modal.querySelector('.project-modal-overlay');
const closeBtn = modal.querySelector('.project-modal-close');

const titleEl = document.getElementById('project-modal-title');
const descEl = document.getElementById('project-modal-description');
const techEl = document.getElementById('project-modal-tech');
const linkEl = document.getElementById('project-modal-link');

function openProjectModal(key) {
  const data = projectsData[key];
  if (!data) return;

  pauseCarouselForModal();

  titleEl.textContent = data.title;
  descEl.textContent = data.description;
  linkEl.href = data.url;

  techEl.innerHTML = '';
  data.technologies.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    techEl.appendChild(li);
  });

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.add('closing');

  setTimeout(() => {
    modal.classList.remove('closing');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    resumeCarouselAfterModal();
  }, 300); // debe coincidir con la animación CSS
}


overlay.addEventListener('click', closeProjectModal);
closeBtn.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeProjectModal();
  }
});

// Constantes de configuración
const CAROUSEL_SELECTOR = '#carousel';
const INDICATORS_SELECTOR = '#indicators';
const CARD_SELECTOR = '.cardfame';
const AUTOPLAY_DURATION = 8000; // 8 segundos antes de avanzar
const PAUSE_ON_HOVER_DELAY = 2000; // 2 segundos para reactivar tras hover
const SWIPE_THRESHOLD = 50; // Píxeles mínimos para detectar swipe
const TRANSITION_DURATION = 800; // 0.8s (coincide con CSS)

// Estados del carrusel
let currentIndex = 0;
let totalCards = 0;
let isPaused = false;
let isTransitioning = false;
let autoplayTimer = null;
let hoverTimer = null;
let touchStartX = 0;

// Referencias a elementos del DOM
let carouselElement = null;
let indicatorsContainer = null;
let cards = null;

// ================
// INICIALIZACIÓN
// ================

async function initCarousel() {

  carouselElement = document.querySelector(CAROUSEL_SELECTOR);
  indicatorsContainer = document.querySelector(INDICATORS_SELECTOR);
  cards = document.querySelectorAll(CARD_SELECTOR);

  await loadProjectsData();
  
  // Validación de elemntos vacios
  if (!carouselElement || !cards.length) {
    console.error('Error: No se encontró el carousel o las cards');
    return;
  }
  
  totalCards = cards.length;
  
  // Crear indicadores dinámicamente
  createIndicators();
  
  // Establecer estado inicial
  updateCarousel(0);
  
  // Configurar event listeners
  setupEventListeners();
  
  // Iniciar autoplay
  startAutoplay();
  
  console.log(`✓ Carousel inicializado con ${totalCards} cards`);
}

/* Crea los indicadores dinámicamente en el contenedor #indicators */
function createIndicators() {
  if (!indicatorsContainer) return;
  
  // Limpiar indicadores previos (si existen)
  indicatorsContainer.innerHTML = '';
  
  // Crear un indicador por cada card
  for (let i = 0; i < totalCards; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    
    // Marcar el primer indicador como activo
    if (i === 0) {
      indicator.classList.add('indicator-active');
    }
    
    // Click en indicador navega a esa posición
    indicator.addEventListener('click', () => {
      if (!isTransitioning) {
        goToCard(i);
      }
    });
    
    indicatorsContainer.appendChild(indicator);
  }
  
  console.log(`✓ ${totalCards} indicadores creados`);
}

// ===============================
// CONTROL PRINCIPAL DEL CARRUSEL
// ===============================

/**
 * Actualiza las clases de las cards según el índice actual
 * Distribuye las clases: active, left, right, hidden
 * @param {number} index  //Índice de la card activa
 */
function updateCarousel(index) {
  // Validar índice dentro del rango
  currentIndex = (index % totalCards + totalCards) % totalCards;
  
  // Calcular índices para cada posición
  const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
  const rightIndex = (currentIndex + 1) % totalCards;
  
  // Remover todas las clases de estado
  cards.forEach(card => {
    card.classList.remove('activefame', 'leftfame', 'rightfame', 'hiddenfame');
  });
  
  // Asignar nuevas clases según posición
  cards[currentIndex].classList.add('activefame');
  cards[leftIndex].classList.add('leftfame');
  cards[rightIndex].classList.add('rightfame');
  
  // El resto quedan ocultas
  for (let i = 0; i < totalCards; i++) {
    if (i !== currentIndex && i !== leftIndex && i !== rightIndex) {
      cards[i].classList.add('hiddenfame');
    }
  }
  
  // Actualizar indicadores
  updateIndicators();
  
  // Marcar que NO estamos en transición tras actualizar
  isTransitioning = false;
}

/**
 * Actualiza el estado visual de los indicadores
 * Solo el indicador de la card activa tendrá la clase 'indicator-active'
 */
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('indicator-active');
    } else {
      indicator.classList.remove('indicator-active');
    }
  });
}

/**
 * Navega a una card específica
 * @param {number} index - Índice de la card destino
 */
function goToCard(index) {
  if (isTransitioning) return;
  
  // Marcar como en transición
  isTransitioning = true;
  
  // Actualizar carousel
  updateCarousel(index);
  
  // Resetear autoplay
  restartAutoplay();
}

/**
 * Avanza a la siguiente card
 */
function nextCard() {
  goToCard(currentIndex + 1);
}

/**
 * Retrocede a la card anterior
 */
function prevCard() {
  goToCard(currentIndex - 1);
}

// =========
// AUTOPLAY
// =========
/* Inicia el autoplay automático que avanza cada AUTOPLAY_DURATION ms */
function startAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  
  autoplayTimer = setInterval(() => {
    if (!isPaused) {
      nextCard();
    }
  }, AUTOPLAY_DURATION);
}

/* Reinicia el autoplay y Pausa (se usa durante y después de navegación manual) */
function restartAutoplay() {
  startAutoplay();
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}
/* Helpers de pausa del carrusel ante el modal*/
function pauseCarouselForModal() {
  isPaused = true;
  stopAutoplay();
}

function resumeCarouselAfterModal() {
  setTimeout(() => {
    isPaused = false;
    startAutoplay();
  }, 2000);
}

// ================
// EVENT LISTENERS
// ================

/* Configura todos los event listeners del carousel */
function setupEventListeners() {
  // Eventos de teclado
  document.addEventListener('keydown', handleKeyboardEvent);
  
  // Eventos táctiles (swipe)
  carouselElement.addEventListener('touchstart', handleTouchStart, false);
  carouselElement.addEventListener('touchend', handleTouchEnd, false);
  
  // Eventos de hover (pausa autoplay)
  carouselElement.addEventListener('mouseenter', handleMouseEnter);
  carouselElement.addEventListener('mouseleave', handleMouseLeave);
  
  // Evento click en las cards (solo la activa abre el link)
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => handleCardClick(e, index));
  });
  
  console.log('✓ Event listeners configurados');
}

/* Maneja eventos de teclado
  - Flecha derecha → siguiente card
  - Flecha izquierda → card anterior
  - Enter → abre link si la card es activa 
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleKeyboardEvent(e) {
  if (isTransitioning) return;

  // Si el modal está abierto, no navegar el carrusel
  if (!modal.classList.contains('hidden')) return;

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      nextCard();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevCard();
      break;
    case 'Enter':
      e.preventDefault();

      const activeCard = cards[currentIndex];
      if (!activeCard) return;

      const projectKey = activeCard.dataset.project;
      if (!projectKey) return;

      openProjectModal(projectKey);
      break;

      
  }
}

/**
 * Maneja el inicio del swipe (táctil)
 * Registra la posición inicial del toque
 * 
 * @param {TouchEvent} e - Evento táctil
 */
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

/**
 * Maneja el final del swipe (táctil)
 * Calcula la distancia y dirección del swipe
 * - Swipe derecha (positivo) → card anterior
 * - Swipe izquierda (negativo) → siguiente card
 * 
 * @param {TouchEvent} e - Evento táctil
 */
function handleTouchEnd(e) {
  if (isTransitioning) return;
  
  const touchEndX = e.changedTouches[0].clientX;
  const difference = touchStartX - touchEndX;
  
  // Solo actuar si el swipe supera el umbral
  if (Math.abs(difference) > SWIPE_THRESHOLD) {
    if (difference > 0) {
      // Swipe izquierda → siguiente
      nextCard();
    } else {
      // Swipe derecha → anterior
      prevCard();
    }
  }
}

/**
 * Maneja el evento mouseenter (cursor entra al carousel)
 * Pausa el autoplay
 */
function handleMouseEnter() {
  isPaused = true;
  console.log('⏸ Carousel pausado (hover)');
}

/**
 * Maneja el evento mouseleave (cursor sale del carousel)
 * Reactiva el autoplay tras una pausa
 */
function handleMouseLeave() {
  // Reactivar tras PAUSE_ON_HOVER_DELAY ms
  if (hoverTimer) clearTimeout(hoverTimer);
  
  hoverTimer = setTimeout(() => {
    isPaused = false;
    console.log('▶ Carousel reanudado (hover salió)');
  }, PAUSE_ON_HOVER_DELAY);
}

/**
 * Maneja el evento click en las cards
 * SOLO la card activa permite navegar al link externo
 * Las cards laterales y ocultas no son clicables
 * 
 * @param {MouseEvent} e - Evento de click
 * @param {number} index - Índice de la card clickeada
 */

function handleCardClick(e, index) {
  if (index !== currentIndex) {
    e.preventDefault();
    return;
  }

  const card = cards[index];
  const projectKey = card.dataset.project;
  if (!projectKey) return;

  openProjectModal(projectKey);
}


// =================================
// INICIAR CUANDO EL DOM ESTÉ LISTO
// =================================

/* Ejecuta initCarousel cuando el DOM esté completamente cargado */
if (document.readyState === 'loading') {
  // DOM aún cargando
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  // DOM ya cargado
  initCarousel();
}
