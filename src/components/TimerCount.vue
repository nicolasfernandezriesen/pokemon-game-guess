<template>
    <div v-if="showTimer">
        <h1>{{ timer }}...</h1>
    </div>
</template>

<script>
import { watch } from 'vue';
export default {
    props:{
        timer:{
            type: Number,
            require: true,
            default: 3
        },
        showTimer:{
            type: Boolean,
            require: true,
            default: false
        }
    },
    watch: {
        timer(value){
            this.showTimer = true;
            this.timer = 3;

            if(value > 0) {
                setTimeout(() => {
                    this.timer--;
                },1000);
            }
        }
    }
}
</script>

<style>

</style>
// startTimer(){
    //   this.showTimer = true;
    //   while(this.timer > 0){
    //     setTimeout(() => {
    //       this.timer--;
    //     }, 1000);
    //   }
    //   this.newGame
    // },