/*=========================================
        PROJECT MELODY 3.0
=========================================*/

// ==========================
// PÁGINAS
// ==========================

const pages = document.querySelectorAll(".page");

function changePage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}

// ==========================
// BOTONES
// ==========================

const startButton=document.getElementById("startButton");

const storyNext=document.getElementById("storyNext");

const letterButton=document.getElementById("letterButton");

const albumButton=document.getElementById("albumButton");

const timelineButton=document.getElementById("timelineButton");

const loveButton=document.getElementById("loveButton");

const surpriseButton=document.getElementById("surpriseButton");

const moonButton=document.getElementById("moonButton");

const closeSecret=document.getElementById("closeSecret");

// ==========================
// MÚSICA
// ==========================

const music=document.getElementById("music");

const musicButton=document.getElementById("musicButton");

let musicPlaying=false;

musicButton.addEventListener("click",()=>{

    if(musicPlaying){

        music.pause();

        musicButton.textContent="🎵";

    }else{

        music.play();

        musicButton.textContent="⏸";

    }

    musicPlaying=!musicPlaying;

});

// ==========================
// INTRO
// ==========================

const introText=document.getElementById("storyText");

const introMessages=[

"Hay personas...",

"Que llegan a nuestra vida...",

"Sin hacer mucho ruido...",

"Pero terminan ocupando un lugar muy especial...",

"Y tú eres una de ellas. 💜"

];

let introIndex=0;

function startIntro(){

    introText.textContent="";

    storyNext.style.display="none";

    function nextMessage(){

        if(introIndex<introMessages.length){

            introText.textContent=introMessages[introIndex];

            introIndex++;

            setTimeout(nextMessage,2200);

        }else{

            storyNext.style.display="inline-block";

        }

    }

    nextMessage();

}
// =========================================
// CARTA
// =========================================

const letterText = document.getElementById("letterText");

const letter = `Hola Xiomara.
Hoy quería regalarte algo diferente.
No algo que pudiera comprarse.
Sino algo que pudiera construirse.
Cada línea de código de esta página fue escrita pensando en ti.
Pensando en tu sonrisa.
En tus ojos.
En esa tranquilidad que siento cuando estamos juntos.
Gracias por aceptar salir conmigo.
Aunque apenas llevemos unas semanas...
Has conseguido hacer que muchos momentos sean especiales.
Nuestra salida a Munanqui.
Las canciones que cantamos.
Aquella noche viendo Mi Sinfonía.
Y cada conversación donde el tiempo parece pasar demasiado rápido.
Hay algo que quiero que nunca olvides.
Eres una persona increíble.
Y espero poder seguir creando muchos recuerdos contigo.
Feliz cumpleaños.
Con muchísimo cariño...
Cristofer 💜`;

let writing = false;

function writeLetter(){

    if(writing) return;

    writing = true;

    letterText.textContent = "";

    let index = 0;

    function type(){

        if(index < letter.length){

            letterText.textContent += letter.charAt(index);

            index++;

            setTimeout(type,28);

        }else{

            writing = false;

            letterButton.style.display = "inline-block";

        }

    }

    type();

}
// =========================================
// NAVEGACIÓN
// =========================================

startButton.addEventListener("click",()=>{

    changePage("story");

    startIntro();

});

storyNext.addEventListener("click",()=>{

    changePage("letter");

    writeLetter();

});

letterButton.addEventListener("click",()=>{

    changePage("album");

});

albumButton.addEventListener("click",()=>{

    changePage("timeline");

});

timelineButton.addEventListener("click",()=>{

    changePage("love");

});

loveButton.addEventListener("click",()=>{

    changePage("birthday");

});

surpriseButton.addEventListener("click",()=>{

    changePage("surprise");

    showSecretStory();

    launchConfetti();

});
// =========================================
// ÚLTIMA SORPRESA
// =========================================

const lines = document.querySelectorAll(".secretLine");

const signature = document.querySelector(".signature");

function showSecretStory(){

    let delay = 1000;

    lines.forEach(line=>{

        setTimeout(()=>{

            line.classList.add("show");

        },delay);

        delay += 2500;

    });

    setTimeout(()=>{

        signature.classList.add("show");

    },delay+1000);

}
/*=========================================
        CONFETI
=========================================*/

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const colors=[
"#A855F7",
"#C084FC",
"#FFFFFF",
"#F9A8D4",
"#DDD6FE"
];

const confetti=[];

class Piece{

    constructor(){

        this.x=Math.random()*canvas.width;

        this.y=-20;

        this.size=Math.random()*8+6;

        this.speed=Math.random()*4+3;

        this.angle=Math.random()*360;

        this.rotate=Math.random()*8;

        this.color=colors[Math.floor(Math.random()*colors.length)];

    }

    update(){

        this.y+=this.speed;

        this.angle+=this.rotate;

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.rotate(this.angle*Math.PI/180);

        ctx.fillStyle=this.color;

        ctx.fillRect(
            -this.size/2,
            -this.size/2,
            this.size,
            this.size
        );

        ctx.restore();

    }

}

function launchConfetti(){

    confetti.length=0;

    for(let i=0;i<250;i++){

        confetti.push(new Piece());

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confetti.forEach(piece=>{

        piece.update();

        piece.draw();

    });

    requestAnimationFrame(animateConfetti);

}
/*=========================================
      MENSAJE DE LA LUNA
=========================================*/

const moonSecret=document.getElementById("moonSecret");

moonButton.addEventListener("click",()=>{

    moonSecret.classList.add("active");

});

closeSecret.addEventListener("click",()=>{

    moonSecret.classList.remove("active");

});
/*=========================================
        FADE IN
=========================================*/

music.volume=0;

function fadeMusic(){

    let volume=0;

    const interval=setInterval(()=>{

        volume+=0.02;

        music.volume=volume;

        if(volume>=1){

            clearInterval(interval);

        }

    },120);

}

musicButton.addEventListener("click",()=>{

    if(!musicPlaying){

        fadeMusic();

    }

});
/*=========================================
        PARTÍCULAS
=========================================*/

const background = document.querySelector(".background");

function createParticle(){

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random()*100+"vw";

    particle.style.animationDuration = (6+Math.random()*8)+"s";

    particle.style.opacity = Math.random();

    particle.style.width = (2+Math.random()*5)+"px";

    particle.style.height = particle.style.width;

    background.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },15000);

}

setInterval(createParticle,350);
/*=========================================
      ESTRELLAS PARPADEANTES
=========================================*/

setInterval(()=>{

    const stars=document.querySelector(".stars");

    stars.style.opacity=Math.random()*0.4+0.4;

},1200);
/*=========================================
      CONTADOR
=========================================*/

function daysTogether(){

    const start=new Date("2026-06-20");

    const today=new Date();

    const diff=today-start;

    return Math.floor(diff/86400000);

}

console.log(

"💜 Han pasado",

daysTogether(),

"días desde que comenzó esta nueva historia."

);
/*=========================================
      FOTOS
=========================================*/

document.querySelectorAll(".photo img").forEach(photo=>{

    photo.style.cursor="pointer";

    photo.addEventListener("click",()=>{

        window.open(photo.src,"_blank");

    });

});
/*=========================================
      EASTER EGG
=========================================*/

console.log(

"%cif(Xiomara.smiles){ Cristofer.heart++; }",

"color:#C084FC;font-size:18px;"

);