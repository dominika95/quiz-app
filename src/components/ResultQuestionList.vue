<template>
    <div class="resultList">
        <p>Check your answers:</p>
        <div v-for="question in questions" :key="question.index">
            <span v-html="question.question"></span>
            <span class="answers">
                <span> Answer:
                    <span :class="[
                        thatWasGoodAnswer(correctAnswer(question.index), answer(question.index)) ?
                        'goodAnswer' : 'wrongAnswer'
                        ]"
                        v-html="answer(question.index)">
                    </span>
                </span>
                <span v-if="!thatWasGoodAnswer(
                    correctAnswer(question.index), answer(question.index)
                    )"
                v-html="correctAnswer(question.index)">
                </span>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

const store = useStore();

const questions = store.getters.getQuestions;
const correctAnswers = store.getters.getCorrectAnswers;
const answers = store.getters.getAnswers;

const answer = (index: string):string => answers[index] || '-';
const correctAnswer = (index: string):string => correctAnswers[index];
const thatWasGoodAnswer = (correct: string, myAnswer: string): boolean => correct === myAnswer;
</script>

<style lang="scss">
.resultList {
    text-align: left;
    .answers {
        .goodAnswer {
            color: green;
        }
        .wrongAnswer {
            color: red;
            text-decoration: line-through;
        }
    }
}
</style>
