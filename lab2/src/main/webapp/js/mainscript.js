import {initialization, drawPoint} from "./canvas.js";

const canvas = document.getElementById("canvas_graph");
const error = document.getElementById("error");
const form = document.getElementById("form");
const hiddenForm = document.getElementById("canvas_form");
const hiddenX = document.getElementById("canvas_x");
const hiddenY = document.getElementById("canvas_y");
const hiddenR = document.getElementById("canvas_r");
let yInput = document.getElementById("y");
let currentR = null
const rInputs = document.querySelectorAll('#choice_r input[type="checkbox"]');

window.onload = () => {
    redraw(currentR);
};
const validateX = function () {
    const selectedX = document.querySelector('#choice_x input[type="radio"]:checked')
    if (!selectedX) {
        showMessage(error, "Необходимо выбрать координату X!")
        return false
    } else {
        showMessage(error, "")
        return true
    }
}

const validateY = function () {
    const raw = yInput.value;
    const yStr = normalizeNumber(raw);
    yInput.value = yStr;

    const y = parseFloat(yStr);

    if (yStr === '') {
        showMessage(error, "Введите координату Y!");
        return false;
    }
    if (isNaN(y)) {
        showMessage(error, "Y должен быть числом!");
        return false;
    }
    if (y < -5 || y > 5) {
        showMessage(error, "Не входит в диапазон от -5 до 5!");
        return false;
    }

    const dot = yStr.indexOf('.');
    if (dot !== -1 && yStr.length - dot - 1 > 6) {
        showMessage(error, "Слишком много знаков после запятой (макс. 6)");
        return false;
    }
    showMessage(error, "");
    return true;
}

function normalizeNumber(value) {
    if (!value) return '';

    let v = value.trim()
        .replace(/[^0-9.,-]/g, '')
        .replace(/,/g, '.');
    const dotIndex = v.indexOf('.');
    if (dotIndex !== -1)
        v = v.slice(0, dotIndex + 1) + v.slice(dotIndex + 1).replace(/\./g, '');

    const minusCount = (v.match(/-/g) || []).length;
    if (minusCount > 1 || (minusCount === 1 && v[0] !== '-'))
        v = '-' + v.replace(/-/g, '');

    return v;
}

function redraw(R = currentR) {
    initialization(R)
    const tableRows = document.querySelectorAll("#result_table tbody tr");
    tableRows.forEach(tableRow => {
        const cells = tableRow.querySelectorAll("td");
        const x = parseFloat(cells[0].textContent);
        const y = parseFloat(cells[1].textContent);
        const hit = cells[3].textContent === "Да";
        drawPoint(x, y, hit);
    })
}


rInputs.forEach(cb => {
    cb.addEventListener('click', (event) => {
        if (!event.target.checked) return;
        rInputs.forEach(other => {
            if (other !== event.target) other.checked = false;
        });
        currentR = parseFloat(event.target.value);
        redraw(currentR);
    });
});

function validateR() {
    if (currentR === null) {
        showMessage(error, "Необходимо выбрать R!");
        return null;
    }
    showMessage(error, "");
    return currentR;
}

canvas.addEventListener("click", (event) => {
    if (!validateR()) {
        showMessage(error, "Радиус не выбран! ");
        return;
    }
    const rect = canvas.getBoundingClientRect();
    const scale = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const x = ((event.clientX - rect.left - centerX) / scale).toFixed(6);
    const y = (-(event.clientY - rect.top - centerY) / scale).toFixed(6);

    hiddenX.value = x;
    hiddenY.value = y;
    hiddenR.value = currentR;

    hiddenForm.submit();//отправка по клику
})

document.getElementById("submit-btn").addEventListener("click", (event) => {
    if (!validateX() || !validateY() || !validateR()) {
        event.preventDefault();
        return;
    }
});
document.getElementById("clear").addEventListener("click", () => {
    document.querySelectorAll('#choice_x input[type="radio"]').forEach(x => x.checked = false);
    document.getElementById("y").value = "";
    rInputs.forEach(r => r.checked = false);
    currentR = null;
    redraw();
    const tbody = document.querySelector("#result_table tbody");
    tbody.innerHTML = "";
});


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