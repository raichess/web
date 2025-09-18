import {initialization, drawPoint} from "./canvas.js";
const xCheckboxes = document.querySelectorAll('.checkbox_X')
const submitButton = document.getElementById("submit")
const clearButton = document.getElementById("clear")
const yInput = document.getElementById('y');
const error = document.getElementById('error')
const rInput = document.querySelectorAll('#choice_r input[type="radio"]');
let currentR = 2; 


const validateX = function() {
    const selectedX = document.querySelector('input[type="checkbox"]:checked')
    if (!selectedX) {
        showMessage(error, "Необходимо выбрать координату X!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

const validateY = function() {
    const yValue = yInput.value.trim();
    if (yValue == '') {
        showMessage(error, "Необходимо выбрать координату Y!")
        return false
    } else if (isNaN(yValue)) { 
        showMessage(error, "Не входит в диапазон!")
        return false
    } else if (yValue < -5 || yValue > 5) {
        showMessage(error, "Y должен быть числом!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

const validateR = function() {
    const selectedR = document.querySelector('input[type="radio"]:checked')
    if (!selectedR) {
        showMessage(error, "Необходимо выбрать координату R!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

function changeR(event) {
    const selectedR = event.target
    currentR = parseFloat(selectedR.value)
    redraw(currentR)
}
rInput.forEach(radio => {
    radio.addEventListener('change', changeR)
})

function redraw(R = 2) {
    initialization(R);
    const canvas = document.getElementById("canvas_graph");
    const ctx = canvas.getContext("2d");
    let history = JSON.parse(localStorage.getItem('results') || '[]');
    history.forEach(result => {
        drawPoint(parseFloat(result.x), parseFloat(result.y), result.hit);
    });
}

function clear() {
    localStorage.removeItem('results')
    const tbody = document.getElementById('body_table')
    tbody.innerHTML = ''
    mainForm.reset()
    redraw(2)
}
clearButton.addEventListener('click', clear)

//





