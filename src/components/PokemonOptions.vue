<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id"
      @click="$emit('selectedPokemon', pokemon.id)">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  ul {
      list-style-type: none;
  }
  li {
      background-color: rgb(93, 50, 248);
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;
      margin-bottom: 10px;
      width: 250px;
      color: black;
  }

  li:hover {
      background-color: rgba(89, 46, 246, 0.652);
  }

  .options-container {
      display: flex;
      justify-content: center;
  }
</style>