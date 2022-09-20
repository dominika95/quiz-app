/*eslint-disable*/
import axios from 'axios';
import { getURL } from '@/helpers';

function parseData(data: ResponseData): {
    questions: ParseQuestion[],
    correctAnswer: string[]
} {
  const questions = data.data.results;
  const correctAnswer: string[] = [];
  const parseQuestion: ParseQuestion[] = [];

  questions.forEach(({
    category, correct_answer, difficulty, incorrect_answers, question, type,
  }) => {
    correctAnswer.push(correct_answer);
    parseQuestion.push({
      category,
      difficulty,
      answers: incorrect_answers.concat(correct_answer).sort(),
      question,
      type,
    });
  });

  return {
    questions: parseQuestion,
    correctAnswer,
  };
}

export const fetchQuestions = async(data: InputData) => {
  const url = getURL(data);

  try {
    return await parseData(await axios(url));
  } catch (error) {
    console.error(error);
  }
}
