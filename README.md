# ACMA — Portfolio Frontend SPA

> **⚠️ NOTA IMPORTANTE / IMPORTANT NOTICE**  
> 
> **🎉 Este proyecto ha evolucionado a Vue 3 / This project has evolved to Vue 3**  
> 
> La nueva versión con Vue 3, Vite, Pinia y Vue Router está disponible en:  
> The new version with Vue 3, Vite, Pinia and Vue Router is available at:  
> 
> **→ [acma-portfolio-vue](https://github.com/bichota-tech/acma-portfolio-vue)**  
> 
> Este repositorio se mantiene como referencia de la implementación original en JavaScript vanilla.  
> This repository is maintained as a reference of the original vanilla JavaScript implementation.

---

## 📖 Sobre esta versión / About this version

**Portfolio web profesional construido como Single Page Application (SPA) sin frameworks.**  
El objetivo es demostrar fundamentos sólidos de frontend: **arquitectura clara, accesibilidad, rendimiento y SEO técnico**, usando únicamente JavaScript vanilla.

**Professional web portfolio built as a Single Page Application (SPA) without frameworks.**  
The goal is to showcase solid frontend fundamentals: **clear architecture, accessibility, performance, and technical SEO**, using only vanilla JavaScript.

**Demo:** https://portfolio-blue-iota-62.vercel.app/

---

## 🎯 Propósito / Purpose (aprendizaje / learning)
Este proyecto nace como una **plataforma personal de práctica y demostración**. Me permite:

- Consolidar fundamentos con **JavaScript vanilla** y **History API**
- Aplicar principios reales de **accesibilidad (WCAG 2.1 AA)**
- Optimizar **rendimiento, estructura y SEO**
- Documentar mejoras futuras como parte de un aprendizaje continuo

This project was created as a **personal practice and showcase platform**. It allows me to:

- Strengthen fundamentals with **vanilla JavaScript** and the **History API**
- Apply real **accessibility (WCAG 2.1 AA)** principles
- Optimize **performance, structure, and SEO**
- Document future improvements as part of continuous learning

---

## 🧩 Tecnologías / Tech stack
- **HTML5** — Semántica, accesibilidad y SEO / Semantics, accessibility, and SEO  
- **CSS3** — Responsive, variables, dark/light mode  
- **JavaScript ES6+** — Navegación SPA, eventos, estado / SPA navigation, events, state  
- **Vercel** — Deploy y rewrites / deployment and rewrites  

---

## 🏗️ Estructura / Structure
```
acma/
├── index.html
├── css/
├── javascripts/
├── assets/
│   └── data/
├── vercel.json
└── README.md
```
---

## 🧩 Arquitectura SPA (Single Page Application)

### Navegación y enrutamiento
Este portfolio funciona como una **SPA pura** sin frameworks. La navegación entre secciones se gestiona mediante:

- **History API** (`pushState` / `popstate`) para actualizar la URL sin recargar la página
- **Hash navigation** (`#inicio`, `#proyectos`, etc.) para anclar secciones
- **JavaScript vanilla** para gestionar el estado activo y las transiciones

#### Flujo de navegación
```
Usuario click en link → 
  ├─ app.js captura el evento
  ├─ Actualiza URL con pushState()
  ├─ Oculta sección actual (inert + hidden)
  ├─ Muestra nueva sección (remove inert)
  └─ Actualiza estado del menú activo
```

### Módulos JavaScript

| Archivo | Responsabilidad |
|---------|----------------|
| `app.js` | **Coordinador principal**: navegación SPA, gestión de secciones, listeners de enlaces y botones |
| `carousel.js` | Lógica del carrusel 3D de proyectos: rotación, indicadores, modal de detalles |
| `spotlight.js` | Sistema de tabs para la sección Skills: carga dinámica de contenido según tecnología |
| `darkmode.js` | Toggle entre tema claro/oscuro con persistencia en `localStorage` |
| `effects.js` | Inicialización de animaciones externas: Typed.js (efecto tipeado) y Particles.js (fondo animado) |

### Secciones principales

```
index.html
├── #inicio (Hero)
│   └── Video animado + CTAs
├── #proyectos (Proyectos)
│   └── Carrusel 3D con demos en video
├── #skills (Habilidades)
│   └── Sistema de tabs interactivo
├── #sobre-mi (About)
│   └── Identidad y descripción personal
└── #contacto (Contacto)
    └── Card con links sociales
```

### Gestión de estado

- **Sección activa**: gestionada con clases CSS `.active` y atributo `inert`
- **Tema (dark/light)**: almacenado en `localStorage` como `theme`
- **Navegación**: sincronizada entre URL, hash y scroll
- **Accesibilidad**: gestión de `aria-*` y focus trap en modales

### SEO y accesibilidad en SPA

#### SEO técnico
- Metadata dinámica en `<head>`
- Schema.org markup (VideoObject para proyectos)
- Sitemap estático (`sitemap.xml`)
- Robots.txt configurado

#### Accesibilidad
- Navegación por teclado en carrusel y tabs
- Atributo `inert` para ocultar secciones inactivas
- Roles ARIA (`role="navigation"`, `role="tablist"`)
- Focus management en modales

---

## 🧠 Aprendizajes clave / Key learnings
- Implementación de **SPA sin frameworks** / SPA without frameworks
- Uso correcto de la **History API**
- Accesibilidad aplicada (aria, focus, teclado) / applied accessibility
- SEO técnico en una SPA / technical SEO in SPA
- Optimización básica para **Core Web Vitals**

---

## ⚠️ Limitaciones actuales / Current limitations
- Sin backend (100% frontend estático) / no backend
- Sin tests automatizados / no automated tests
- Formularios sin integración real / forms without real integration

---

## 🔮 Evolución del proyecto / Project evolution

### ✅ Completado / Completed
Este proyecto alcanzó sus objetivos de aprendizaje con JavaScript vanilla y ahora ha evolucionado a:

This project achieved its learning objectives with vanilla JavaScript and has now evolved to:

**→ [acma-portfolio-vue](https://github.com/bichota-tech/acma-portfolio-vue)** — Versión Vue 3 con:
- Vue 3 + Composition API
- Vite (build tool moderno)
- Vue Router (enrutamiento)
- Pinia (gestión de estado)
- Testing con Vitest
- Linting moderno (ESLint + Oxlint)

---

## 🚀 Uso local / Local usage
```bash
git clone https://github.com/bichota-tech/acma.git
cd acma
# Abrir index.html o usar un servidor local
```

---

## 👤 Autor / Author
Adalid Martínez Álvarez  
GitHub: https://github.com/bichota-tech  
LinkedIn: https://www.linkedin.com/in/acma-48755b34b/

---

## 📄 Licencia / License
Este proyecto se publica con fines demostrativos.  
This project is published for demonstration purposes.
