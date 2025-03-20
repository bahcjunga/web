document.getElementById('guestbook-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // 서버에 방명록 메시지 전송
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
    });

    const result = await response.json();
    if (response.ok) {
        console.log('Message posted:', result);
        loadMessages(); // 메시지를 새로고침
    } else {
        console.error('Error posting message:', result);
    }
});

// 서버에서 방명록 메시지 목록 가져오기
async function loadMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<p><strong>${msg.name}</strong>: ${msg.message}</p>`;
        messageList.appendChild(messageElement);
    });
}

// 페이지 로드 시 방명록 메시지 목록 불러오기
loadMessages();
