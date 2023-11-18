<template>
  <TimerCount :timer="timer" :showTimer="showTimer"/>

  <div id="header">
    <h3>Correctos : <span style="color: greenyellow;">{{ countGood }}</span></h3>
    <h3>Fallados : <span style="color: red;">{{ countBad }}</span></h3>
  </div>

  <h1 v-if="!pokemon">Cargando...</h1>
  <div v-else>
    <h1>¿Quien es este pokémon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonArr" @selectedPokemon="checkAnswer"/> 

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2> 
    </template>  

    <div v-if="countBad || countGood > 0">
      <button @click="resetCount">
        Reiniciar contadores
      </button> 
    </div> 
  </div>
  
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemonsOptions from '@/helpers/getPokemonOptions';
import TimerCount from '@/components/TimerCount.vue';

export default {
    components :{
        PokemonPicture,
        PokemonOptions,
        TimerCount
    },
    data(){
      return{
        pokemonArr: [],
        pokemon: false,
        showPokemon: false,
        showAnswer: false,
        message: '',
        countGood: 0,
        countBad: 0,
        timer: 3,
        showTimer: false
      }
    },
    methods:{
      async mixPokemonArray(){
        this.pokemonArr = await getPokemonsOptions();
        
        let rndInt = Math.floor(Math.random() *4);
        this.pokemon = this.pokemonArr[rndInt];
      },
      checkAnswer(pokemonId){
        this.showPokemon = true;
        this.showAnswer = true;

        if(pokemonId == this.pokemon.id){
          this.message = 'Correcto adivinaste!!!!';
          this.countGood++;
        }else{
          this.message = `Ohh, fallaste, el pokemon era ${this.pokemon.name}`;
          this.countBad++;
        }
        this.showTimer = true;
        setTimeout(this.newGame, 3000);
      },
      newGame(){
        this.showPokemon = false;
        this.showAnswer = false;
        this.pokemon = false;
        this.pokemonArr = [];
        this.showTimer = false;
        this.timer = 3;
        
        this.mixPokemonArray();
      },
      resetCount(){
        this.countBad = 0;
        this.countGood = 0;
        
        this.newGame();
      }
    },
    mounted(){
      this.mixPokemonArray();
    }
}
</script>

<style>
  #header{
    align-items: center;
    justify-content: center;
    display: flex;
  }

  h3{
    padding: 5px;
  }
</style>