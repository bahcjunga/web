// script.js

let currentIndex = 0;
const images = document.querySelectorAll(".slider img");
const slider = document.getElementById("slider");

const moveToNextSlide = () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSliderPosition();
};

const moveToPrevSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    updateSliderPosition();
};

const updateSliderPosition = () => {
    const offset = -currentIndex * 100; // 이미지 하나 크기만큼 이동
    slider.style.transform = `translateX(${offset}%)`;
};

// 터치 이벤트 처리 (스와이프)
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        moveToNextSlide();
    } else if (startX < endX - 50) {
        moveToPrevSlide();
    }
});

// 클릭 이벤트 처리
slider.addEventListener("click", (e) => {
    const clickedElement = e.target;
    if (clickedElement.tagName === "IMG") {
        const index = [...images].indexOf(clickedElement);
        currentIndex = index;
        updateSliderPosition();
    }
});

// 버튼으로 슬라이드 이동
document.getElementById('nextBtn').addEventListener('click', moveToNextSlide);
document.getElementById('prevBtn').addEventListener('click', moveToPrevSlide);
