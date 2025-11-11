document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll(".section");
  const hamburguer = document.getElementById("hamburguer");
  const navMenu = document.getElementById("nav-menu");
  

  //Navegacion SPA entre secciones
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.section;

      // Actualiza los estados activos
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach(sec => {
        sec.classList.remove("active");
        if (sec.id === target) sec.classList.add("active");
      });

      //Cerrar menu hamburguesa
      navMenu.classList.remove("show");
      hamburguer.classList.remove("active");
    });
  });

  //Toggle menu hamburguesa
  hamburguer.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    hamburguer.classList.toggle("active");
  });

});
