buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if (!started){
        $('#level-title').text('Level '+ level);
        nextSequence();
        started = true;
    }
})

//Selecciona los botones para aplicar evento
$('.btn').click(function(){
    //A la variable se le asigna el boton clickeado y su atributo
    var userChosenColour = $(this).attr('id');
    //Se añade el color clickeado a un nuevo array
    userClickedPattern.push(userChosenColour);
    //Reproduce sonido segun el color clickeado
    playSound(userChosenColour);
    //Anima segun boton clickeado
    animatePress(userChosenColour);
    //LLama la funcion luego que el usuario ha clickeado los botones y verifica la secuencia
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    //verifica si el nivel actual es igual al patron clickeado
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('Success')

        //si el largo del patron clickeado es igual al largo del patron
        if (userClickedPattern.length === gamePattern.length){
            //llama la siguiente secuencia despues de 1000 milisegundos
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log('Wrong');
        //Reproduce sonido wrong
        playSound('wrong');
        //Aplica estilo wrong ubicado en el CSS y lo remueve luego de 200 ms
        $('body').addClass('game-over');
        //Cambia el titulo del h1 a Game Over
        $('#level-title').text('Game Over, Press Any Key to Restart');

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        //Reinicia las variables
        startOver();
        }
}

function nextSequence(){
    //Cuando se activa la siguiente secuencia, reinicia el userClickedPattern (patron clickeado) a vacio para el siguiente nivel
    userClickedPattern = []; 
    //Se aumentan los niveles al llamar la funcion
    level++;
    //Se actualiza el nivel del h1
    $('#level-title').text('Level '+ level);
    //Funcion random
    var randomNumber = Math.floor(Math.random() * 4);
    //Asigna un color dependiendo el numero random generado
    var randomChosenColour = buttonColours[randomNumber];
    //Añade el color generado a una nueva lista de patrones
    gamePattern.push(randomChosenColour);
    
    //Efecto de flash
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Llamando la funcion de sonido
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    //Pide un parametro que luego sera el color clickeado en la funcion superior
   $('#'+currentColour).addClass('pressed');
    //Luego de añadir la clase se utiliza otra funcion para removerla luego de 100seg
   setTimeout(function (){
       $('#' + currentColour).removeClass('pressed');
   }, 100);
}

function playSound(name){
    //Reproducir sonido
    var audio = new Audio ("sounds/"+ name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



