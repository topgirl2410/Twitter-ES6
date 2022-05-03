'use strict';

// Variables 

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

// Events Listeners

eventListeners();

function eventListeners() {

    // Cuando se envia el formulario
    formulario.addEventListener('submit', agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();

    });
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
        texto: tweet
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

            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = 'X';

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto 
            li.innerHTML = tweet.texto;

            // Añade el boton de borrar al reset
            li.appendChild(botonBorrar);

            // Añade un atributo unico...
            li.dataset.tweetId = tweet.id;


            // Insertarlo en el HTML
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}


// Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();

    const id = e.target.parentElement.dataset.tweetId;
    tweets = tweets.filter(tweet => tweet.id != id);

    crearHTML();
}

// Agrega los tweets actuales a localStorage 

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));  // se guarda en localStorage (aunque recargues)
}


// Limpiar el HTML 

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}



