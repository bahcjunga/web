const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearButton');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
    e.preventDefault(); // 스크롤 이벤트 방지
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    // 터치 이벤트에서의 좌표 처리
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    const touchY = e.touches[0].clientY - canvas.offsetTop;

    ctx.lineTo(touchX, touchY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touchX, touchY);
}

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
