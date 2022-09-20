<template>
    <div class="questionForm">
        <ProgressBar/>
        <button
            :class="[currentPage === 0 ? 'disabled': '', 'navigationButton', 'prevButton']"
            @click="prevQuestion">&#8249;
        </button>
        <button
            :class="[currentPage === numberOfQuestions-1 ?
            'disabled': '', 'navigationButton', 'nextButton']"
            @click="nextQuestion">&#8250;
        </button>

        <SingleQuestion/>

        <button
          :class="[currentPage === numberOfQuestions-1 ?
          'showSaveButton' : 'hideSaveButton', 'saveButton']"
          @click="getResult">
          Check result
        </button>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import SingleQuestion from '@/components/SingleQuestion.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { goToStartPage } from '@/helpers';

const store = useStore();

console.log(store.getters.getQuestions, store.getters.getQuestions.length);

if (!store.getters.getQuestions.length) {
  goToStartPage();
}

const numberOfQuestions = store.getters.getNumberOfQuestions;
const currentPage = computed(() => store.getters.getCurrentPage);

const prevQuestion = () => {
  store.commit('changePage', -1);
};

const nextQuestion = () => {
  store.commit('changePage', 1);
};

const getResult = () => {
  store.dispatch('getResult');
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
  color: #efe4b0;

  .hideSaveButton {
    display: none;
  }

  .showSaveButton {
    display: block;
  }

  .navigationButton {
    background-color: transparent;
    border: none;
    font-size: 5em;
    cursor: pointer;

    &:hover {
        color: #efe4b0;
    }
  }

  .disabled {
    opacity: 0.2;
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

  .saveButton {
    color: #efe4b0;
    background: transparent;
    padding: 10px;
    margin: 30px auto;
    border-radius: 25px;
    box-shadow: 0px 0px 5px black;
    cursor: pointer;
    width: 40%;
    color: #0b2545;
    background: #efe4b0;

    &:hover {
      font-weight: bold;
    }
  }
}

@media (max-width: 480px) {
  .questionForm {
    width: 90%;

    .saveButton {
      width: 50%;
    }
  }
}
</style>
