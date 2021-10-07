let LivingCreature = require('../LivingCreature')

module.exports = class Snake extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
       
    }

    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
        ];
    }
    getNewCoordinatesdie() {
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
            [this.x + 2, this.y + 2]
        ];
    }
    chooselCellDie(character) {
        this.getNewCoordinatesdie()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1]
            matrix[newY][newX] = 5
            var newSnake = new Snake(newX, newY, 2)
            grassEaterArr.push(newSnake)
            
        }

    }
    move() {

        var emptyCells = super.chooseCell(0);
        var emptyCellsDie = this.chooselCellDie(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if ( newCell && emptyCellsDie[0]) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

           
        }
        else if (emptyCellsDie[0] == undefined) {
            this.die();
        }

    }
    eat() {
        var predatorCells = super.chooseCell(3);
        var emptyCell = this.chooseCell(2)
        var emptyCells = predatorCells.concat(emptyCell)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        
       
        if ( newCell) {
            var newX = newCell[0]
            var newY = newCell[1]


            matrix[newY][newX] = 4
           
            matrix[this.y][this.x] = 0



            this.x = newX
            this.y = newY

            for (var i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                    break;

                }
            }
             
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {

                    grassEaterArr.splice(i, 1)
                    break;

                }
            }
           
            var emptyCells = this.chooseCell(4);
            var emptyCellsMul = this.chooseCell(0)
            if (emptyCells[0] && emptyCellsMul[0]) {
                this.mul();
            }

            

        } else {
            this.move();
        }
    }
    die() {

        matrix[this.y][this.x] = 0

        for (var i in snakeArr) {
            if (snakeArr[i].x == this.x && snakeArr[i].y == this.y) {
                snakeArr.splice(i, 1);
                break;
            }
        }

    }
}
