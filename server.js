const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb+srv://bahcjunga:<db_password>@ghostbook.d9y94.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB 연결 성공'))
.catch((err) => console.log('MongoDB 연결 실패', err));

// MongoDB 스키마 및 모델
const messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// 미들웨어 설정
app.use(bodyParser.json());
app.use(express.static('public')); // static 파일 서빙 (HTML, CSS, JS)

// POST: 방명록 메시지 저장 API
app.post('/api/messages', async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ error: '이름과 메시지를 모두 입력해주세요.' });
        }

        const newMessage = new Message({ name, message });
        await newMessage.save();
        res.status(201).json(newMessage);  // 성공적으로 저장된 메시지 반환
    } catch (err) {
        res.status(500).json({ error: '서버 오류', details: err.message });
    }
});

// GET: 방명록 메시지 조회 API
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);  // 저장된 모든 메시지 반환
    } catch (err) {
        res.status(500).json({ error: '서버 오류', details: err.message });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
