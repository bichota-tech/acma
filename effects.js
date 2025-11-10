//Efecto tipeado para el h1 seccion INICIO
document.addEventListener("DOMContentLoaded", ()=>{
    new Typed("#typed-text",{
        strings:[
            "Desarrollador Web Frontend Júnior.",
            "Apasionada por el diseño y la tecnología.",
            "En constante aprendizaje y crecimiento."
        ],
        typeSpeed:60,
        backSpeed: 35,
        backDelay:1500,
        loop:true
    });
});

//Efecto particulas fondo seccion INICIO
particlesJS("particles-js", {
    particles:{
        number:{value: 70, density: { enable: true, value_area: 800 }},
        color:{value: "#f55139"},
        shape:{type:"circle"},
        opacity:{value:0.3},
        size:{value:3},
        line_linked:{enable:true, distance:120, color:"#ebe7d9", opacity:0.2, width:1},
        move:{enable:true, speed:1.2, direction:"none", out_mode:"out"}
    },
    interactivity:{
        events:{onhover:{enable:true, mode:"repulse"}},
        modes:{repulse:{distance:100, duration:0.4}}
    },
    retina_detect: true
});

// Inicializar AOS
AOS.init({
  duration: 800,
  once: true
});

// Demo modal
const demoButtons = document.querySelectorAll(".demo-btn");
const demoModal = document.getElementById("demo-modal");
const demoContent = document.getElementById("demo-content");
const closeModal = document.querySelector(".close-modal");

// Objeto con imágenes de demo
const demos = {
  "wp-woo": [
    "img/wp-agencia-1.jpg",
    "img/wp-agencia-2.jpg",
    "img/wp-agencia-3.jpg",
    "img/wp-agencia-4.jpg"
  ],
  "wp-servicio": [
    "img/wp-elementor-1.jpg",
    "img/wp-elementor-2.jpg",
    "img/wp-elementor-3.jpg",
    "img/wp-elementor-4.jpg"
  ],
    "git-galery": [],
    "git-asistente": []
};

// Abrir modal
demoButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const demoId = btn.dataset.demo;
    demoContent.innerHTML = "";
    demos[demoId].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      demoContent.appendChild(img);
    });
    demoModal.style.display = "flex";
  });
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  demoModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if(e.target === demoModal) demoModal.style.display = "none";
});

