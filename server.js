var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");




app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = []
birdArr = []
snakeArr = []
lionArr = []
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./classes/Grass")
GrassEater = require("./classes/GrassEater")
Predator = require("./classes/Predator")
Bird = require("./classes/Bird")
Snake = require("./classes/Snake")
Lion = require("./classes/Lion")

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 7))

    }
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                predatorArr.push(new Predator(x, y, 3))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                birdArr.push(new Bird(x, y, 4))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                snakeArr.push(new Snake(x, y, 5))
            }
            else if (matrix[y][x] == 6) {
                matrix[y][x] = 6
                lionArr.push(new Lion(x, y, 6))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in birdArr) {
        birdArr[i].eat()
    }
    for (var i in snakeArr) {
        snakeArr[i].eat()
    }
    for (var i in lionArr) {
        lionArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    birdArr = []
    snakeArr = []
    lionArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addBird() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            birdArr.push(new Bird(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addSnake() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            snakeArr.push(new Snake(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addLion() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            lionArr.push(new Lion(x, y, 6))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
///new
function lightning() {
    let randomNum1 = Math.floor(Math.random() * matrix.length)
    let randomNum2 = Math.floor(Math.random() * matrix.length)
    
   
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 7000);



////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add bird", addBird)
    socket.on("add snake", addSnake)
    socket.on("add lion", addLion)
    socket.on("createLightning", lightning)
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predatorArr = predatorArr.length;
    statistics.birdArr = birdArr.length;
    statistics.snakeArr = snakeArr.length;
    statistics.lionArr = lionArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)
