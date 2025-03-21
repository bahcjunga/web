const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://bahcjunga:<tAAaEHj7R3BTbx9F>@ghostbook.d9y94.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB 연결 성공'))
    .catch((err) => console.log('MongoDB 연결 실패', err));

const messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/messages', async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.status(400).json({ error: '이름과 메시지를 모두 입력해주세요.' });
        }
        const newMessage = new Message({ name, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: '서버 오류', details: err.message });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: '서버 오류', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
