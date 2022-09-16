<template>
    <div class="questionForm">
        <button
            :class="[currentPage === 0 ? 'disabled': '', 'prevButton']"
            @click="prevQuestion">&#8249;
        </button>
        <button
            :class="[currentPage === numberOfQuestions-1 ? 'disabled': '', 'nextButton']"
            @click="nextQuestion">&#8250;
        </button>

        <SingleQuestion/>
        <ProgressBar/>
    </div>
</template>

<script lang="ts" setup>
/* eslint-disable import/no-cycle */
import { useStore } from 'vuex';
import { computed } from 'vue';
import SingleQuestion from '@/components/SingleQuestion.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import router from '../router';

const store = useStore();

if (!store.getters.getQuestions.length) {
  router.push({ name: 'home' });
}

const numberOfQuestions = store.getters.getNumberOfQuestions;
const currentPage = computed(() => store.getters.getCurrentPage);

const prevQuestion = () => {
  store.commit('changePage', -1);
};

const nextQuestion = () => {
  store.commit('changePage', 1);
};

</script>

<style lang="scss">
.questionForm {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 30px #080808;
  border-radius: 25px;
  background: #13315C;
  color: #b5d1f3;

  button {
    background-color: transparent;
    border: none;
    font-size: 5em;
    cursor: pointer;

    &:hover {
        color: #efe4b0;
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: auto;
    &:hover {
        color: black;
    }
  }

  .prevButton {
    float: left;
   }

  .nextButton {
    float: right;
  }
}
</style>
