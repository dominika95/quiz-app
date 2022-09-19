<template>
    <div class="question">
        <h6 class="category">{{currentQuestion?.category}}</h6>
        <h4 v-html="currentQuestion?.question || ''"></h4>

        <div class="answer" v-for="answer in currentQuestion?.answers" :key="answer" >
            <label :for="answer">
                <input :id="answer"
                    @click="saveAnswer(answer)"
                    type="radio"
                    :value="answer"
                    v-model="picked">
                {{answer}}
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();

const currentQuestion = computed(() => store.getters.getCurrentQuestion);

const picked = computed(() => store.getters.getCurrentAnswer);

const saveAnswer = (answer: string) => {
  store.commit('saveAnswer', answer);
};
</script>

<style lang="scss">
  .question {
    .category {
        text-transform: uppercase;
    }

    .answer {
        label {
            cursor: pointer;
        }
    }
  }

</style>
