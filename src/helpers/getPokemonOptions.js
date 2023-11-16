import { _ } from "core-js";
import pokemonApi from "@/api/pokemonApi";

export const getPokemons = () =>{   
    let pokemonsArr = Array.from(Array(650));

    return pokemonsArr.map((_, index) => index + 1);
}

export const mixsPokemos = (arr = []) => {       
    return arr.sort(() => Math.random() - 0.5);
}

const getPokemonOptions = async () => { 
    let mixedPokemons = mixsPokemos(getPokemons()); 
    let pokemons = await getPokemonsName(mixedPokemons.splice(0, 4));
    
    return pokemons;
}

export const getPokemonsName = async([pokemon1, pokemon2, pokemon3, pokemon4] = []) => {
    const promiseArr = [
        pokemonApi.get(`/${pokemon1}`),
        pokemonApi.get(`/${pokemon2}`),
        pokemonApi.get(`/${pokemon3}`),
        pokemonApi.get(`/${pokemon4}`) 
    ];
    const [poke1, poke2, poke3, poke4] = await Promise.all(promiseArr);

    return [
        {name: poke1.data.name, id: poke1.data.id},
        {name: poke2.data.name, id: poke2.data.id},
        {name: poke3.data.name, id: poke3.data.id},
        {name: poke4.data.name, id: poke4.data.id}
    ]
}

export default getPokemonOptions;