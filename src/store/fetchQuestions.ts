import axios from 'axios';

const baseUrl = 'https://opentdb.com/api.php';
const emptyValue = 'any';

interface inputData {
    category: string;
    difficulty: string;
    type: string;
    numberOfQuestions: number;
}

function getValue(data: inputData, key: keyof inputData) {
  return data[key] === emptyValue ? '' : data[key];
}

function addParam(url: string, value: string, key: string) {
  return value ? `${url}&${key}=${value}` : url;
}
/*eslint-disable*/
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
      answers: incorrect_answers.concat(correct_answer),
      question,
      type,
    });
  });

  return {
    questions: parseQuestion,
    correctAnswer,
  };
}

export const fetchQuestions = async(data: inputData) => {
  const category = getValue(data, 'category') as string;
  const type = getValue(data, 'type') as string;
  const difficulty = getValue(data, 'difficulty') as string;

  let url = `${baseUrl}?amount=${data.numberOfQuestions}`;
  url = addParam(url, category, 'category');
  url = addParam(url, type, 'category');
  url = addParam(url, difficulty, 'type');

  try {
    return await parseData(await axios(url));
  } catch (error) {
    console.error(error);
  }

  // return { a: 1 };
}
