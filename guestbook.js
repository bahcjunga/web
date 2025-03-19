// 로컬 스토리지에서 메시지 데이터 불러오기
function loadMessagesFromLocalStorage() {
    const storedMessages = localStorage.getItem('guestbookMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
}

// 방명록 메시지를 로컬 스토리지에 저장
function saveMessagesToLocalStorage() {
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
}

// 방명록 메시지를 화면에 출력하는 함수
function displayMessages() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // 기존 메시지 지우기

    messages.forEach(function(msg) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        messageElement.innerHTML = `
            <h3>${msg.name} ( ${msg.date} )</h3>
            <p>${msg.message}</p>
        `;

        messageList.appendChild(messageElement);
    });
}

// 방명록 메시지를 저장할 배열
let messages = loadMessagesFromLocalStorage();

// 방명록 폼 제출 시 처리하는 함수
document.getElementById('guestbook-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 페이지 리로드 방지

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // 메시지 객체 생성
    const newMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleString()
    };

    // 메시지를 배열에 추가
    messages.push(newMessage);

    // 메시지 저장 및 화면에 출력
    saveMessagesToLocalStorage();
    displayMessages();

    // 폼 초기화
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
});

// 페이지 로드 시 메시지 출력
window.onload = function() {
    displayMessages();
};
