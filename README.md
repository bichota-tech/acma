# ACMA Portfolio - Documentación Técnica

##  Descripción del Proyecto

**ACMA Portfolio** es un sitio web de portafolio profesional moderna, completamente responsivo y accesible, desarrollado con HTML5, CSS3, SCSS y JavaScript vanilla.

**Versión:** 2.0 (Refactorizado y Optimizado)  
**Autor:** Adalid Martínez Álvarez  
**Licencia:** MIT

---

##  Arquitectura del Proyecto

### Estructura de Carpetas

```
acma/
 index.html                 # Página principal HTML
 app.js                     # Controlador de navegación SPA
 carousel.js                # Controlador del carrusel vanilla
 effects.js                 # Efectos: Typed.js y Particles.js
 css/
    style.css              # CSS consolidado y optimizado
 scss/                      # Fuente SCSS modular
    style.scss             # Archivo principal (importa módulos)
    config/
       variables.scss     # Variables globales (colores, espaciado, etc.)
       breakpoints.scss   # Breakpoints responsivos
    mixins/
       responsive.scss    # Media queries
       transitions.scss   # Animaciones y transiciones
       gradients.scss     # Utilidades de gradientes
    base/
       reset.scss         # Reset y estilos base
       typography.scss    # Tipografía
    components/
       buttons.scss       # Componentes botones
       cards.scss         # Componentes tarjetas
       carousel.scss      # Carrusel personalizado
    layouts/
       header.scss        # Navegación y header
       hero.scss          # Sección hero
       projects.scss      # Sección proyectos
       contact.scss       # Sección contacto
       footer.scss        # Footer
    utilities/
        animations.scss    # Keyframes
        theme.scss         # Utilidades y temas
 imagenes/
    acmalogo.png
    cartoon.svg
    bootstrap.svg
    ... (resto de imágenes)
 README.md
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

```scss
// Mobile-first approach
$breakpoint-xs: 320px;    // Móvil pequeño
$breakpoint-sm: 576px;    // Móvil
$breakpoint-md: 768px;    // Tablet
$breakpoint-lg: 992px;    // Laptop
$breakpoint-xl: 1200px;   // Desktop
$breakpoint-2xl: 1400px;  // Desktop grande
```

---

##  Tecnologías Utilizadas

### Frontend
- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS, flexbox, grid
- **SCSS** - Arquitectura modular
- **JavaScript ES6+** - Vanilla JS (sin dependencias)
- **Typed.js** - Efecto de texto tipeado
- **Particles.js** - Efecto de partículas animadas
- **Bootstrap Icons** - Iconografía

### Características Implementadas
 **SPA Navigation** - Navegación sin recargas  
 **Responsive Design** - Mobile-first  
 **Accesibilidad (WCAG 2.1 AA)** - ARIA labels, roles semánticos  
 **Performance** - Lazy loading, CSS optimizado  
 **Carrusel Vanilla** - Sin dependencias, autoplay, swipe  
 **Efectos Visuales** - Animaciones smooth, gradientes  
 **SEO Friendly** - Meta tags, estructura semántica

---

##  Componentes Principales

### 1. **Navegación (Header)**
- Menú hamburguesa responsivo
- Logo neón animado
- Navegación activa con indicador
- Cierre de menú automático

**Archivos relacionados:**
- `layouts/header.scss`
- Selector CSS: `header`, `nav`, `.nav-menu`

### 2. **Sección Hero**
- Fondo de partículas interactivas
- Texto tipeado automático
- Botón CTA animado

**Archivos relacionados:**
- `layouts/hero.scss`
- `effects.js` (Typed.js, Particles.js)

### 3. **Carrusel de Proyectos**
- Autoplay inteligente
- Navegación por swipe (móvil)
- Indicadores interactivos
- Accesible (ARIA)

**Archivos relacionados:**
- `components/carousel.scss`
- `carousel.js` (Clase CarouselController)

### 4. **Tarjeta de Contacto**
- Animación de redes sociales
- Efecto hover suave

**Archivos relacionados:**
- `layouts/contact.scss`

---

##  Clases JavaScript Principales

### `ACMAPortfolio`
Controlador principal de la SPA.

```javascript
// Uso
new ACMAPortfolio();

// Métodos públicos
- navigateTo(target)
- toggleMenu()
- closeMenu()
```

### `CarouselController`
Controlador del carrusel vanilla.

```javascript
// Uso
const carousel = new CarouselController('mycarousel');

// Métodos públicos
- goToSlide(index)
- next()
- prev()
- pauseAutoplay()
- resumeAutoplay()
```

### `PortfolioEffects`
Gestiona efectos visuales.

```javascript
// Uso
new PortfolioEffects();

// Contiene
- Typed.js (efecto tipeado)
- Particles.js (partículas)
```

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

##  Cómo Compilar SCSS a CSS

### Opción 1: Live Sass Compiler (VS Code)
1. Instala la extensión "Live Sass Compiler"
2. En VS Code: Botón derecho  "Watch Sass"
3. Los archivos SCSS se compilarán automáticamente

### Opción 2: Línea de Comandos (Node-SASS)
```bash
npm install -g sass

# Compilar un archivo
sass scss/style.scss css/style.css

# Modo watch
sass --watch scss:css
```

### Opción 3: CLI nativa de Sass
```bash
# Instalar Sass
npm install sass --save-dev

# Compilar
npx sass scss/style.scss css/style.css
```

---

##  Variables SCSS Disponibles

### Colores
```scss
$color-light: #ebe7d9;
$color-dark: #1e1f22;
$color-primary: #f55139;
$color-primary-bright: #fd0800;
$color-secondary: #3AB7BF;
```

### Espaciado
```scss
$spacing-xs: 0.25rem;    // 4px
$spacing-sm: 0.5rem;     // 8px
$spacing-md: 1rem;       // 16px
$spacing-lg: 1.5rem;     // 24px
$spacing-xl: 2rem;       // 32px
```

### Tipografía
```scss
$font-weight-bold: 700;
$font-size-base: 1rem;
$font-size-xl: 1.25rem;
```

---

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

### CSS vs SCSS
- **CSS compilado**: `css/style.css` (archivo de producción)
- **Fuente SCSS**: `scss/` (para desarrollo)
- Compilar SCSS después de cambios
- No editar `css/style.css` directamente

### Git Ignore
Considera ignorar:
```
/node_modules/
.env
.DS_Store
*.scss.map
```

### Próximas Mejoras
- [ ] Modo oscuro/claro con toggle
- [ ] Animaciones más fluidas
- [ ] Página de servicios completada
- [ ] Página de sobre mí completada
- [ ] Formulario de contacto funcional
- [ ] Integración con CMS

---

##  Contacto

**Adalid Martínez Álvarez**  
 [GitHub](https://github.com/bichota-tech)  
 [LinkedIn](https://www.linkedin.com)  
 contacto@example.com  

---

##  Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE para más detalles.

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0
