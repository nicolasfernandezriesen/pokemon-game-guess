import pokemonApi from "@/api/pokemonApi"

describe('pokemonApi', () => {
    test('axios sould be config with the API pokemon', () => {
        //Arrange

        //Act

        //Assert
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    })
})