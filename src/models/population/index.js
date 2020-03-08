// @flow

class Population {
    currentPoppulation: Array<Array<number>>;

    constructor(population: Array<Array<number>>) {
        this.currentPoppulation = population;
    }

    tick(): void {
        let newPopulation: Array<Array<number>> = [];

        this.currentPoppulation.map((rows, i) => {
            newPopulation[i] = [];
            rows.map((cell, j) => {
                const aliveNeighbours = this.getAliveNeighbors(i, j);
                newPopulation[i][j] = this.getNextPopulation(cell, aliveNeighbours);
                return null;
            })
            return null;
        })

        this.currentPoppulation = newPopulation;
    }

    getAliveNeighbors(i: number, j: number): number {
        const neighborsIndexs: Array<number> = [-1, 0, 1];
        let aliveNeighbours: number = 0;

        neighborsIndexs.map(x => {
            neighborsIndexs.map(y => {
                aliveNeighbours += this.currentPoppulation[i + x] && this.currentPoppulation[i + x][j + y] ? this.currentPoppulation[i + x][j + y] : 0;
                return null;
            });
            return null;
        });
        aliveNeighbours -= this.currentPoppulation[i][j];

        return aliveNeighbours;
    }

    getNextPopulation(currentCell: number, aliveNeighbours: number): number {
        // Any live cell with fewer than two live neighbours (underpopulation) and more than three live neighbours (overcrowding) dies.
        // Any live cell with two or three live neighbours lives on to the next generation.
        if (currentCell === 1) { 
            return aliveNeighbours === 3 || aliveNeighbours === 2 ? 1 : 0; 
        }

        // Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
        return aliveNeighbours === 3 ? 1 : 0; 
    }
}

export default Population;
