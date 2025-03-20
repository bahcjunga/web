const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb+srv://bahcjunga:<db_password>@ghostbook.d9y94.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(express.static('public')); // public 폴더를 정적 파일 제공

// 방명록 메시지 저장 API
app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 방명록 메시지 조회 API
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
