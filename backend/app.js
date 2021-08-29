const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');
const cors = require('cors');
const routes = require('./routes/routes');
const morgan=require('morgan');

const app = express();
const server = http.createServer(app);
const io = module.exports.io = socket(server);
app.use(morgan('tiny'));
app.use([
    cors(),
    express.static("public"),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    routes
]);

//app.use('/', routes);

mongoose.connect('mongodb+srv://Yash:sedlyf1234@communicationprojectdb.yliul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost:27017/chatDB',{useNewUrlParser: true, useUnifiedTopology: true});

const socketManager = require('./controllers/socket');
//const io = socket(server);

io.on('connection', socketManager);
// module.exports = io;

server.listen("5000", function (req, res) {
    console.log("Server is running on port 5000.");
});
