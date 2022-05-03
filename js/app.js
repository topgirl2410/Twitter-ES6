'use strict';

// Variables 

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

// Events Listeners

eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}


// Funciones 

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación...

    if (tweet === '') {
        mostrarError('El campo no puede ir vacio');

        return;  // Evita que se ejecuten mas lineas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets...
    tweets = [...tweets, tweetObj];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

// Mostrar mensaje de error

function mostrarError(error) {

    const mensajeError = document.createElement('p');

    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');

    contenido.appendChild(mensajeError);

    // Eliminar la alerta del error despues de 3 segundos

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets 

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach((tweet) => {

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto 
            li.innerHTML = tweet.tweet;


            // Insertarlo en el HTML
            listaTweets.appendChild(li);

        });
    }
}

// Limpiar el HTML 

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}