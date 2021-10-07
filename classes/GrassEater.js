let LivingCreature = require('../LivingCreature')


module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 8;

    }



    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
       
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1]
            matrix[newY][newX] = 2
            var newGrassEater = new GrassEater(newX, newY, 2)
            grassEaterArr.push(newGrassEater)
            this.energy = 6
        }
        if (weath == "winter") {
            this.energy -= 4;
            this.multiply -= 4;
        }
        if (weath == "summer") {
            this.energy += 2;
            this.multiply += 2;
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

            this.energy--
        }
      
        this.die();
    }
    eat() {
        var grassCells = super.chooseCell(1);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]



            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    break;

                }
            }

            this.x = newX
            this.y = newY

            this.energy++;

            if (this.energy >= 12) {
                this.mul();
                this.energy = 8
            }

        } else {
            this.move();
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}