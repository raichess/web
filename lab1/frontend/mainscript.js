import {initialization, drawPoint} from "./canvas.js";
const mainForm = document.getElementById('form')
const clearButton = document.getElementById("clear")
const yInput = document.getElementById('y')
const xInput = document.getElementById('x')
const error = document.getElementById('error')
const rInput = document.querySelectorAll('#choice_r input[type="radio"]')
let currentR = 2

window.onload = function() {
    redraw(currentR);
};

async function sendRequest(x, y , r) {
    const errorField = document.getElementById('error')
    const dataForRequest = {
        x: x,
        y: y,
        r: r
    }
}


const validateX = function() {
    const selectedX = xInput.value
    if (selectedX === '' || selectedX == null ) {
        showMessage(error, "Необходимо выбрать координату X!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

const validateY = function() {
    const selectedY = yInput.value.trim();
    if (selectedY == '') {
        showMessage(error, "Необходимо выбрать координату Y!")
        return false
    } else if (isNaN(selectedY)) { 
        showMessage(error, "Y должен быть числом!")
        return false
    } else if (selectedY < -5 || selectedY > 5) {
        showMessage(error, "Не входит в диапазон!") 
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

function redraw(R = currentR) {
    initialization(R);
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
    redraw(currentR)
}
clearButton.addEventListener('click', clear)

async function handleSubmit(event) {
    event.preventDefault();
    const x = xInput.value;
    const y = yInput.value.trim();
    const rSelected = document.querySelector('#choice_r input[type="radio"]:checked');

    if (!validateX() || !validateY() || !validateR()) return;

    const r = rSelected.value;
    //await sendRequest(x, y, r);
}

mainForm.addEventListener('submit', handleSubmit);

function addRow() {

}






