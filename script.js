var socket = io();

var side = 10;
let weath = "summer"
function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");
}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            } else if (obj == 2) {
                fill("yellow");
            } else if (obj == 3) {
                fill("red")
            } else if (obj == 4) {
                fill("#00D5FF")
            }
            else if (obj == 5) {
                fill("#D900FF")
            }
            else if(obj == 6){
                fill("#FFA200")
            }
            else if (obj == 0) {
                fill("grey")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', nkarel)



function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addBird() {
    socket.emit("add bird")
}
function addSnake() {
    socket.emit("add snake")
}
function addLion(){
    socket.emit("add lion")
}