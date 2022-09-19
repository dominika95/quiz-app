<template>
    <div class='quizForm'>
      <h2>Please, set configuration of your quiz</h2>

      <div class="quizFormInput" >
        <label for="numberOfQuestion">
          <span>Number of question:</span>
          <select v-model="numberOfQuestion">
            <option v-for="n in maxNumberOfQuestion"
                :key="n"
                :value="n">
                {{ n }}
            </option>
          </select>
        </label>
      </div>

      <div class="quizFormInput">
        <label for="selectedCategory">
          <span>Select category:</span>
          <select v-model="selectedCategory">
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
        <label for="selectedType">
          <span>Select type:</span>
          <select v-model="selectedType">
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
import { useStore } from 'vuex';
import type { SelectList, CategoriesList } from '../typings/form';

const numberOfQuestion = ref<number>(10);
const maxNumberOfQuestion = 50;

const difficulties:SelectList[] = [{ id: 'any', label: 'Any dificulty' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }];
const selectedDifficulty = ref<string>(difficulties[0].id);

const types:SelectList[] = [{ id: 'any', label: 'Any type' }, { id: 'multiple', label: 'Multiple choice' }, { id: 'boolean', label: 'True / false' }];
const selectedType = ref<string>(types[0].id);

const categories = ref<CategoriesList[]>([]);
const selectedCategory = ref<string>('any');

const store = useStore();

const startQuiz = () => {
  console.log(selectedCategory, selectedType, selectedDifficulty, numberOfQuestion);

  store.commit('setFormSettings', {
    numberOfQuestions: numberOfQuestion,
    category: selectedCategory,
    difficulty: selectedDifficulty,
    type: selectedType,
  });

  store.dispatch('fetchData');
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
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 30px #080808;
  border-radius: 25px;
  background: #13315C;
  color: #efe4b0;

  h2 {
    margin-top: 0;
  }

  .quizFormInput {
    padding: 10px;

    label {
      margin: 10px;
      text-transform: uppercase;
      color: #efe4b0;
      font-size: 0.8em;
      display: block;
      width: 40%;
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
        color: white;
        margin-top: 5px;
      }
    }
    }

  .quizFormButton {
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

@media (max-width: 480px) {
  .quizForm {
    width: 90%;

    .quizFormInput {
      label {
        width: 90%
      }
    }
  }
}
</style>
