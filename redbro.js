// 슬라이드 기능을 위한 JavaScript 코드
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.image-slider');
const images = document.querySelectorAll('.image-slider img');

// 현재 슬라이드 인덱스
let currentIndex = 0;

// 슬라이드 이동 함수
function moveToSlide(index) {
    if (index < 0) {
        currentIndex = images.length - 1;  // 마지막 이미지로 이동
    } else if (index >= images.length) {
        currentIndex = 0;  // 첫 번째 이미지로 이동
    } else {
        currentIndex = index;
    }

    // 슬라이드를 이동시키는 transform 값 계산 (하나의 이미지 크기만큼 이동)
    const offset = -currentIndex * 100; // 100%씩 이동
    slider.style.transform = `translateX(${offset}%)`;
}

// 이전 버튼 클릭 시
prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
});

// 다음 버튼 클릭 시
nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
});

// 초기 슬라이드 표시
moveToSlide(currentIndex);
