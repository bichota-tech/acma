
const skillsSection = document.getElementById('skills');
const buttons = document.querySelectorAll('.skill-btn');
const card = document.querySelector('.skill-card');
let skillsData = {};
let currentSkill = null; //hasta cargar el json

async function loadSkillsData() {
    try {
        const res = await fetch('assets/data/skills.json');
        skillsData = await res.json();
        console.log('✓ Skills data cargado');
    } catch (err) {
        console.error('Error cargando skills.json', err);
    }
}


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
document.addEventListener('DOMContentLoaded', async () => {
    await loadSkillsData();

    const firstSkillKey = Object.keys(skillsData)[0];
    if (!firstSkillKey) return;

    currentSkill = firstSkillKey;

    // Marcar botón activo inicial
    buttons.forEach(btn => {
        const isActive = btn.dataset.skill === firstSkillKey;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });

    updateSpotlight(firstSkillKey);
});
