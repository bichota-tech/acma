const PAGE_TITLES = {
  inicio: 'ACMA Portfolio | Desarrolladora Web Frontend',
  proyectos: 'Proyectos Frontend en JavaScript | ACMA Portfolio',
  skills: 'Habilidades Técnicas Frontend | ACMA Portfolio',
  'sobre-mi': 'Sobre mí | ACMA – Desarrolladora Web Frontend',
  contacto: 'Contacto Profesional | ACMA Portfolio'
};

class ACMAPortfolio {
  constructor() {
    this.links = document.querySelectorAll('.nav-menu a[data-section]');
    this.sections = document.querySelectorAll('.section');
    this.hamburguer = document.getElementById('hamburguer');
    this.navMenu = document.getElementById('nav-menu');
    this.aboutAnimated = false;

    this.init();
  }

  init() {
    this.attachNavListeners();
    this.attachHamburguerListener();
    this.attachHeroButtons();
  }

  attachNavListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        this.navigateTo(link.dataset.section);
        this.closeMenu();
      });
    });
  }

  attachHeroButtons() {
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateTo(btn.dataset.section);
      });
    });
  }

  attachHamburguerListener() {
    this.hamburguer.addEventListener('click', () => {
      const open = this.navMenu.classList.toggle('show');
      this.hamburguer.classList.toggle('active', open);
      this.hamburguer.setAttribute('aria-expanded', open);
    });
  }

  navigateTo(target, push = true) {
    if (!target) return;

    if (push) {
      history.pushState({ section: target }, '', `/${target}`);
    }

    document.title = PAGE_TITLES[target] || document.title;

    this.links.forEach(link =>
      link.classList.toggle('active', link.dataset.section === target)
    );

    this.sections.forEach(section => {
      const active = section.id === target;
      section.classList.toggle('active', active);
      section.toggleAttribute('inert', !active);
      section.setAttribute('aria-hidden', !active);
    });

    toggleFooter(target);
  }

  closeMenu() {
    this.navMenu.classList.remove('show');
    this.hamburguer.classList.remove('active');
    this.hamburguer.setAttribute('aria-expanded', 'false');
  }
}

function toggleFooter(sectionId) {
  const footer = document.getElementById('footer-global');
  footer.hidden = sectionId !== 'contacto';
}

const app = new ACMAPortfolio();

window.addEventListener('popstate', e => {
  const section = e.state?.section || 'inicio';
  app.navigateTo(section, false);
  app.closeMenu();
});

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.replace('/', '') || 'inicio';

  if (PAGE_TITLES[path]) {
    app.navigateTo(path, false);
  }
});