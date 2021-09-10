class Snake {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.getNewCoordinates();
        this.getNewCoordinatesdie();

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

    chooselCell(character) {
        this.getNewCoordinates();
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

        var emptyCellsMul = this.chooselCell(0)
        var newCell = random(emptyCellsMul)

        var newCell = random(emptyCellsMul)

        var newX = newCell[0];
        var newY = newCell[1]

        var newSnake = new Snake(newX, newY, 4)
        snakeArr.push(newSnake)
        matrix[newY][newX] = 4;



    }
    move() {
        var emptyCells = this.chooselCell(0);
        var emptyCellsDie = this.chooselCellDie(1)
        var newCell = random(emptyCells)
        this.multiplay++
        if (newCell && emptyCellsDie[0]) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
        else if (emptyCellsDie[0] == undefined) {
            this.die();
        }
    }
    eat() {

        var emptyCells = this.chooselCell(2);
        var emptyCellspredator = this.chooselCell(3)

        for (var i in emptyCellspredator) {
            emptyCells.push(emptyCellspredator[i])
        }
        var newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {

                    grassEaterArr.splice(i, 1)
                    break;

                }
            }
            for (var i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)

                }
            }

            var emptyCells = this.chooselCell(4);
            var emptyCellsMul = this.chooselCell(0)
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


