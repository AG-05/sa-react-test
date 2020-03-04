// @flow

class Population {
    height: number;
    width: number;
    currentPoppulation: Array<Array<number>>;

    constructor(width: number, height: number, source: (x: number, y: number) => number) {
        this.width = width;
        this.height = height;
        this.currentPoppulation = [];
        for (let i: number = 0; i < this.height; i++) 
        {
            this.currentPoppulation[i] = [];
            for (let j: number = 0; j < this.width; j++) 
            { 
                this.currentPoppulation[i][j] = source(i, j);
            } 
        } 
    }

    tick() {
        let newPopulation: Array<Array<number>> = [];
        const neighborsIndexs: Array<number> = [-1, 0, 1];

        for (let i: number = 0; i < this.height; i++) 
        {
            newPopulation[i] = [];
            for (let j: number = 0; j < this.width; j++) 
            {
                let aliveNeighbours: number = 0;
                neighborsIndexs.map(x => {
                    neighborsIndexs.map(y => {
                        aliveNeighbours += this.currentPoppulation[i + x] && this.currentPoppulation[i + x][j + y] ? this.currentPoppulation[i + x][j + y] : 0;
                    });
                });
                aliveNeighbours -= this.currentPoppulation[i][j];
                // Any live cell with fewer than two live neighbours (underpopulation) and more than three live neighbours (overcrowding) dies.
                // Any live cell with two or three live neighbours lives on to the next generation.
                if ((this.currentPoppulation[i][j] == 1)) { 
                    newPopulation[i][j] = aliveNeighbours === 3 || aliveNeighbours === 2 ? 1 : 0; 
                } else { // Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
                    newPopulation[i][j] = aliveNeighbours === 3 ? 1 : 0; 
                }
            } 
        } 
        this.currentPoppulation = newPopulation;
    }
}

export default Population;
