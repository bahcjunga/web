const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // cors 패키지 추가
const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// JSON 데이터를 처리하기 위한 미들웨어
app.use(bodyParser.json());

// 방명록 데이터를 저장할 배열 (데이터베이스 대신 메모리 사용)
let guestbookMessages = [];

// 방명록 데이터 가져오기 (GET)
app.get('/api/messages', (req, res) => {
    res.json(guestbookMessages);
});

// 방명록 메시지 추가 (POST)
app.post('/api/messages', (req, res) => {
    const { name, message } = req.body;
    const newMessage = {
        name,
        message,
        date: new Date().toLocaleString(),
    };
    guestbookMessages.push(newMessage);
    res.status(201).json(newMessage);
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
