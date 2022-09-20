<template>
    <div class="resultPage">
        <p v-if="moreGoodAnswer">Good job!</p>
        <p v-if="!moreGoodAnswer">You fail...</p>
        <PieChart/>

        <div class="resultTime">
          It took you {{time}} to resolve the quiz
        </div>

        <div v-if="prevResultExist">
          <span>Your previous result: </span>
          <span>
            {{previousResult.numberOfCorrectlyAnswers}} / {{previousResult.numberOfQuestions}}
          </span>
          <span> Time: {{prevTime}}</span>
        </div>

        <button class="resultButton" @click="startNewQuiz">Start new QUIZ</button>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import PieChart from '@/components/PieChart.vue';
import { getTime } from '@/helpers/index';
import { goToStartPage } from '@/helpers';

const store = useStore();
const numberOfQuestions = store.getters.getNumberOfQuestions;
const { numberOfCorrectlyAnswers, startTime, endTime } = store.getters.getResult;

const moreGoodAnswer = numberOfQuestions - numberOfCorrectlyAnswers < numberOfCorrectlyAnswers;
const time = getTime(startTime, endTime);

const previousResult = store.getters.getPreviousResult;
const prevResultExist = previousResult.startTime !== 0;
const prevTime = getTime(previousResult.startTime, previousResult.endTime);

const startNewQuiz = () => {
  store.commit('savePreviousResult');

  goToStartPage();
};
</script>

<style lang="scss">
  .resultPage {
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 30px #080808;
    border-radius: 25px;
    background: #13315C;
    color: #efe4b0;

    p {
      font-size: 1.5em;
    }

    .resultTime {
      font-weight: bold;
      font-size: 1.1em;
      margin: 10px;
    }

    .resultButton {
    color: #efe4b0;
    background: transparent;
    padding: 10px;
    margin: 20px;
    border-radius: 25px;
    box-shadow: 0px 0px 5px black;
    border-color: transparent;
    cursor: pointer;

    &:hover {
      color: #0b2545;
      background: #efe4b0;
    }
  }
  }

  @media (max-width: 600px) {
    .resultPage {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .resultPage {
      width: 90%;
    }
  }

</style>
