//@flow

const buildPopulation = (width: number, height: number): Array<Array<number>> => {
    let population: Array<Array<number>> = [];

    for (let i: number = 0; i < height; i++) 
    {
        population[i] = [];
        for (let j: number = 0; j < width; j++) 
        { 
            population[i][j] = Math.round(Math.random());
        }
    }

    return population;
}

export default buildPopulation;