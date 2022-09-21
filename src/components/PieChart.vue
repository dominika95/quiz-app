<template>
    <div class="resultPieChart">
        <Pie :chartData="chartData" :chartOptions="chartOptions"/>
    </div>
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import { useStore } from 'vuex';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const store = useStore();
const numberOfQuestions = store.getters.getNumberOfQuestions;
const { numberOfCorrectlyAnswers } = store.getters.getResult;
const numberOfWrongAnswers = numberOfQuestions - numberOfCorrectlyAnswers;

const chartData = {
  labels: [`Good answers (${numberOfCorrectlyAnswers})`, `Wrong answers (${numberOfWrongAnswers})`],
  datasets: [{
    backgroundColor: ['#42824B', '#AB2929'],
    data: [
      numberOfCorrectlyAnswers / numberOfQuestions,
      numberOfWrongAnswers / numberOfQuestions,
    ],
  }],
};

const chartOptions = {
  borderColor: 'black',
  color: '#efe4b0',
  size: 20,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 15,
        },
      },
    },
  },
};

</script>

<style lang="scss">
.resultPieChart {
    width: 40%;
    margin: 0 auto;
}

@media (max-width: 760px) {
    .resultPieChart {
      width: 50%;
    }
}

@media (max-width: 480px) {
    .resultPieChart {
      width: 100%;
    }
}
</style>
