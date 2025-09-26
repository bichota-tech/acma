document.addEventListener('DOMContentLoaded', () => {
    const icono = document.getElementById('iconoModo');
    icono.addEventListener('click', () => {
        document.body.classList.toggle('modo-oscuro');
        const modoOscuroActivo = document.body.classList.contains('modo-oscuro');
        if (modoOscuroActivo) {
            icono.src = 'imagenes/sol.png';
            icono.alt = 'Modo claro';
            icono.title = 'Activar modo claro';
        } else {
            icono.src = 'imagenes/luna.png';
            icono.alt = 'Modo oscuro';
            icono.title = 'Activar modo oscuro';
        }
    });
});