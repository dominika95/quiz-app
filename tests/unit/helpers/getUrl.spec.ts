import { getURL } from '@/helpers';

const defaultData = {
  category: 'any',
  difficulty: 'any',
  type: 'any',
  numberOfQuestions: 10,
};

const exampleData = {
  category: '1',
  difficulty: 'easy',
  type: 'multiple',
  numberOfQuestions: 11,
};

describe('Helpers fn - getURL', () => {
  it('get url from default data', () => {
    const url = getURL(defaultData);
    expect(url).toEqual('https://opentdb.com/api.php?amount=10');
  }),
  it('get url from example data', () => {
    const url = getURL(exampleData);
    expect(url).toEqual('https://opentdb.com/api.php?amount=11&category=1&type=multiple&difficulty=easy');
  });
});
