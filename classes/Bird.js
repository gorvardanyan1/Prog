let LivingCreature = require('../LivingCreature')

module.exports = class Bird extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 12;
        this.multiplay = 0

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3],
            [this.x - 4, this.y - 4],
            [this.x, this.y - 4],
            [this.x + 4, this.y - 4],
            [this.x - 4, this.y],
            [this.x + 4, this.y],
            [this.x - 4, this.y + 4],
            [this.x, this.y + 4],
            [this.x + 4, this.y + 4]
        ];
    }


    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 10) {
            var newX = newCell[0];
            var newY = newCell[1]

            matrix[newY][newX] = 4
            var newBird = new Bird(newX, newY, 4)
            birdArr.push(newBird)

            this.multiplay = 0
            this.energy = 12
        }
        if(weath == "winter"){
            this.energy -= 5;
            this.multiply -= 5
        }
        if(weath == "summer"){
            this.energy += 4;
            this.multiply += 4
        }
    }
    move() {
        var emptyCells = super.chooseCell(0);
        var newCell =emptyCells[Math.floor(Math.random() * emptyCells.length)]
        /// energ , multi
        this.energy--
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] =  matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiplay = 0

        }
        this.die();
    }
    eat() {
        var snakeCells = super.chooseCell(5);
        var newCell = snakeCells[Math.floor(Math.random() * snakeCells.length)]
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiplay = 0
            for (var i in snakeArr) {
                if (snakeArr[i].x == newX && snakeArr[i].y == newY) {
                    snakeArr.splice(i, 1)
                    break;
                }
            }
            this.energy++;
            this.mul();
        } else {
            this.move();
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in birdArr) {
                if (birdArr[i].x == this.x && birdArr[i].y == this.y) {
                    birdArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}