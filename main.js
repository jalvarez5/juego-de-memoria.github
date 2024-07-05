// inicializacion de variables
let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer=30;
let timerInicial=30;
let tiempoRegresivoId=null;

let winAudio=new Audio('./sounds/win.wav');
let wrongAudio=new Audio('./sounds/wrong.wav');
let perdidoAudio=new Audio('./sounds/perdido.wav');
let clickAudio=new Audio('./sounds/click.wav');
let acertadoAudio=new Audio('./sounds/acertado.wav');

//apuntando a documento html
let mostrarMovimentos=document.querySelector('#movimientos');
let mostarAciertos=document.querySelector('#aciertos');
let mostrarTiempo=document.querySelector('#t-restante');

// generacion de numeros aleatorios
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

numeros= numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
   tiempoRegresivoId= setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML=`Timer: ${timer} segundos`;
    
    if(timer==0){
     clearInterval(tiempoRegresivoId);
     bloquearTarjetas();
     winAudio.play()
    }
  },1000);
}

function bloquearTarjetas(){
    for(let i=0; i<=15; i++){
      let tarjetaBloqueada=document.getElementById(i);
      tarjetaBloqueada.innerHTML=`<img src="./img/${numeros[i]}.png" alt="">`;
      tarjetaBloqueada.disabled=true;
    }
}
// funcion principal

function destapar(id){

   if(temporizador==false){
     contarTiempo();
     temporizador=true;
   }

  tarjetasDestapadas++;
 

  if(tarjetasDestapadas==1){
    // mostrar primer numero
    tarjeta1=document.getElementById(id);
    primerResultado=numeros[id]
    tarjeta1.innerHTML=`<img src="./img/${primerResultado}.png" alt="">`;
    clickAudio.play() 

    //deshabilitar el primer botton
    tarjeta1.disabled=true;

  }else if(tarjetasDestapadas==2){
    //mostrar segundo numero
    tarjeta2=document.getElementById(id);
    segundoResultado=numeros[id];
    tarjeta2.innerHTML=`<img src="./img/${segundoResultado}.png" alt="">`;
    
    //deshabilitar el segundo botton
    tarjeta2.disabled=true;

    // incrementar movimientos
     movimientos++;
     mostrarMovimentos.innerHTML=`Movimientos ${movimientos}`;

     if(primerResultado==segundoResultado){
        //encerar contador tarjetas destapadas
        tarjetasDestapadas=0;

        //aumentar aciertos
        aciertos++;
        mostarAciertos.innerHTML=`aciertos ${aciertos}`;
        acertadoAudio.play()

        if(aciertos==8){
             winAudio.play();
            clearInterval(tiempoRegresivoId);
          mostarAciertos.innerHTML=`aciertos ${aciertos} 😱`;
          mostrarTiempo.innerHTML=`Fantastico 🤩 sólo demoraste ${timerInicial-timer} segundos`
          mostrarMovimentos.innerHTML=`Movimentos ${movimientos} 😎🤘`
        }
     }else{
        //mostrar momentaneamente valores y volver a tapar
        
        setTimeout(() => {
            tarjeta1.innerHTML='';
            tarjeta2.innerHTML='';
            
            //habilitamos nuevamente el botton para el acierto con la otra tarjeta igual
            tarjeta1.disabled=false;
            tarjeta2.disabled=false;
            tarjetasDestapadas=0; // se encera para poder seleccionar otras tarjetas mas
        },900);
        perdidoAudio.play()
     }
  }
}

