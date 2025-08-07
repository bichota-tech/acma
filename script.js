/*  const toggleBtn = document.getElementById('iconoModo');
const body = document.body;
let modoOscuro = false;

function cambiarModo() {
    modoOscuro = !modoOscuro;

    body.classList.toggle('modo-oscuro');

    if (modoOscuro) {
        toggleBtn.src = 'imagenes/sol.png';
        toggleBtn.alt = 'Cambiar a modo claro';
    } else {
        toggleBtn.src = 'imagenes/luna.png';
        toggleBtn.alt = 'Cambiar a modo oscuro';
    } 
}

// Asociar la función al evento
toggleBtn.addEventListener('click', cambiarModo);  */

document.addEventListener('DOMContentLoaded', () => {
    // Aquí va el código principal
    const icono = document.getElementById('iconoModo');
    icono.addEventListener('click', () => {
        // Cambios al hacer clic
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