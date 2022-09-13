<template>
    <div class='quizForm'>
      <h2>Please, set configuration of your quiz</h2>

      <div class="quizFormInput" >
        <label for="numberOfQuestion">
          <span>Number of question:</span>
          <select v-model="defaultNumberOfQuestion">
            <option v-for="n in maxNumberOfQuestion"
                :key="n"
                :value="n">
                {{ n }}
            </option>
          </select>
        </label>
      </div>

      <div class="quizFormInput">
        <label for="defaultCategory">
          <span>Select category:</span>
          <select v-model="defaultCategory">
            <option value="any">Any category</option>
            <option v-for="option in categories"
                :key="option.id"
                :value="option.id">
                {{ option.name }}
            </option>
          </select>
      </label>
      </div>

      <div  class="quizFormInput">
        <label for="selectedDifficulty">
          <span>Select difficulty:</span>
          <select v-model="selectedDifficulty">
            <option v-for="option in difficulties"
                :key="option.id"
                :value="option.id">
                {{ option.label }}
            </option>
          </select>
        </label>
      </div>

      <div class="quizFormInput">
        <label for="defaultType">
          <span>Select type:</span>
          <select v-model="defaultType">
            <option v-for="option in types"
                :key="option.id"
                :value="option.id">
                {{ option.label }}
            </option>
          </select>
        </label>
      </div>

      <button class="quizFormButton" @click="startQuiz">Let's start the QUIZ!</button>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { selectList, categoriesList } from '../typings/form';

const defaultNumberOfQuestion = ref<number>(10);
const maxNumberOfQuestion = 50;

const difficulties:selectList[] = [{ id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }];
const selectedDifficulty = ref<string>(difficulties[0].id);

const types:selectList[] = [{ id: 'any', label: 'Any type' }, { id: 'multiple', label: 'Multiple choice' }, { id: 'boolean', label: 'True / false' }];
const defaultType = ref<string>(types[0].id);

const categories = ref<categoriesList[]>([]);
const defaultCategory = ref<string>('any');

const startQuiz = () => {
  console.log(defaultCategory, defaultType);
};

onMounted(() => {
  axios.get('https://opentdb.com/api_category.php')
    .then((response) => {
      categories.value = response.data.trivia_categories;
    });
});

</script>

<style lang="scss" scoped>
.quizForm {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 30px #080808;
  border-radius: 25px;
  background: #13315C;
  color: #b5d1f3;

  h2 {
    margin-top: 0;
  }

  .quizFormInput {
    padding: 10px;

    label {
      margin: 10px;
      text-transform: uppercase;
      color: #b5d1f3;
      font-size: 0.8em;
      display: block;
      width: 30%;
      margin: auto;
      text-align: left;

      span {
        padding: 8px;
      }

      select {
        background: #0b2545;
        border-radius: 25px;
        border-color: black;
        display: block;
        width: 100%;
        padding: 5px;
        color: #EEF4ED;
        margin-top: 5px;
      }
    }
    }

  .quizFormButton {
    color: #EEF4ED;
    background: transparent;
    padding: 10px;
    margin: 20px;
    border-radius: 25px;
    box-shadow: 0px 0px 5px black;
    cursor: pointer;
  }
}
</style>
