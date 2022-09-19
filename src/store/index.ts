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
    correctAnswer: [],
    result: {
      numberOfCorrectlyAnswers: 0,
    },
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
    getCurrentQuestion(state) {
      return state.questions[state.currentPage];
    },
    getResult(state) {
      return state.result;
    },
    getCurrentAnswer(state) {
      return state.answer[state.currentPage];
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
      state.correctAnswer = correctAnswer;
    },
    changePage(state, change) {
      const newPage = state.currentPage + change;

      if (newPage >= 0 && newPage <= state.quizConfig.numberOfQuestions - 1) {
        state.currentPage = newPage;
      }
    },
    saveAnswer(state, change: string) {
      state.answer[state.currentPage] = change;
    },
    saveResult(state, { numberOfCorrectlyAnswers }) {
      state.result = {
        numberOfCorrectlyAnswers,
      };
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
    getResult({ state, commit }) {
      let numberOfCorrectlyAnswers = 0;
      state.correctAnswer.forEach((value, index) => {
        if (value === state.answer[index]) {
          numberOfCorrectlyAnswers += 1;
        }
      });

      commit('saveResult', {
        numberOfCorrectlyAnswers,
      });

      router.push({ name: 'result' });
    },
  },
  modules: {
  },
});
