import getPokemonOptions, { getPokemons, getPokemonsName } from "@/helpers/getPokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe('getPokemonOptions', () => {
    test('it should return arr[650]',() => {
        //Arrange
        const pokemons = getPokemons();
        //Act

        //Assert
        expect(pokemons.length).toBe(650);
    })

    test('it should return an array[4] with names of pokemons', async() => {
        //Arrange
        let pokemonArr;
        //Act
        pokemonArr = await getPokemonsName([1,2,3,4]);
        //Assert
        expect(pokemonArr).toStrictEqual(pokemons);
    })

    test('it should return array mixed', async() => {
        //Arrange
        let pokemons
        //Act
        pokemons = await getPokemonOptions();
        //Assert
        expect(pokemons.length).toBe(4);
        expect
        (pokemons).toEqual([
            { 
                name: expect.any(String), 
                id: expect.any(Number)
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            {                 
                name: expect.any(String), 
                id: expect.any(Number)
            },
            {            
                name: expect.any(String), 
                id: expect.any(Number)
            }
          ]);
    })

})