# ACMA Portfolio - Documentación Técnica

##  Descripción del Proyecto

**ACMA Portfolio** es un sitio web de portafolio profesional moderna, completamente responsivo y accesible, desarrollado con HTML5, CSS3 puro y JavaScript vanilla.

**Versión:** 3.0 (CSS Puro - Sin Dependencias SASS)  
**Autor:** Adalid Martínez Álvarez  
**Licencia:** MIT

---

##  Arquitectura del Proyecto

### Estructura de Carpetas

```
acma/
 index.html                 # Página principal HTML5 semántico
 app.js                     # Controlador SPA - Navegación y menú
 carousel.js                # Controlador vanilla carousel
 effects.js                 # Efectos: Typed.js y Particles.js
 css/
    style.css              # CSS único, escalable, sin preprocesadores
 imagenes/                  # Imágenes optimizadas (PNG, SVG)
 assets/                    # Documentos (CV, cartas de recomendación)
 README.md                  # Esta documentación
```

---

##  Paleta de Colores

| Color | Hex | Variable CSS | Uso |
|-------|-----|------------|-----|
| Claro | `#ebe7d9` | `--color-fondo-claro` | Texto principal, fondos secundarios |
| Oscuro | `#1e1f22` | `--color-fondo-oscuro` | Fondo principal |
| Primario | `#f55139` | `--color-acento-primario` | Acentos, botones |
| Primario Brillo | `#fd0800` | `--color-acento-primario-brillo` | Glow, hover effects |
| Secundario | `#3AB7BF` | `--color-acento-secundario` | Acentos alternos |

---

##  Breakpoints Responsivos

```css
/* Mobile-first approach - Media queries en CSS */
@media (max-width: 576px)  { /* Móvil */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 992px)  { /* Laptop */ }
@media (max-width: 1200px) { /* Desktop */ }
@media (max-width: 1400px) { /* Desktop Grande */ }
```

---

##  Tecnologías Utilizadas

### Frontend
- **HTML5** - Semántico, accesible, ARIA completo
- **CSS3 Puro** - Variables CSS, flexbox, grid, sin preprocesadores
- **JavaScript ES6+** - Vanilla JS, clases, sin dependencias frameworks
- **Typed.js** (CDN) - Efecto de texto tipeado
- **Particles.js** (CDN) - Efecto de partículas animadas
- **Bootstrap Icons** (CDN) - Iconografía

### Características Implementadas
 **SPA Navigation** - Navegación sin recargas  
 **Responsive Design** - Mobile-first  
 **Accesibilidad (WCAG 2.1 AA)** - ARIA labels, roles semánticos  
 **Performance** - Lazy loading, CSS optimizado, sin build tools  
 **Zero Dependencies** - Sin npm, build tools, o preprocesadores
 **Carrusel Vanilla** - Sin dependencias, autoplay, swipe  
 **Efectos Visuales** - Animaciones smooth, gradientes  
 **SEO Friendly** - Meta tags, estructura semántica

---

### `ACMAPortfolio`
Controlador principal de la SPA.

### `CarouselController`
Controlador del carrusel vanilla.

### `PortfolioEffects`
Gestiona efectos visuales.

---

##  Optimizaciones Implementadas

### Performance
- **Lazy Loading**: `loading="lazy"` en todas las imágenes
- **Preconnect**: URLs externas precargadas
- **CSS Consolidado**: Un único archivo CSS compilado
- **JS Deferido**: Scripts cargados al final con `defer`
- **Transiciones GPU**: `transform` y `opacity`

### Accesibilidad
- **ARIA Labels**: Botones y enlaces descriptivos
- **Roles Semánticos**: `role="navigation"`, `role="region"`
- **Focus Management**: Navegación por teclado
- **Preferencias de Movimiento**: `prefers-reduced-motion`

### SEO
- **Meta Tags**: Descripción, palabras clave, author
- **HTML Semántico**: `<header>`, `<main>`, `<section>`, `<footer>`
- **Título Descriptivo**: ACMA Portfolio - Desarrollador Web Frontend
- **Alt Text**: Todas las imágenes con descripciones

---

##  Estructura del CSS

### Archivo Único: `css/style.css`

El proyecto utiliza un único archivo CSS puro, bien organizado y sin dependencias de preprocesadores.

**Ventajas de esta aproximación:**
- ✅ Sin herramientas de compilación (no requiere npm, webpack, etc.)
- ✅ Carga más rápida (un solo archivo HTTP)
- ✅ Fácil de debuggear (sin mapeos complejos)
- ✅ Mantenimiento directo sin intermediarios
- ✅ Compatible con todos los navegadores modernos

**Secciones principales del CSS:**
1. Variables CSS (colores, espacios, tokens de diseño)
2. Reset & Base (estilos básicos)
3. Header y Navegación
4. Secciones principales (Hero, Proyectos, etc.)
5. Componentes (Carrusel, Card, Botones)
6. Footer
7. Utilidades y temas
8. Accesibilidad y media queries

##  Eventos de JavaScript

### Navegación
- Click en enlaces de menú  Cambio de sección
- Click en hamburguesa  Toggle menú
- Tecla Escape  Cerrar menú
- Click fuera del menú  Cerrar menú

### Carrusel
- Click en indicadores  Ir a slide
- Click en flechas  Anterior/siguiente
- Swipe en móvil  Deslizar carrusel
- Teclas flecha  Navegación
- Hover  Pausar autoplay

---

##  Mejoras de Accesibilidad

 Todos los botones tienen `aria-label`  
 Enlaces con `rel="noopener noreferrer"`  
 Imágenes con `alt` descriptivo  
 Estructura de heading correcta (h1 > h2 > h3)  
 Color contrast ratio  4.5:1  
 Navegación por teclado completa  
 Respeto a preferencias de movimiento reducido  
 Roles ARIA apropiados (`navigation`, `region`, `tablist`)

---

##  Verificación de Calidad

### Validación HTML
```bash
# Usar validador oficial
https://validator.w3.org/
```

### Validación CSS
```bash
# Usar validador W3C
https://jigsaw.w3.org/css-validator/
```

### Performance
- Lighthouse: Objetivo 90+ en todas las métricas
- Page Speed Insights: Verificar Core Web Vitals

### Accesibilidad
- axe DevTools: 0 violaciones
- WAVE: 0 errores

---

##  Notas de Desarrollo

### Estructura sin Herramientas de Compilación
- **HTML**: Editar directamente `index.html`
- **CSS**: Editar directamente `css/style.css` 
- **JavaScript**: Editar archivos `.js` individuales
- **Sin NPM, webpack, o build tools** - Todo funciona en navegador

### Workflow de Cambios
1. Abre el archivo a editar en VS Code
2. Realiza cambios
3. Guarda (Ctrl+S)
4. Recarga navegador (F5)
5. ¡Listo!

### Git Ignore
Considera ignorar:
```
.DS_Store
Thumbs.db
.vscode/
node_modules/  (si añades npm en el futuro)
.env
```

### Ventajas de CSS Puro vs Preprocesadores
| Aspecto | CSS Puro | SCSS |
|--------|----------|------|
| Herramientas | Ninguna | Compilador necesario |
| Complejidad | Simple | Moderada |
| Curva aprendizaje | Baja | Media |
| Velocidad desarrollo | Rápida | Rápida (con herramientas) |
| Rendimiento | Excelente | Igual (después de compilar) |
| Debuggear | Directo | Necesita source maps |

### Próximas Mejoras
- [ ] Completar página de Servicios
- [ ] Completar página de Sobre mí
- [ ] Animaciones más fluidas
- [ ] Integración con CMS (opcional)

---

##  Contacto

**Adalid Martínez Álvarez**  
 [GitHub](https://github.com/bichota-tech)  
 [LinkedIn](https://www.linkedin.com/acma-48755b34b/)  
 adalvarez2021@gmail.com  

---

##  Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE para más detalles.

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0
