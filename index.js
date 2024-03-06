const canvas = document.getElementById("signatureCanvas");
const context = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        const x = e.offsetX;
        const y = e.offsetY;
        drawLine(lastX, lastY, x, y);
        [lastX, lastY] = [x, y];
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
});

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("savedSignature").style.display = "none";
}

function saveSignature() {
    const signatureImage = canvas.toDataURL(); // Convert canvas to base64 image
    const savedSignature = document.getElementById("savedSignature");
    savedSignature.src = signatureImage;
    savedSignature.style.display = "inline-block";
}
