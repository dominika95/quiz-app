import { createStore } from 'vuex';
import type { State } from '../typings/state';
import { fetchQuestions } from './fetchQuestions';
import router from '../router';

export default createStore<State>({
  state: {
    quizConfig: {
      numberOfQuestions: 10,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    },
    questions: [],
    currentPage: 0,
    answer: [],
  },
  getters: {
    getNumberOfQuestions(state) {
      return state.quizConfig.numberOfQuestions;
    },
    getQuestions(state) {
      return state.questions;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    setFormSettings(state, dataProp) {
      const {
        numberOfQuestions, category, difficulty, type,
      } = dataProp;

      state.quizConfig.category = category;
      state.quizConfig.difficulty = difficulty;
      state.quizConfig.type = type;
      state.quizConfig.numberOfQuestions = numberOfQuestions;

      state.answer = [];
      state.currentPage = 0;
      state.questions = [];
    },
    saveQuestions(state, { questions, correctAnswer }) {
      state.questions = questions;

      console.log(state);
    },
    changePage(state, change) {
      const newPage = state.currentPage + change;

      if (newPage >= 0 && newPage <= state.quizConfig.numberOfQuestions - 1) {
        state.currentPage = newPage;
      }
    },
  },
  actions: {
    async fetchData({ state, commit }) {
      commit('saveQuestions', await fetchQuestions({
        category: state.quizConfig.category,
        difficulty: state.quizConfig.difficulty,
        type: state.quizConfig.type,
        numberOfQuestions: state.quizConfig.numberOfQuestions,
      }));

      router.push({ name: 'question' });
    },
  },
  modules: {
  },
});
