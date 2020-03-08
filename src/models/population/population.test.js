import Population from './index.js';
import randomBuilder from './randomBuilder';

describe('Successfully create population with random source', () => {
    const width = 3;
    const height = 3;
    const population = new Population(randomBuilder(width, height));

    it('Check size of grid', () => {
        expect(population.currentPoppulation.length).toBe(width);
        population.currentPoppulation.map(rows => {
            expect(rows.length).toBe(height);
        })
    });

    it('Check values of cells', () => {
        population.currentPoppulation.map(rows => {
            rows.map(cell => {
                expect(cell === 0 || cell === 1).toBeTruthy();
            })
        })
    })
});

describe('Test rules of tick', () => {
    it('Check rule "Any live cell with fewer than two live neighbours dies (underpopulation)."', () => {
        const startPopulation = [
            [0, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
        ];
        const population = new Population(startPopulation);
        population.tick();

        population.currentPoppulation.map(rows => {
            rows.map(cell => {
                expect(cell).toBe(0);
            })
        })
    });

    it('Check rule "Any live cell with two or three live neighbours lives on to the next generation."', () => {
        const startPopulation = [
            [0, 1, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
        ];
        const nextAlivePoulationIndexes = [
            [0, 1],
            [1, 4],
        ];
        const population = new Population(startPopulation);
        population.tick();

        nextAlivePoulationIndexes.map(indexes => {
            expect(population.currentPoppulation[indexes[0]][indexes[1]]).toBe(1);
        })
    });

    it('Check rule "Any live cell with more than three live neighbours dies (overcrowding)."', () => {
        const startPopulation = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ];

        const resultPopulation = [
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1]
        ];
        const population = new Population(startPopulation);
        population.tick();

        population.currentPoppulation.map((row, index) => {
            expect(row).toEqual(resultPopulation[index]);
        })
    });

    it('Check rule "Any dead cell with exactly three live neighbours becomes a live cell (reproduction)."', () => {
        const startPopulation = [
            [1, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 1, 1, 0],
        ];

        const nextAlivePoulationIndexes = [1, 3];
        const population = new Population(startPopulation);
        population.tick();

        expect(population.currentPoppulation[nextAlivePoulationIndexes[0]][nextAlivePoulationIndexes[1]]).toBe(1);
    });
});


test('Successfully tick more than n times', () => {
    const startPopulation = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    const nextPopulation = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    const population = new Population(startPopulation);

    for (let i = 1; i < 15; i++) {
        population.tick();
        population.currentPoppulation.map((row, index) => {
            expect(row).toEqual(i % 2 ? nextPopulation[index] : startPopulation[index]);
        })
    }
})