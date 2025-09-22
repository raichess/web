import {initialization, drawPoint} from "./canvas.js";

const mainForm = document.getElementById('form')
const clearButton = document.getElementById("clear")
const yInput = document.getElementById('y')
const xInput = document.getElementById('x')
const error = document.getElementById('error')
const rInput = document.querySelectorAll('#choice_r input[type="radio"]')
let currentR = 2

window.onload = function () {
    redraw(currentR);
};

async function sendRequest(x, y, r) {
    const params = new URLSearchParams({x,y,r});
    const url = `http://localhost:8080/fcgi-bin/server.jar?${params.toString()}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const result = await response.json();
        if (result.error) {
            showMessage(error, result.error);
            return;
        }
        let history = JSON.parse(localStorage.getItem('results') || '[]');
        history.push(result);
        localStorage.setItem('results', JSON.stringify(history));
        addRow(result);
        drawPoint(parseFloat(result.x), parseFloat(result.y), result.hit);
    } catch (err) {
        console.error(err);
        showMessage(error, "Error about server");
    }
}


const validateX = function () {
    const selectedX = xInput.value
    if (selectedX === '' || selectedX == null) {
        showMessage(error, "Необходимо выбрать координату X!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

const validateY = function () {
    const selectedY = yInput.value.trim();
    if (selectedY === '') {
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

const validateR = function () {
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
    await sendRequest(x, y, r);
}

mainForm.addEventListener('submit', handleSubmit);

function addRow(data) {
    const { x, y, r, hit, serverTime, scriptTime } = data;
    const tbody = document.getElementById('body_table');
    let row = tbody.insertRow(-1);
    row.insertCell(0).textContent = x;
    row.insertCell(1).textContent = y;
    row.insertCell(2).textContent = r;
    row.insertCell(3).textContent = hit ? 'Да' : 'Нет';
    row.insertCell(4).textContent = time;
    row.insertCell(5).textContent = scriptTime;
}


function saveToLocalStorage() {
    let savedResult = JSON.parse(localStorage.getItem('results') || '[]')
    savedResult.push(data)
    localStorage.setItem('results', JSON.stringify(savedResult))
}
function showMessage(element, message) {
    element.onanimationend = null
    if (message) {
        element.hidden = false
        element.style.animation = 'fadeInAndFadeOut 3s'
        element.textContent = message
        element.onanimationend = () => {
            element.hidden = true
            element.textContent = ""
        }
    } else {
        element.hidden = true
        element.style.animation = 'none'
        element.textContent = ""
    }
}






