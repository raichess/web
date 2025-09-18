const xCheckboxes = document.querySelectorAll('.checkbox_X')
const submitButton = document.getElementById("submit")
const clearButton = document.getElementById("clear")
const yInput = document.getElementById('y');
const error = document.getElementById('error')

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

