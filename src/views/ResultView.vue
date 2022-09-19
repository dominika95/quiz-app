<template>
    <div class="resultPage">
        <p>Your result {{numberOfCorrectlyAnswers}} / {{numberOfQuestions}}</p>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

const store = useStore();
const numberOfQuestions = store.getters.getNumberOfQuestions;
const { numberOfCorrectlyAnswers } = store.getters.getResult;

</script>

<style lang="scss">
  .resultPage {
    width: 60%;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 30px #080808;
    border-radius: 25px;
    background: #13315C;
    color: #b5d1f3;
  }

</style>
