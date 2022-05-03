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

    console.log('agregando tweet...')
}