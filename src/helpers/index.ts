import router from '../router';

const emptyValue = 'any';
const baseUrl = 'https://opentdb.com/api.php';

export function getTime(startTime: number, endTime: number): string {
  const timeInSec = Math.round(((endTime - startTime) / 1000) * 100) / 100;
  return timeInSec > 60 ? `${Math.round((timeInSec / 60) * 100) / 100} min` : `${timeInSec} sec`;
}

export function getValue(data: InputData, key: keyof InputData) {
  return data[key] === emptyValue ? '' : data[key];
}

export function addParam(url: string, value: string, key: string) {
  return value ? `${url}&${key}=${value}` : url;
}

export function getURL(data: InputData): string {
  const category = getValue(data, 'category') as string;
  const type = getValue(data, 'type') as string;
  const difficulty = getValue(data, 'difficulty') as string;

  let url = `${baseUrl}?amount=${data.numberOfQuestions}`;
  url = addParam(url, category, 'category');
  url = addParam(url, type, 'type');
  url = addParam(url, difficulty, 'difficulty');

  return url;
}

export function goToStartPage() {
  router.push({ name: 'home' });
}
