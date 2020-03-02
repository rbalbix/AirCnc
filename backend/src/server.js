const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Verify the DB environment
if (process.env.NODE_ENV == "production") {
    mongoose.connect('mongodb+srv://omni:omni@cluster0-kj5ow.mongodb.net/omni-aircnc?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} else {
    //module.exports = { mongoURI: "mongodb+srv://futAppapi:futAppapi@cluster0-kj5ow.mongodb.net/futappapi-dev?retryWrites=true&w=majority" }
    mongoose.connect('mongodb://localhost:27017/omni-aircnc',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
}

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

// Verify the environment
const PORT = process.env.PORT || 3333
server.listen(PORT, () => {
    console.log("@port", PORT);
});

