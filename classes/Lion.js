let LivingCreature = require('../LivingCreature')

module.exports = class Lion extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 5
        this.multiply = 4
    }
    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 17 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1]

            matrix[newY][newX] = 6
            var newLion = new Lion(newX, newY, 6)
            lionArr.push(newLion)

            this.energy = 6
            if (weath == "winter") {
                this.energy -= 5;
                this.multiply -= 5;
            }
            if (weath == "summer") {
                this.energy += 1;
                this.multiply += 1;
            }
        }
    }
    move() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiply--


            this.energy--

        }
        this.die();
    }
    eat() {
        var grassEaterCells = super.chooseCell(2);
        var predatorCells = super.chooseCell(3)
        var birdCells = super.chooseCell(4)
        var snakeCells = super.chooseCell(5)
        
        let arr1 = grassEaterCells.concat(predatorCells)
        let arr2 = arr1.concat(birdCells)
        let allClass = arr2.concat(snakeCells)

        var newCell = allClass[Math.floor(Math.random() * allClass.length)]

        if (this.energy > 0 && newCell) {
          
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (var i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                }
            }
            for (var i in birdArr) {
                if (birdArr[i].x == newX && birdArr[i].y == newY) {
                    birdArr.splice(i, 1)
                }
            }
            for (var i in snakeArr) {
                if (snakeArr[i].x == newX && snakeArr[i].y == newY) {
                   snakeArr.splice(i, 1)
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

            for (var i in grassEaterArr) {
                if (lionArr[i].x == this.x && lionArr[i].y == this.y) {
                    lionArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}