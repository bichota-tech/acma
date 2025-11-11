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



