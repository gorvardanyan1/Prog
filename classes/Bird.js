class Bird {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 12;
        this.multiplay = 0
        this.getNewCoordinates();
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

    mul() {
        var emptyCells = this.chooselCell(0);
        var newCell = random(emptyCells)
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 10) {
            var newX = newCell[0];
            var newY = newCell[1]

            var newBird = new Bird(newX, newY, this.id)
            birdArr.push(newBird)
            matrix[newY][newX] = this.id;
            this.multiplay = 0
            this.energy = 12
        }
    }
    move() {
        var emptyCells = this.chooselCell(0);
        var newCell = random(emptyCells)
        this.energy--
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiplay = 0

        }
        this.die();
    }
    eat() {
        var emptyCells = this.chooselCell(4);
        var newCell = random(emptyCells)
        this.multiplay++
        if (newCell && this.multiplay > 2 && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
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