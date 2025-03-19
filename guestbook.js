// 서버에서 메시지를 가져오는 함수
async function loadMessagesFromServer() {
    try {
        const response = await fetch('http://localhost:3000/api/messages');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading messages from server:', error);
        return [];
    }
}

// 서버에 메시지를 저장하는 함수
async function saveMessageToServer(name, message) {
    try {
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                message: message,
            }),
        });

        const newMessage = await response.json();
        return newMessage;
    } catch (error) {
        console.error('Error saving message to server:', error);
    }
}

// 페이지 로드 시 서버에서 메시지 불러오기
window.onload = async function() {
    messages = await loadMessagesFromServer();
    displayMessages();
};

// 방명록 폼 제출 시 처리하는 함수
document.getElementById('guestbook-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // 페이지 리로드 방지

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // 메시지를 서버에 저장
    const newMessage = await saveMessageToServer(name, message);
    if (newMessage) {
        messages.push(newMessage);
        displayMessages();
    }

    // 폼 초기화
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
});
