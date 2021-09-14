class Grass extends LivingCreature {
  
    mull() {
        
        this.multiply++;
        var emptyCells = this.chooselCell(0);
        var newCell = random(emptyCells);
        if (this.multiply >= 8 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = this.id
            var newGrass = new Grass(newX, newY, this.id)
            grassArr.push(newGrass)
            this.multiply = 0
        }
    }
}

