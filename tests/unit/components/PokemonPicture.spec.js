import {shallowMount} from '@vue/test-utils'
import PokemonPicture from '@/components/PokemonPicture'

describe('PokemonPicture', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(PokemonPicture, {
            props:{
                pokemonId: 1,
                showPokemon: false
            }
        })     
    })
    test('it should match with the snapshot', () => {
        //Arrange
        //Act
        //Assert
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('it should show the pokemon shadow img', () => {
        //Arrange
        //Act
        let [img1, img2] = wrapper.findAll('img');

        //Assert
        expect(img1.exists()).toBeTruthy();
        expect(img2).toBe(undefined);
        expect(img1.classes('hidden-pokemon')).toBe(true);
    })

    test('it should show the pokemon img', () => {
        //Arrange
        let wrapper = shallowMount(PokemonPicture, {
            props:{
                pokemonId: 1,
                showPokemon: true
            }
            
        });
        
        //Act
        let img = wrapper.find('img');

        //Assert
        expect(img.exists()).toBeTruthy();
        expect(img.classes('fade-in')).toBe(true);
    })

    test('it should match de src', () => {
        //Arrange
        let wrapper = shallowMount(PokemonPicture, {
            props:{
                pokemonId: 1,
                showPokemon: true
            }
            
        });

        //Act
        let img = wrapper.find('img');

        //Assert
        expect(img.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
    })
})