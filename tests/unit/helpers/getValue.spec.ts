import { getValue } from '@/helpers';

const exampleData = {
  category: '1',
  difficulty: 'any',
  type: 'any',
  numberOfQuestions: 10,
};

describe('Helpers fn - getValue', () => {
  it('get value from data', () => {
    const value = getValue(exampleData, 'category');
    expect(value).toEqual('1');
  });
  it('get empty string', () => {
    const value = getValue(exampleData, 'type');
    expect(value).toEqual('');
  });
});
