import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";

describe('PokemonPage', () => {
    let wrapper;
    let mixPokemonArraySpy;
    
    beforeEach(() => {
        mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');       
        wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    countGood: 0,
                    countBad: 0
                }
            }
        })
    })

    afterEach(() => {
       jest.clearAllMocks(); 
    })

    test('it should match with the snapshot without pokemon', () =>{
        let wrapper = shallowMount(PokemonPage);

        expect(wrapper.html).toMatchSnapshot();
    })

    test('it should match with the snapshot without pokemon', () =>{
        expect(wrapper.html).toMatchSnapshot();
    })

    test('it should call mixPokemonArray', () => {
        expect(mixPokemonArraySpy).toHaveBeenCalled();    
    })

    test('it should show the component from PokemonPicture & PokemonOptions', () => {
        let picture = wrapper.find('pokemon-picture-stub');
        let options = wrapper.find('pokemon-options-stub');

        expect(picture.exists()).toBeTruthy();
        expect(options.exists()).toBeTruthy();  
  
        expect(picture.attributes('pokemonid')).toBe("1"); 
        expect(options.attributes('pokemons')).toBeTruthy();
    })

    test('it should show the msg for the bad & good answer', async() => {
        await wrapper.vm.checkAnswer(1);
        let goodChoice = wrapper.vm.message;
        
        await wrapper.vm.checkAnswer(5);
        let badChoice = wrapper.vm.message;

        expect(wrapper.find('h2')).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBe(true);
        expect(goodChoice).toBe('Correcto adivinaste!!!!');
        expect(badChoice).toBe(`Ohh, fallaste, el pokemon era ${pokemons[0].name}`);
    })

    test('it should increased the good & bad count according to the answer', async() => {
        await wrapper.vm.checkAnswer(1);
        await wrapper.vm.checkAnswer(1);
        let countGood = wrapper.vm.countGood;

        await wrapper.vm.checkAnswer(5);
        let countBad = wrapper.vm.countBad;

        expect(countGood).toBe(2);
        expect(countBad).toBe(1);
    })
})