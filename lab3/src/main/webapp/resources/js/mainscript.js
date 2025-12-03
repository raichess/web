function redrawGraph() {
    const rSelect = document.getElementById('check_form:r_select');
    let currentR = 1;

    if (rSelect && rSelect.value && rSelect.value !== '0') {
        currentR = parseFloat(rSelect.value);
    }

    initialization(currentR);

    window.savedPoints.forEach(point => {
        let x = parseFloat(point.x);
        let y = parseFloat(point.y);
        drawPoint(x, y, point.hit);
    });
}

window.redrawGraph = redrawGraph;
document.addEventListener('DOMContentLoaded', redrawGraph);
window.updateR = function (newRValue) {
    redrawGraph();
}
window.handleCanvasClick = function (event) {
    const rSelect = document.getElementById('check_form:r_select');
    if (!rSelect || rSelect.value === '0') {
        alert("Пожалуйста, выберите значение R перед кликом по графику");
        return;
    }
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const scale = 50;
    const W = canvas.width;
    const H = canvas.height;
    const centerX = W / 2;
    const centerY = H / 2;
    const x = (clickX - centerX) / scale;
    const y = (centerY - clickY) / scale;

    const xInputHidden = document.getElementById('check_form:x_input_hidden');
    const yInputHidden = document.getElementById('check_form:y_input_hidden');
    const submitBtn = document.getElementById('check_form:submit_button_canvas');

    if (xInputHidden && yInputHidden && submitBtn) {
        xInputHidden.value = x.toFixed(4);
        yInputHidden.value = y.toFixed(4);

        submitBtn.click();
    }
}
