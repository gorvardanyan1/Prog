let LivingCreature = require('../LivingCreature')

module.exports =  class Predator extends LivingCreature {
    constructor(x, y, id) {
      super(x,y,id)
        this.energy = 5
        this.multiply = 4
    }
    
    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 12 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1]

            matrix[newY][newX] = 3
            var newPredator = new Predator(newX, newY, 3)
            predatorArr.push(newPredator)

           this.energy = 6
        }
        if(weath == "winter"){
            this.energy -= 2;
            this.multiply -= 2
        }
        if(weath == "summer"){
            this.energy += 1;
            this.multiply += 1
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
        // var emptyCellsBird = this.chooselCell(5)
        // for (var i in emptyCellsBird) {
        //     emptyCells.push(emptyCellsBird[i])
        // }
        var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]

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
           /*  for (var i in birdArr) {
                if (birdArr[i].x == newX && birdArr[i].y == newY) {
                    birdArr.splice(i, 1)
                    break;
                }
            } */
            this.energy++;
            this.mul();
            ////
        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1
            var x = this.x
            var y = this.y
            var newGrass = new Grass(x, y, 1);
            grassArr.push(newGrass)

            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
