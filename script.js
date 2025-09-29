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
// Regex estricta para validar estructura del correo
const strictEmail = /^(?!.*\.\.)[A-Za-z0-9][A-Za-z0-9._%+-]{0,63}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

// Lista de TLD válidos (ejemplo, puedes ampliarla con la oficial de IANA)
const validTLDs = [
  "com","org","net","edu","gov","mil","int",
  "es","mx","ar","cl","co","pe","uy","br",
  "io","ai","dev","app","info","biz","name"
];

function validarEmail(email) {
  if (!strictEmail.test(email)) return false;
  
  const tld = email.split(".").pop().toLowerCase();
  return validTLDs.includes(tld);
}

const emailInput = document.querySelector("#email");
const form = document.querySelector("#formcontacto");

emailInput.addEventListener("input", () => {
  emailInput.setCustomValidity(""); // limpiar mensaje
  if (emailInput.value && !validarEmail(emailInput.value)) {
    emailInput.setCustomValidity("Correo no válido o dominio de niel superior no permitido.");
  }
});

form.addEventListener("submit", (e) => {
  if (!validarEmail(emailInput.value)) {
    e.preventDefault();
    emailInput.reportValidity();
  }
});