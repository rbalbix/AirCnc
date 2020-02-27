const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

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

app.use(cors());
app.use(express.json());
app.use(routes);

// Verify the environment
const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
    console.log("@port", PORT);
});

