# ACMA Portfolio

> Portfolio web profesional frontend · SPA en JavaScript vanilla · Accesibilidad, rendimiento y SEO técnico como prioridad

**Autor:** Adalid Martínez Álvarez  
**Versión:** 3.0  
**Licencia:** MIT  
**Demo:** https://portfolio-blue-iota-62.vercel.app/

---

## 🎯 Descripción

**ACMA Portfolio** es un portfolio web profesional desarrollado como **Single Page Application (SPA)** sin frameworks, enfocado en demostrar competencias reales de frontend moderno: arquitectura clara, accesibilidad, rendimiento y buenas prácticas de ingeniería.

El proyecto está diseñado tanto como **herramienta de empleabilidad** como base escalable para futuras funcionalidades.

---

## 🧠 Qué demuestra este proyecto

- Arquitectura SPA sin dependencias
- Dominio de **JavaScript vanilla** y History API
- HTML5 semántico y **accesibilidad WCAG 2.1 AA**
- CSS moderno (variables, responsive, dark mode)
- Optimización de rendimiento y SEO técnico
- Despliegue profesional en Vercel

---

## 🔗 Demo

👉 **Producción:**  
https://portfolio-blue-iota-62.vercel.app/

- Hosting en **Vercel**
- Rewrites configurados para SPA
- Navegación client-side sin errores 404
- URLs limpias y compartibles

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** — Semántica, accesibilidad y SEO
- **CSS3 puro** — Responsive design, variables CSS, dark/light mode
- **JavaScript ES6+ (vanilla)** — Lógica SPA, gestión de eventos y estado

### Librerías & Servicios
- Typed.js (animación de texto)
- Particles.js (fondo animado)
- Umami Analytics (analytics sin cookies)
- Vercel Speed Insights (Core Web Vitals)

### Despliegue
- **Vercel** — Hosting y CI/CD automático
- **Git & GitHub** — Control de versiones

---

## 🏗️ Arquitectura (alto nivel)

- Aplicación **SPA** con navegación sin recarga
- Enrutamiento mediante **History API**
- Render dinámico de secciones
- Separación clara de responsabilidades:
  - `app.js` → controlador principal SPA
  - módulos JS por funcionalidad
  - datos desacoplados en JSON
- CSS centralizado y escalable sin preprocesadores

---

## ♿ Accesibilidad

Implementada siguiendo **WCAG 2.1 AA**:

- HTML semántico (`header`, `nav`, `main`, `section`, `footer`)
- Uso correcto de **ARIA roles y labels**
- Navegación completa por teclado
- Focus management y estados visibles
- Respeto a `prefers-reduced-motion`
- Contraste de color conforme a estándares

---

## ⚡ Performance

- Lighthouse scores objetivo: **95+**
- Sin frameworks → bundle mínimo
- CSS y JS optimizados
- Imágenes optimizadas y lazy loading
- Animaciones GPU-friendly (`transform`, `opacity`)

---

## 🔍 SEO Técnico

- Meta tags completos y Open Graph
- Estructura correcta de headings
- URLs semánticas compatibles con SPA
- Rewrites en Vercel para indexación correcta
- Sitemap y robots configurados
- Preparado para Schema Markup

---

## 📁 Estructura del Proyecto

acma/
├── index.html
├── css/
├── javascripts/
├── assets/
│ └── data/
├── vercel.json
└── README.md


---

## 🚀 Uso local

```bash
git clone https://github.com/bichota-tech/acma.git
cd acma

Abrir index.html directamente o usar un servidor local (Live Server recomendado).

## 🛣️ Roadmap

 - Blog con contenido en markdown

 - Internacionalización (ES / EN)

 - PWA y modo offline

 - Mejora de formulario de contacto

 - Tests automatizados básicos

## 👤 Autor

- Adalid Martínez Álvarez

- GitHub: https://github.com/bichota-tech

- LinkedIn: https://www.linkedin.com/in/acma-48755b34b/

- Email: adalvarez2021@gmail.com

## 📄 Licencia

- Este proyecto está licenciado bajo **Creative Commons Attribution-NoDerivatives 4.0 (CC BY-ND 4.0)**.

### Está permitido:
- Compartir y redistribuir el proyecto en cualquier medio o formato
- Referenciar el proyecto como muestra de trabajo

### NO está permitido:
- Modificar el código o los estilos
- Crear obras derivadas
- Usar el proyecto (total o parcialmente) como base de otros productos
- Uso comercial sin autorización expresa del autor

🔒 Este proyecto se publica únicamente con fines demostrativos.
