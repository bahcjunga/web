const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearButton');
const saveBtn = document.getElementById('saveBtn');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');

// 초기 배경색 설정
let backgroundColor = backgroundColorPicker.value;

// 캔버스 크기 조정 및 배경색 적용
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    applyBackgroundColor();
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// 배경색 적용 함수
function applyBackgroundColor() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 배경색 변경 시 적용
backgroundColorPicker.addEventListener('input', (e) => {
    backgroundColor = e.target.value;
    applyBackgroundColor();
});

// 그리기 기능
let painting = false;

function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
}

function startPosition(e) {
    e.preventDefault();
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    e.preventDefault();

    const pos = getPosition(e);

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// 이벤트 리스너 추가 (마우스 & 터치 지원)
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endPosition);

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

// 캔버스 초기화 버튼
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    applyBackgroundColor(); // 배경색 유지
});

// 저장 버튼 기능 (배경색 포함)
saveBtn.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // 배경색 먼저 적용
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // 기존 그림 덮어쓰기
    tempCtx.drawImage(canvas, 0, 0);

    // 저장 기능
    const imageUrl = tempCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'drawing.png';
    link.click();
});