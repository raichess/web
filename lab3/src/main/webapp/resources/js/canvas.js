const scale = 50
let centerX, centerY

function initialization(R) {
    const canvas = document.getElementById("canvas_graph")
    const ctx = canvas.getContext("2d")
    const W = canvas.width;
    const H = canvas.height;
    centerX = W / 2;
    centerY = H / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(W, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, H);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    const color = "rgb(234, 10, 129, 0.5)";

    ctx.beginPath();
    ctx.rect(centerX, centerY - scale * R, scale * R, scale * R);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);              // (0, 0)
    ctx.lineTo(centerX - scale * R, centerY);    // (-R, 0)
    ctx.lineTo(centerX, centerY - scale * R);    // (0, R)
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();


    const R_half = R / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, scale * R_half, Math.PI, 1.5 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();


    ctx.fillStyle = "black";
    ctx.font = "13px Arial";
    ctx.fillText("X", W - 20, centerY - 5);
    ctx.fillText("Y", centerX + 5, 20);

    ctx.fillText("R", centerX + scale * R, centerY - 5);
    ctx.fillText("R/2", centerX + scale * R_half, centerY - 5);
    ctx.fillText("-R/2", centerX - scale * R_half, centerY - 5);
    ctx.fillText("-R", centerX - scale * R, centerY - 5);

    ctx.fillText("R", centerX + 5, centerY - scale * R);
    ctx.fillText("R/2", centerX + 5, centerY - scale * R_half);
    ctx.fillText("-R/2", centerX + 5, centerY + scale * R_half);
    ctx.fillText("-R", centerX + 5, centerY + scale * R);

    for (let i = -R; i <= R; i += R_half) {
        if (i === 0) continue;
        let x = centerX + i * scale;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();

        let y = centerY - i * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(W - 10, centerY - 5);
    ctx.lineTo(W, centerY);
    ctx.lineTo(W - 10, centerY + 5);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
}

function convertIntoCanvasCoordinates(x, y) {
    return [centerX + x * scale, centerY - y * scale]
}

function drawPoint(x, y, hit) {
    const canvas = document.getElementById("canvas_graph");
    const ctx = canvas.getContext("2d");
    if (hit) {
        ctx.fillStyle = '#000000ff' // Цвет попадания (черный)
    } else {
        ctx.fillStyle = '#D14545' // Цвет промаха (красный)
    }
    ctx.beginPath()
    let [newX, newY] = convertIntoCanvasCoordinates(x, y)
    ctx.arc(newX, newY, 3, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
}

export {initialization, drawPoint};