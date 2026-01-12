const skillsData = {
    html: {
        level: 3,
        label: 'Intermedio',
        use: 'Estructura semántica, SEO básico y accesibilidad en este portfolio.',
        icon: 'bi bi-filetype-html'
    },
    css: {
        level: 3,
        label: 'Intermedio',
        use: 'Layout responsive con Flexbox, Grid y animaciones.',
        icon: 'bi bi-filetype-css'
    },
    js: {
        level: 2,
        label: 'En progreso',
        use: 'Gestión de estados UI y navegación SPA.',
        icon: 'bi bi-filetype-js'
    },
    git: {
        level: 2,
        label: 'En progreso',
        use: 'Control de versiones y repositorios en GitHub.',
        icon: 'bi bi-git'
    },
    github: {
        level: 2,
        label: 'En progreso',
        use: 'Gestión de proyectos pequeños-medianos mediante GitHub.',
        icon: 'bi bi-github'
    },
    frameworks: {
        level: 2,
        label: 'En progreso',
        use: 'Uso de librerías como React y Bootstrap para acelerar el desarrollo.',
        icon: 'bi bi-bricks'
    },
    ia: {
        level: 2,
        label: 'En progreso',
        use: 'Generación de contenido y optimización de procesos creativos.',
        icon: 'bi bi-openai'
    },
    uiux: {
        level: 2,
        label: 'En progreso',
        use: 'Diseño de interfaces y prototipos para proyectos web usando Figma y Canva.',
        icon: 'bi bi-brush'
    },
    WordPress: {
        level: 2,
        label: 'En progreso',
        use: 'Creación, maquetado y gestión de sitios web dinámicos.',
        icon: 'bi bi-wordpress'
    }
};

const skillsSection = document.getElementById('skills');
const buttons = document.querySelectorAll('.skill-btn');
const card = document.querySelector('.skill-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });
    lightningZigToCard(btn);
  });

  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      buttons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });
      lightningZigToCard(btn);
    }
  });
});



function updateSpotlight(skillKey) {
    const skill = skillsData[skillKey];

    //Activar clase de animación
    card.classList.add('is-animating');

    //Esperar que la animación de salida se aplique
    setTimeout(() => {
        // Actualizar contenido
        card.querySelector('.skill-icon i').className = skill.icon;
        card.querySelector('.skill-use').textContent = skill.use;

        const pips = card.querySelectorAll('.pip');
        pips.forEach((pip, i) => {
            pip.classList.toggle('active', i < skill.level);
        });

        card.querySelector('.level-text').textContent = skill.label;

        //Quitar clase de animación para la reentrada
        requestAnimationFrame(() => {
            card.classList.remove('is-animating');
        });
    }, 180); // coincide con el transition CSS
}

skillsSection.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.stopPropagation();
  }
});