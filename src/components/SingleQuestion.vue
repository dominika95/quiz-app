<template>
    <div class="question">
        <p class="category">{{currentQuestion?.category}}</p>
        <p class="categoryQuestion" v-html="currentQuestion?.question || ''"></p>

        <div
            v-for="answer in currentQuestion?.answers"
            :class="[picked === answer ? 'choosenAnswer' : '', 'answer']"
            :key="answer"
            v-on:click="saveAnswer(answer)"
            v-html="answer">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const currentQuestion = computed(() => store.getters.getCurrentQuestion);

const picked = computed(() => store.getters.getCurrentAnswer);

const saveAnswer = (answer: string) => {
  store.commit('saveAnswer', answer);
  store.commit('changePage', 1);
};
</script>

<style lang="scss">
  .question {
    .category {
        text-transform: uppercase;
        margin-bottom: 0;
        font-size: 0.9em;
    }
    .categoryQuestion {
        font-size: 1.5em;
    }

    .answer {
        cursor: pointer;
        border-radius: 10px;
        padding: 10px;
        border-color: black;
        border-style: solid;
        width: 50%;
        margin: 10px auto;

        &:hover {
            color: #13315C;
            background-color: #efe4b0;
        }
    }

    .choosenAnswer {
        color: #13315C;
        background-color: #efe4b0;
    }
  }

  @media (max-width: 480px) {
    .question {
      .answer {
        width:70%;
        font-size: 0.8em;
      }
      .category {
        font-size: 0.8em;
    }
    .categoryQuestion {
        font-size: 1.1em;
    }
    }
}

</style>
