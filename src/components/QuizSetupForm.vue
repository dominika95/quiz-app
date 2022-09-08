<template>
    <div>
      <p>Please, set configuration of your quiz</p>

      <label for="numberOfQuestion">
        Number of question
        <input type="number" v-model="defaultNumberOfQuestion"
        id="numberOfQuestion" min="1" max="50">
      </label>

      <span>Select category:</span>
      <select v-model="defaultCategory">
        <option value="any">Any category</option>
        <option v-for="option in categories"
            :key="option.id"
            :value="option.id">
            {{ option.name }}
        </option>
      </select>

      <span>Select difficulty:</span>
      <select v-model="selectedDifficulty">
        <option v-for="option in difficulties"
            :key="option.id"
            :value="option.id">
            {{ option.label }}
        </option>
      </select>

      <span>Select type:</span>
      <select v-model="defaultType">
        <option v-for="option in types"
            :key="option.id"
            :value="option.id">
            {{ option.label }}
        </option>
      </select>

      <button @click="startQuiz">Let's start the QUIZ!</button>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const defaultNumberOfQuestion = ref(10);

const difficulties = [{ id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }];
const selectedDifficulty = ref(difficulties[0].id);

const types = [{ id: 'any', label: 'Any type' }, { id: 'multiple', label: 'Multiple choice' }, { id: 'boolean', label: 'True / false' }];
const defaultType = ref(types[0].id);

const categories = ref([]);
const defaultCategory = ref('any');

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
