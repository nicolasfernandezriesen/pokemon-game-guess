import { shallowMount } from "@vue/test-utils";
import PokemonOptions from '@/components/PokemonOptions'
import {pokemons} from '../mocks/pokemons.mock'; 

describe ('PokemonOptions', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        });
    });
    test('it should match with the snapshot', () => {
        //Arrange
        //Act
        //Assert
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('it should show the 4 options', () => {
        let lis = wrapper.findAll('li');

        expect(lis.length).toBe(4);

        expect(lis[0].text()).toBe('bulbasaur');
        expect(lis[1].text()).toBe('ivysaur');
        expect(lis[2].text()).toBe('venusaur');
        expect(lis[3].text()).toBe('charmander');
    })

    test('it should emit the event with the correct parameter', () => {
        //Arrange
        let [li1, li2, li3, li4] = wrapper.findAll('li');
        
        //Act
        li1.trigger('click');

        //Assert
        expect(wrapper.emitted('selectedPokemon').length).toBe(1);
        expect(wrapper.emitted('selectedPokemon')[0]).toEqual([1]);
    })
})