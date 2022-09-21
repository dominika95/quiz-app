import { createStore } from 'vuex';
import { fetchQuestions } from '@/helpers/fetchQuestions';
import router from '@/router';
import type { State } from '@/typings/state';

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
      startTime: 0,
      endTime: 0,
    },
    previousResult: {
      numberOfCorrectlyAnswers: 0,
      numberOfQuestions: 0,
      startTime: 0,
      endTime: 0,
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
    getPreviousResult(state) {
      return state.previousResult;
    },
    getAnswers(state) {
      return state.answer;
    },
    getCorrectAnswers(state) {
      return state.correctAnswer;
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

      state.result.startTime = new Date().getTime();

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
    saveResult(state, { numberOfCorrectlyAnswers, endTime }) {
      state.result.numberOfCorrectlyAnswers = numberOfCorrectlyAnswers;
      state.result.endTime = endTime;
    },
    reset(state) {
      state.answer = [];
      state.currentPage = 0;
      state.questions = [];
      state.correctAnswer = [];
    },
    savePreviousResult(state) {
      state.previousResult = Object.assign({}, {
        numberOfCorrectlyAnswers: state.result.numberOfCorrectlyAnswers,
        numberOfQuestions: state.quizConfig.numberOfQuestions,
        startTime: state.result.startTime,
        endTime: state.result.endTime,
      });
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
      const endTime = new Date().getTime();
      let numberOfCorrectlyAnswers = 0;
      state.correctAnswer.forEach((value, index) => {
        if (value === state.answer[index]) {
          numberOfCorrectlyAnswers += 1;
        }
      });

      commit('saveResult', {
        numberOfCorrectlyAnswers,
        endTime,
      });

      router.push({ name: 'result' });
    },
  },
  modules: {
  },
});
