<template>
  <div v-if="showTimer">
        <h1>{{ timer }}...</h1>
  </div>

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
      <div id="container-answer">
        <img v-if="this.pikachuAnswer" src="../img/pikachuGood.png" alt="pikachu" width="150" height="150">
        <img v-else src="../img/pikachuBad.png" alt="pikachu" width="150" height="150">

        <h2 id="message-answer" class="fade-in">{{ message }}</h2> 
      </div>
    </template>  

    <div v-if="countBad || countGood > 0">
      <button id="reset" @click="resetCount">
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
        pikachuAnswer: false,
        countGood: 0,
        countBad: 0,
        timer: 3,
        showTimer: false,
        timerEnable: false
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
          this.pikachuAnswer = true;

        }else{
          this.message = `Ohh, fallaste, el pokemon era ${this.pokemon.name}`;
          this.countBad++;
          this.pikachuAnswer = false;
        }
        this.timerEnable = true;
        
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
    },
    watch:{
      timerEnable(value){
        this.showTimer = true;
        if(value){
          setTimeout(() => {
            this.timer--;
          },1000);
        }
      },
      timer(value){
        if(value > 0 && this.timerEnable){
          setTimeout(() => {
            this.timer--;
          },1000);
        }else{
          this.timerEnable = false;
          this.newGame();
        }
      }
    }
}
</script>

<style scoped>
  #header{
    align-items: center;
    justify-content: center;
    display: flex;
  }

  div{
    color: black;
  }

  h3{
    padding: 5px;
  }

  #reset{
    background-color: rgb(93, 50, 248);
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: black;
  }

  #reset:hover {
      background-color: rgba(89, 46, 246, 0.652);
  }
</style>