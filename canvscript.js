const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearButton');
const saveBtn = document.getElementById('saveBtn');

// 캔버스 크기 조정 함수
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let painting = false;

// 위치 가져오기 (마우스 + 터치 대응)
function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) { // 터치 이벤트일 경우
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else { // 마우스 이벤트일 경우
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

// 그림 시작
function startPosition(e) {
    e.preventDefault(); // 터치 시 스크롤 방지
    painting = true;
    draw(e);
}

// 그림 종료
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// 그림 그리기
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

// 이벤트 리스너 추가 (마우스 + 터치 대응)
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

// 캔버스 초기화 버튼
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 저장 버튼 기능
saveBtn.addEventListener('click', () => {
    const imageUrl = canvas.toDataURL('image/png'); // canvas 데이터를 이미지 URL로 변환
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'drawing.png'; // 저장될 파일 이름
    link.click(); // 다운로드 실행
});
