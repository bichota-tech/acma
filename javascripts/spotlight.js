const skillsData = {
    html: {
        level: 4,
        label: 'Avanzado',
        use: 'Estructuro interfaces semánticas, accesibles y orientadas a SEO. Trabajo con HTML como base de producto, no como simple mercado, garantizando compatibilidad, rendimiento y una experiencia sólida desde el primer render.',
        icon: 'bi bi-filetype-html'
    },
    css: {
        level: 4,
        label: 'Avanzado',
        use: 'Layout responsive con Flexbox, Grid y animaciones.',
        icon: 'bi bi-filetype-css'
    },
    js: {
        level: 3,
        label: 'En progreso',
        use: 'Gestión de estados UI y navegación SPA.',
        icon: 'bi bi-filetype-js'
    },
    git: {
        level: 3,
        label: 'En progreso',
        use: 'Control de versiones y repositorios en GitHub.',
        icon: 'bi bi-git'
    },
    github: {
        level: 3,
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
        level: 4,
        label: 'Avanzado',
        use: 'Generación de contenido y optimización de procesos creativos.',
        icon: 'bi bi-openai'
    },
    uiux: {
        level: 3,
        label: 'En progreso',
        use: 'Diseño de interfaces y prototipos para proyectos web usando Figma y Canva.',
        icon: 'bi bi-brush'
    },
    WordPress: {
        level: 3,
        label: 'Intermedio',
        use: 'Creación, maquetado y gestión de sitios web dinámicos.',
        icon: 'bi bi-wordpress'
    }
};

const skillsSection = document.getElementById('skills');
const buttons = document.querySelectorAll('.skill-btn');
const card = document.querySelector('.skill-card');
let currentSkill = 'html'; // skill por defecto

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const skillKey = btn.dataset.skill;
        if (skillKey !== currentSkill) {
            buttons.forEach(b => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn);
            });
            currentSkill = skillKey;
            lightningEffects(btn, skillKey);
        }
    });

    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const skillKey = btn.dataset.skill;
            if (skillKey !== currentSkill) {
                buttons.forEach(b => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-selected', b === btn);
                });
                currentSkill = skillKey;
                lightningEffects(btn, skillKey);
            }
        }
    });
});

function renderSkillCard(skill) {
    // Limpiar card
    card.innerHTML = '';

    // ICONO
    const iconWrap = document.createElement('div');
    iconWrap.className = 'skill-icon neon';

    const icon = document.createElement('i');
    icon.className = skill.icon;

    iconWrap.appendChild(icon);

    // NIVEL
    const levelWrap = document.createElement('div');
    levelWrap.className = 'skill-level';

    const pips = [];

    for (let i = 0; i < 5; i++) {
        const pip = document.createElement('span');
        pip.className = 'pip';
        levelWrap.appendChild(pip);
        pips.push(pip);
    }

    const levelText = document.createElement('span');
    levelText.className = 'level-text';
    levelText.textContent = skill.label;

    levelWrap.appendChild(levelText);

    // USO
    const use = document.createElement('p');
    use.className = 'skill-use';
    use.textContent = skill.use;

    // Montar card
    card.appendChild(iconWrap);
    card.appendChild(levelWrap);
    card.appendChild(use);

    return pips;
}


function updateSpotlight(skillKey) {
    const skill = skillsData[skillKey];

    // Animación de salida
    card.classList.add('is-animating');

    setTimeout(() => {
        // Crear estructura completa
        const pips = renderSkillCard(skill);

        // Reset y aplicar estados de pips (MISMA LÓGICA)
        pips.forEach((pip, i) => {
            pip.classList.remove('active', 'neon-progress');

            if (i < skill.level) {
                pip.classList.add('active');
            } else if (i === skill.level) {
                pip.classList.add('neon-progress');
            } else if (i === skill.level && skill.level < pips.length) {
                pip.classList.add('neon-progress');
            }
        });

        // Reentrada
        requestAnimationFrame(() => {
            card.classList.remove('is-animating');
        });

    }, 180);
}

skillsSection.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.stopPropagation();
    }
});

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const firstSkillKey = Object.keys(skillsData)[0];

    if (!firstSkillKey) return;

    updateSpotlight(firstSkillKey);
});