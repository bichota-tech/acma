document.addEventListener("DOMContentLoaded", () => {
    const mycarousel = document.querySelector("#mycarousel");

    //Inicializar carrusel Bootstrap
  const carousel = new
    bootstrap.Carousel(mycarousel, {
      interval: 3000, //tiempo entre slides (ms) (0 = no auto)
      ride: "carousel", //para que arranque solo
      pause: "hover", //se detiene al pasar el mouse
      wrap: true // vuelve al inicio tras el ultimo slide
    });
    
  //Botones
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault(); //evita el salto de pagina
    carousel.prev();
  })

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.next();
  });
});